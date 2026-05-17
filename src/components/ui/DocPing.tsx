"use client";

import Link from "next/link";

/**
 * DocPing — nút ping "enemy missing" cố định góc dưới phải trang chủ.
 * Ấn vào → dẫn sang /document.
 * Lấy cảm hứng từ ping "?" trong Liên Minh Huyền Thoại.
 */
export function DocPing() {
  return (
    <Link
      href="/document"
      aria-label="Xem tài liệu kỹ thuật"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Ripple rings — giống sóng ping LOL */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-cyan-glow/60 animate-ping"
        style={{ animationDuration: "2s" }}
      />
      <span
        aria-hidden
        className="absolute inset-[-6px] rounded-full border border-cyan-glow/25 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "0.4s" }}
      />

      {/* Button body */}
      <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-void-950 border-2 border-cyan-glow/70 group-hover:border-cyan-glow group-hover:bg-void-900 transition-all duration-300 shadow-[0_0_18px_-4px_rgba(0,200,255,0.5)] group-hover:shadow-[0_0_28px_-4px_rgba(0,200,255,0.8)]">
        {/* Dấu ? — icon missing ping */}
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-cyan-glow group-hover:scale-110 transition-transform duration-200"
          fill="currentColor"
          aria-hidden
        >
          {/* Outer hexagon frame nhỏ */}
          <polygon
            points="12,1 20,5.5 20,14.5 12,19 4,14.5 4,5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Dấu ? */}
          <text
            x="12"
            y="15"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
            fill="currentColor"
          >
            ?
          </text>
        </svg>
      </span>

      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2.5 px-2.5 py-1 rounded bg-void-900 border border-cyan-glow/30 text-[10px] font-mono text-cyan-glow whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
        Website này được build như thế nào ?
      </span>
    </Link>
  );
}
