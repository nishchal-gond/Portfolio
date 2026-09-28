import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { z } from "zod";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

const Email = z.object({
  fullName: z.string().trim().min(2, "Full name is invalid!").max(100),
  email: z.string().trim().email({ message: "Email is invalid!" }).max(200),
  message: z.string().trim().min(10, "Message is too short!").max(5000),
  // Honeypot: hidden field that real users never fill in.
  website: z.string().optional(),
});

const isRateLimited = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });

export async function POST(req: Request) {
  if (isRateLimited(getClientIp(req))) {
    return Response.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = Email.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    // Bots fill every field; pretend success so they don't retry.
    if (parsed.data.website) {
      return Response.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.EMAIL;
    if (!apiKey || !to) {
      console.error("Contact form: RESEND_API_KEY or EMAIL is not configured");
      return Response.json(
        { error: "Could not send message. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: parsed.data.email,
      subject: `Portfolio contact from ${parsed.data.fullName}`,
      react: EmailTemplate({
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        message: parsed.data.message,
      }),
    });

    if (error) {
      console.error("Contact form: Resend error", error.name);
      return Response.json(
        { error: "Could not send message. Please try again later." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Could not send message. Please try again later." },
      { status: 500 }
    );
  }
}
