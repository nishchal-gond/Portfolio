import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { buildAssistantSystemPrompt } from "@/lib/assistant-context";
import { config } from "@/data/config";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

// Model and effort are overridable per deployment.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";
// Short, grounded Q&A: low effort keeps latency and cost down.
const EFFORT = (process.env.ANTHROPIC_EFFORT || "low") as "low" | "medium" | "high";
// Hard cap on reply length: this is a public widget, and answers are meant to be short.
const MAX_TOKENS = 2048;

const SYSTEM_PROMPT = buildAssistantSystemPrompt();

const isRateLimited = createRateLimiter({ max: 20, windowMs: 60 * 60 * 1000 });

const Body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000),
      })
    )
    .min(1)
    .max(12)
    .refine((m) => m[0].role === "user" && m[m.length - 1].role === "user", {
      message: "Conversation must start and end with a user message",
    }),
});

const REFUSAL_TEXT = `Sorry, I can't help with that. Ask me about ${config.author}'s projects, skills or experience.`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "The assistant is not configured." }, { status: 503 });
  }
  if (isRateLimited(getClientIp(req))) {
    return Response.json(
      { error: "You've asked a lot of questions! Please try again later." },
      { status: 429 }
    );
  }

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    output_config: { effort: EFFORT },
    // If a safety classifier declines, retry server-side on Anthropic's recommended fallback.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [
      { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    ],
    messages: parsed.data.messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentText = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            sentText = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode((sentText ? "\n\n" : "") + REFUSAL_TEXT));
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          console.error("Assistant: Anthropic rate limit");
        } else if (error instanceof Anthropic.APIError) {
          console.error(`Assistant: API error ${error.status}`);
        } else {
          console.error("Assistant: stream failed");
        }
        controller.enqueue(
          encoder.encode(
            (sentText ? "\n\n" : "") + "Sorry, something went wrong. Please try again in a moment."
          )
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
