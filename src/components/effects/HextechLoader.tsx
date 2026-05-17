"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";

const MIN_MS  = 300;   // tối thiểu để animation visible
const FADE_MS = 350;
const MAX_MS  = 3000;  // fallback nếu load event không bao giờ fire

function statusLabel(progress: number): string {
  if (progress < 30)  return "Initializing...";
  if (progress < 65)  return "Loading assets...";
  if (progress < 90)  return "Connecting...";
  if (progress < 100) return "Almost ready...";
  return "Systems ready";
}

export function HextechLoader() {
  const [progress,  setProgress]  = useState(0);
  const [status,    setStatus]    = useState("Initializing...");
  const [done,      setDone]      = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const navStart = performance.now();
    let finished = false;

    // Phase 1 — rush to ~80% theo thời gian thực
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 82) return p; // hold, chờ load event
        const elapsed = performance.now() - navStart;
        const t = Math.min(1, elapsed / 350);
        const next = Math.round((1 - Math.pow(1 - t, 2)) * 82);
        setStatus(statusLabel(next));
        return next;
      });
    }, 40);

    // Phase 3 — khi trang thực sự load xong
    const complete = () => {
      if (finished) return;
      finished = true;
      clearInterval(interval);

      const elapsed = performance.now() - navStart;
      const wait = Math.max(0, MIN_MS - elapsed);

      setTimeout(() => {
        // Snap lên 100%
        setProgress(100);
        setStatus("Systems ready");

        // Fade out
        setTimeout(() => setDone(true), 150);
      }, wait);
    };

    // Nếu trang đã load xong trước khi component mount (cache hit)
    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    // Fallback
    const fallback = setTimeout(complete, MAX_MS);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", complete);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setUnmounted(true), FADE_MS);
    return () => clearTimeout(t);
  }, [done]);

  if (unmounted) return null;

  return (
    <div
      style={{
        opacity: done ? 0 : 1,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.22,1,0.36,1)`,
        pointerEvents: done ? "none" : "auto",
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void-950"
      aria-hidden
    >
      {/* Backdrop ambience */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(200,170,110,0.06), transparent 60%)",
        }}
      />

      {/* Hex grid wash */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="loaderHex" width="56" height="48.5" patternUnits="userSpaceOnUse">
            <polygon points="28,0 56,16 56,40 28,56 0,40 0,16" fill="none" stroke="#c8aa6e" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#loaderHex)" />
      </svg>

      {/* Center stack */}
      <div className="relative flex flex-col items-center px-6 max-w-md w-full">
        {/* Sigil */}
        <div className="relative w-20 h-20 mb-7">
          <m.svg
            viewBox="0 0 80 80"
            className="w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <polygon points="40,4 70,22 70,58 40,76 10,58 10,22" fill="none" stroke="#c8aa6e" strokeWidth="1.2" />
            <polygon points="40,14 60,26 60,54 40,66 20,54 20,26" fill="none" stroke="#785a28" strokeWidth="0.8" />
          </m.svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <m.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="w-8 h-8 rounded-full bg-hex-400/30 blur-sm"
            />
            <span className="absolute display-h text-hex-shine text-xl leading-none">H</span>
          </div>
        </div>

        {/* Name plate */}
        <div className="text-center mb-7">
          <div className="display-h text-2xl text-hex-shine leading-none mb-1.5">
            Nguyễn Thọ Hiếu
          </div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-hex-300/70 font-mono">
            Software Developer
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full mb-3 select-none">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-hex-600" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-hex-400/90 font-mono">
            Forging Hextech
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-hex-600" />
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-1.5 bg-void-700/80 overflow-hidden">
          <div
            style={{ width: `${progress}%`, transition: "width 60ms linear" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-hex-600 via-hex-400 to-hex-300"
          />
          <m.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-hex-100/40 to-transparent"
          />
        </div>

        {/* Status + % */}
        <div className="mt-3 flex justify-between w-full text-[10px] tracking-[0.3em] uppercase font-mono text-hex-300/60">
          <m.span
            key={status}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {status}
          </m.span>
          <span className="text-hex-100 tabular-nums">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>

      </div>
    </div>
  );
}

