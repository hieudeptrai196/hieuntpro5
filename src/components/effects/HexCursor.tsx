"use client";

import { useEffect, useRef } from "react";

/**
 * HexCursor — custom Hextech cursor cho desktop.
 * Dot nhỏ (cyan) bám sát chuột + ring ngoài (lag lerp).
 * Hover link/button → ring chuyển sang gold + glow.
 * Tự động tắt trên touch device.
 */
export function HexCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bỏ qua trên touch / mobile
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) return;

    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const mouse = { x: cx, y: cy };
    const ring  = { x: cx, y: cy };
    let rafId   = 0;
    let ringW   = 22;

    document.documentElement.style.cursor = "none";

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    document.addEventListener("mousemove", onMove);

    const tick = () => {
      ring.x = lerp(ring.x, mouse.x, 0.13);
      ring.y = lerp(ring.y, mouse.y, 0.13);

      // Detect hover trên interactive elements
      const el = document.elementFromPoint(mouse.x, mouse.y);
      const isInteractive = !!el?.closest(
        "a, button, [role='button'], input, textarea, select, label, [tabindex]"
      );

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.x - 2.5}px, ${mouse.y - 2.5}px) rotate(45deg)`;
        dotRef.current.style.opacity = "1";
      }

      if (ringRef.current) {
        const targetW = isInteractive ? 30 : 22;
        ringW = lerp(ringW, targetW, 0.15);
        const half = ringW / 2;

        ringRef.current.style.transform =
          `translate(${ring.x - half}px, ${ring.y - half}px) rotate(45deg)`;
        ringRef.current.style.width  = `${ringW}px`;
        ringRef.current.style.height = `${ringW}px`;
        ringRef.current.style.opacity = "1";

        if (isInteractive) {
          ringRef.current.style.borderColor = "rgba(200,170,110,0.85)";
          ringRef.current.style.boxShadow  = "0 0 14px rgba(200,170,110,0.35)";
        } else {
          ringRef.current.style.borderColor = "rgba(0,209,255,0.45)";
          ringRef.current.style.boxShadow  = "0 0 6px rgba(0,209,255,0.2)";
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot — bám sát */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[200] pointer-events-none opacity-0"
        style={{
          width:           5,
          height:          5,
          backgroundColor: "rgba(0,209,255,0.95)",
          boxShadow:       "0 0 5px rgba(0,209,255,0.7)",
          willChange:      "transform",
        }}
      />

      {/* Ring — lag sau */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[200] pointer-events-none opacity-0"
        style={{
          width:      22,
          height:     22,
          border:     "1px solid rgba(0,209,255,0.45)",
          willChange: "transform, width, height",
        }}
      />
    </>
  );
}
