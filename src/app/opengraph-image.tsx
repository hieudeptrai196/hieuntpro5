import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#010A13",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hex grid background (SVG inline) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='49'%3E%3Cpolygon points='28,0 56,16 56,40 28,56 0,40 0,16' fill='none' stroke='%23c8aa6e' stroke-width='0.6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Ambient glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,170,110,0.18), transparent 70%)",
          }}
        />
        {/* Ambient glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(10,200,185,0.10), transparent 70%)",
          }}
        />

        {/* Gold left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 5,
            background: "linear-gradient(to bottom, #c8aa6e, #785a28, transparent)",
          }}
        />

        {/* Top border line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(to right, #c8aa6e, #785a28, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            flex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            {/* Hex diamond */}
            <div
              style={{
                width: 10,
                height: 10,
                background: "#c8aa6e",
                transform: "rotate(45deg)",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#a08040",
              }}
            >
              Champion Select · Portfolio
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              background: "linear-gradient(135deg, #f0e6d2 0%, #c8aa6e 50%, #785a28 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 16,
            }}
          >
            {siteConfig.name}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 28,
              color: "#c8aa6e",
              letterSpacing: "0.1em",
              marginBottom: 40,
              fontWeight: 400,
            }}
          >
            {siteConfig.title}
          </div>

          {/* Tech tags */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
            {["Node.js", "NestJS", "PHP", "Laravel", "PostgreSQL", "Redis"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 16px",
                  border: "1px solid rgba(200,170,110,0.4)",
                  color: "#c8aa6e",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  fontFamily: "monospace",
                  background: "rgba(200,170,110,0.06)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Bottom row — location + domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#604820",
                fontSize: 14,
                fontFamily: "monospace",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              <span>◆</span>
              <span>{siteConfig.location}, Vietnam · {siteConfig.siteUrl.replace("https://", "")}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#463714",
                fontSize: 13,
                fontFamily: "monospace",
                letterSpacing: "0.2em",
              }}
            >
              <span>3+ YRS EXP · OPEN TO RECRUIT</span>
            </div>
          </div>
        </div>

        {/* Bottom border line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(to right, transparent, #785a28, transparent)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
