import { ImageResponse } from "next/og";
import { config } from "@/data/config";

export const alt = config.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time and used for LinkedIn/X/WhatsApp link previews.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 60%, #27272a 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#a1a1aa", marginBottom: 16 }}>
          Hi, I am
        </div>
        <div style={{ fontSize: 110, fontWeight: 800, lineHeight: 1 }}>
          {config.author}
        </div>
        <div style={{ fontSize: 40, color: "#d4d4d8", marginTop: 32 }}>
          AI Specialist · AI Systems · Automation · Full-Stack
        </div>
        <div style={{ fontSize: 28, color: "#71717a", marginTop: 48 }}>
          {config.site.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
