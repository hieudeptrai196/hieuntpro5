import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-hex-600/30 py-10 px-5 sm:px-8 bg-void-950/60">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3 text-xs">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-hex-400" fill="none">
            <polygon
              points="12,2 21,7 21,17 12,22 3,17 3,7"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span className="font-mono text-hex-100/80">{siteConfig.name}</span>
          <span className="text-hex-600">·</span>
          <span className="text-hex-300/60 tracking-[0.2em] uppercase text-[10px]">
            {new Date().getFullYear()}
          </span>
        </div>

        <div className="text-[10px] text-hex-300/50 tracking-[0.3em] uppercase font-mono">
          Forged with Next.js · Tailwind · Framer Motion
        </div>
      </div>
    </footer>
  );
}
