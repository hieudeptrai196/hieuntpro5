"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * HextechLoader — first-paint cinematic loader (LoL champion-select intake).
 *
 * Timing intentionally avoids requestAnimationFrame for state changes so the
 * loader still finishes if the tab is throttled. The fade-out uses a plain
 * CSS opacity transition and a setTimeout-driven unmount for the same reason.
 */
const DURATION_MS = 1800;
const FADE_MS = 500;

export function HextechLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  // Drive progress + lock body scroll
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const start = Date.now();
    const interval = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t >= 1) clearInterval(interval);
    }, 50);

    const finish = setTimeout(() => setDone(true), DURATION_MS + 180);

    return () => {
      clearInterval(interval);
      clearTimeout(finish);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  // Fade out and unmount fully after fade
  useEffect(() => {
    if (!done) return;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
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
          background:
            "radial-gradient(ellipse at center, rgba(200,170,110,0.06), transparent 60%)",
        }}
      />

      {/* Hex grid wash */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="loaderHex" width="56" height="48.5" patternUnits="userSpaceOnUse">
            <polygon
              points="28,0 56,16 56,40 28,56 0,40 0,16"
              fill="none"
              stroke="#c8aa6e"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#loaderHex)" />
      </svg>

      {/* Center stack */}
      <div className="relative flex flex-col items-center px-6 max-w-md w-full">
        {/* Sigil */}
        <div className="relative w-20 h-20 mb-7">
          <motion.svg
            viewBox="0 0 80 80"
            className="w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <polygon
              points="40,4 70,22 70,58 40,76 10,58 10,22"
              fill="none"
              stroke="#c8aa6e"
              strokeWidth="1.2"
            />
            <polygon
              points="40,14 60,26 60,54 40,66 20,54 20,26"
              fill="none"
              stroke="#785a28"
              strokeWidth="0.8"
            />
          </motion.svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="w-8 h-8 rounded-full bg-hex-400/30 blur-sm"
            />
            <span className="absolute display-h text-hex-shine text-xl leading-none">
              H
            </span>
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

        {/* Divider with status */}
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
            style={{
              width: `${progress}%`,
              transition: "width 80ms linear",
            }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-hex-600 via-hex-400 to-hex-300"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-hex-100/40 to-transparent"
          />
        </div>

        {/* % readout */}
        <div className="mt-3 flex justify-between w-full text-[10px] tracking-[0.3em] uppercase font-mono text-hex-300/60">
          <span>Initializing systems</span>
          <span className="text-hex-100 tabular-nums">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
