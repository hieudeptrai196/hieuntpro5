"use client";

import { useEffect, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";

// ↑↑↓↓←→←→BA
const SEQUENCE = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

const QUOTES = [
  "\"Hextech resonates with your presence, Summoner.\"",
  "\"Your code compiles on the first try. Every time.\"",
  "\"A true champion doesn't just build features — they craft legends.\"",
  "\"Even Piltover's finest engineers bow to your commit history.\"",
];

/**
 * EasterEgg — Konami code (↑↑↓↓←→←→BA) trigger.
 * Hiện popup Champion Unlocked kiểu Hextech.
 */
export function EasterEgg() {
  const [unlocked, setUnlocked] = useState(false);
  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );
  const [, setProgress] = useState<string[]>([]);

  const dismiss = useCallback(() => setUnlocked(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Không trigger khi đang gõ vào input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) return;

      setProgress((prev) => {
        const next = [...prev, e.key].slice(-SEQUENCE.length);
        if (next.join("|") === SEQUENCE.join("|")) {
          setUnlocked(true);
          return [];
        }
        return next;
      });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Tự đóng sau 6 giây
  useEffect(() => {
    if (!unlocked) return;
    const t = setTimeout(dismiss, 6000);
    return () => clearTimeout(t);
  }, [unlocked, dismiss]);

  // Đóng bằng Escape
  useEffect(() => {
    if (!unlocked) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [unlocked, dismiss]);

  // Debug: log progress khi gần đủ (optional, remove in prod)
  // console.log("Konami progress:", progress.length, "/", SEQUENCE.length);

  return (
    <AnimatePresence>
      {unlocked && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] bg-void-950/75 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Panel */}
          <m.div
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.9,   y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2
                       sm:-translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2
                       z-[151] max-w-sm w-full font-mono"
            style={{
              clipPath:
                "polygon(20px 0%,100% 0%,100% calc(100% - 20px),calc(100% - 20px) 100%,0% 100%,0% 20px)",
            }}
          >
            <div className="bg-void-950 border border-hex-400/60 overflow-hidden">
              {/* Gold shimmer bar */}
              <div className="h-0.5 bg-gradient-to-r from-hex-600 via-hex-200 to-hex-600 animate-pulse" />

              <div className="p-8 text-center space-y-5">
                {/* Trophy */}
                <m.div
                  animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl select-none"
                >
                  🏆
                </m.div>

                {/* Title */}
                <div className="space-y-1">
                  <div className="text-[9px] tracking-[0.45em] uppercase text-hex-300/50">
                    Achievement Unlocked
                  </div>
                  <div className="display-h text-2xl text-hex-shine leading-tight">
                    Champion Status
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-glow/70">
                    ↑↑↓↓←→←→ B A
                  </div>
                </div>

                {/* Quote */}
                <p className="text-[11px] text-hex-200/60 leading-relaxed italic
                              border-l-2 border-hex-400/40 pl-3 text-left">
                  {quote}
                </p>

                {/* Progress bar countdown */}
                <m.div className="w-full h-px bg-hex-700/50 overflow-hidden">
                  <m.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-hex-400/60"
                  />
                </m.div>

                <p className="text-[9px] text-hex-300/25 tracking-[0.3em] uppercase">
                  Press any key to close
                </p>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
