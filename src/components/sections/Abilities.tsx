"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skills, type SkillKey } from "@/lib/data";
import { cn } from "@/lib/cn";

const order: SkillKey[] = ["backend", "data", "fullstack", "soft"];

const meta: Record<SkillKey, { tag: string; tone: "Q" | "W" | "E" | "R" }> = {
  backend: { tag: "Primary", tone: "Q" },
  data: { tag: "Secondary", tone: "W" },
  fullstack: { tag: "Ultimate", tone: "E" },
  soft: { tag: "Passive", tone: "R" },
};

export function Abilities() {
  const [active, setActive] = useState<SkillKey>("backend");
  const current = skills[active];

  return (
    <section
      id="abilities"
      className="relative section-edge py-28 sm:py-36 px-5 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel
          eyebrow="Abilities // Chapter 02"
          title="Skills & Technologies"
          description="Hover to inspect each ability — the full kit covers backend systems, data layers, and full-stack delivery."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Hexbar — ability icons */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3">
            {order.map((key) => {
              const isActive = key === active;
              const skillMeta = meta[key];
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  onMouseEnter={() => setActive(key)}
                  className={cn(
                    "group relative flex items-center gap-4 p-4 sm:p-5 flex-1 lg:flex-initial text-left transition-all clip-bevel-sm",
                    "border",
                    isActive
                      ? "border-hex-400 bg-gradient-to-r from-hex-600/15 to-transparent"
                      : "border-hex-600/30 bg-void-900/40 hover:border-hex-400/60",
                  )}
                  aria-pressed={isActive}
                >
                  <AbilityIcon letter={skillMeta.tone} active={isActive} />
                  <div className="min-w-0 hidden sm:block">
                    <div
                      className={cn(
                        "text-[10px] tracking-[0.3em] uppercase font-mono",
                        isActive ? "text-hex-300" : "text-hex-300/50",
                      )}
                    >
                      {skillMeta.tag}
                    </div>
                    <div
                      className={cn(
                        "display-h text-sm sm:text-base mt-0.5 leading-tight",
                        isActive ? "text-hex-100" : "text-hex-200/70",
                      )}
                    >
                      {skills[key].label}
                    </div>
                  </div>
                  {isActive && (
                    <m.span
                      layoutId="ability-arrow"
                      className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 text-hex-400"
                    >
                      ▸
                    </m.span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-8">
            <div className="relative bg-gradient-to-b from-void-900 to-void-950 border border-hex-600/40 clip-bevel p-7 sm:p-9 min-h-[420px] corner-bracket">
              <AnimatePresence mode="wait">
                <m.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="display-h text-2xl text-hex-gradient">
                      {current.label}
                    </h3>
                    <span className="font-mono text-xs text-hex-300/70">
                      {meta[active].tag}
                    </span>
                  </div>

                  <ul className="space-y-5">
                    {current.items.map((item, i) => (
                      <m.li
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.4 }}
                        className="group"
                      >
                        <div className="flex items-baseline gap-3 mb-1.5">
                          <span className="text-hex-400 text-xs">▹</span>
                          <span className="display-h text-sm sm:text-base text-hex-100">
                            {item.label}
                          </span>
                        </div>
                        <p className="pl-5 text-sm text-hex-100/65 leading-relaxed">
                          {item.value}
                        </p>
                      </m.li>
                    ))}
                  </ul>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AbilityIcon({
  letter,
  active,
}: {
  letter: "Q" | "W" | "E" | "R";
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-12 h-12 flex items-center justify-center transition-all",
      )}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
        <polygon
          points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5"
          fill={active ? "rgba(200,170,110,0.15)" : "rgba(200,170,110,0.04)"}
          stroke={active ? "#c8aa6e" : "#785a28"}
          strokeWidth="1.2"
          className="transition-all"
        />
        <polygon
          points="24,9 36,16 36,32 24,39 12,32 12,16"
          fill="none"
          stroke={active ? "#c8aa6e" : "#785a28"}
          strokeWidth="0.6"
          opacity="0.5"
        />
      </svg>
      <span
        className={cn(
          "relative display-h text-lg font-bold transition-colors",
          active ? "text-hex-100" : "text-hex-300/60",
        )}
      >
        {letter}
      </span>
    </div>
  );
}
