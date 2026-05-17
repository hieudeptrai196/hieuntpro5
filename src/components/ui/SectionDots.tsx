"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";

const SECTIONS = [
  { id: "lore",     label: "Lore"     },
  { id: "abilities",label: "Skills"   },
  { id: "career",   label: "Career"   },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact"  },
];

/**
 * SectionDots — cột điều hướng bên phải màn hình (desktop only).
 * Dùng IntersectionObserver để highlight section đang active.
 */
export function SectionDots() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        // Lấy section có tỉ lệ giao nhau cao nhất
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40
                 flex-col items-end gap-4"
      aria-label="Điều hướng section"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Đến ${label}`}
            className="group relative flex items-center gap-2.5"
          >
            {/* Tooltip */}
            <span
              className="absolute right-5 text-[9px] tracking-[0.25em] uppercase font-mono
                         text-hex-200/80 bg-void-950/95 border border-hex-600/40 px-2 py-1
                         pointer-events-none whitespace-nowrap
                         opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
                         transition-all duration-200"
            >
              {label}
            </span>

            {/* Diamond dot */}
            <m.span
              animate={isActive
                ? { scale: 1.6, opacity: 1 }
                : { scale: 1,   opacity: 0.45 }}
              transition={{ duration: 0.25 }}
              className={`block w-1.5 h-1.5 rotate-45 transition-colors duration-300 ${
                isActive
                  ? "bg-cyan-glow shadow-[0_0_10px_rgba(0,209,255,0.8)]"
                  : "bg-hex-500 group-hover:bg-hex-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
