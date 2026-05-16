"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, education } from "@/lib/data";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — League-of-Legends Champion Select aesthetic.
 * Layout (desktop):
 *   ┌── TOP BAR (lobby status + live timer) ────────────────┐
 *   │                                                       │
 *   │   ┌─SPLASH (hex-clipped portrait)─┐  ┌─INFO PANEL─┐   │
 *   │   │                              │  │ Name        │   │
 *   │   │      Avatar with overlay     │  │ Role tags   │   │
 *   │   │                              │  │ Summary     │   │
 *   │   │      Name engraved overlay   │  │ Lock-in CTA │   │
 *   │   └──────────────────────────────┘  └─────────────┘   │
 *   │                                                       │
 *   │   ── TECH BENCH (hex roster) ─────────────────────    │
 *   └───────────────────────────────────────────────────────┘
 */

const techRoster = [
  { name: "NestJS",   letter: "Ne", primary: true },
  { name: "PHP",      letter: "P" },
  { name: "Laravel",  letter: "La" },
  { name: "CakePHP",  letter: "Ca" },
  { name: "React",    letter: "R" },
  { name: "Next.js",  letter: "Nx" },
  { name: "Angular",  letter: "An" },
  { name: "Postgres", letter: "Pg" },
  { name: "Redis",    letter: "Rd" },
  { name: "JWT",      letter: "Jw" },
  { name: "RabbitMQ",   letter: "Rb" },
  { name: "Others",     letter: "Ot" },
] as const;

const roleTags = ["Backend Developer"] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col overflow-hidden pt-20 pb-8"
    >
      <BackdropFX />

      {/* Top bar — lobby header */}
      <LobbyHeader />

      {/* Main board */}
      <div className="relative flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 mt-8">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-8 items-stretch">
          {/* LEFT — Splash */}
          <SplashPanel />

          {/* RIGHT — Info card */}
          <InfoPanel />
        </div>

        {/* BOTTOM — Tech bench */}
        <TechBench />
      </div>
    </section>
  );
}

/* ============================================================
   TOP BAR — lobby status / live counter
   ============================================================ */
function LobbyHeader() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6"
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3 border border-hex-600/40 clip-bevel-sm bg-void-900/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase font-mono">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-cyan-glow animate-ping opacity-70" />
            <span className="relative w-2 h-2 rounded-full bg-cyan-glow" />
          </span>
          <span className="text-hex-100/90">Champion Select</span>
          <span className="hidden sm:inline text-hex-300/40">// Lobby_01</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-mono text-hex-300/70">
            <span>Region</span>
            <span className="text-hex-100">{siteConfig.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-hex-300/70 font-mono hidden sm:inline">
              Session
            </span>
            <span className="font-mono text-sm text-hex-shine tabular-nums">
              {mm}:{ss}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   LEFT — Splash art (champion portrait area)
   ============================================================ */
function SplashPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.1, ease }}
      className="relative"
    >
      <div className="relative h-full min-h-[440px] lg:min-h-[520px] border border-hex-400/60 clip-bevel overflow-hidden bg-gradient-to-br from-void-700 via-void-900 to-void-950">
        {/* Double inner border */}
        <div className="absolute inset-2 border border-hex-400/15 clip-bevel-sm pointer-events-none z-20" />

        {/* Splash image — hex framed */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.png"
            alt=""
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Cinematic gradient over splash */}
          <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-void-950/70 via-transparent to-transparent" />
          {/* Hex grid overlay over splash */}
          <div className="absolute inset-0 opacity-[0.07] mix-blend-screen pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="splashHex" width="56" height="48.5" patternUnits="userSpaceOnUse">
                  <polygon
                    points="28,0 56,16 56,40 28,56 0,40 0,16"
                    fill="none"
                    stroke="#c8aa6e"
                    strokeWidth="0.6"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#splashHex)" />
            </svg>
          </div>
          {/* Scanline */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-glow/10 to-transparent"
          />
        </div>

        {/* Top-left status chip */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 bg-void-950/80 border border-hex-400/50 backdrop-blur-sm clip-bevel-sm">
          <span className="w-1.5 h-1.5 rotate-45 bg-cyan-glow animate-pulse-glow" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-hex-100">
            Locked In
          </span>
        </div>

        {/* Top-right "Pick #1" */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-mono text-hex-300/80">
          <span className="text-hex-400 text-base leading-none">◆</span>
          <span>Pick · 01</span>
        </div>

        {/* Bottom engraved name plate */}
        <div className="absolute inset-x-0 bottom-0 z-30 p-5 sm:p-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-10 h-px bg-hex-400" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-hex-300">
              The Champion
            </span>
          </div>
          <h1 className="display-h text-4xl sm:text-5xl lg:text-6xl text-hex-shine leading-[1]">
            Nguyễn Thọ Hiếu
          </h1>
          <div className="mt-3 text-xs sm:text-sm tracking-[0.25em] uppercase text-hex-200/80 font-light">
            ・ {siteConfig.title} ・
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   RIGHT — Champion info / lock-in panel
   ============================================================ */
function InfoPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease }}
      className="relative"
    >
      <div className="relative h-full bg-gradient-to-b from-void-900/80 to-void-950/80 border border-hex-400/60 clip-bevel corner-bracket overflow-hidden">
        <div className="absolute inset-2 border border-hex-400/15 clip-bevel-sm pointer-events-none" />

        <div className="relative p-6 sm:p-8 lg:p-9 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <span className="label-eyebrow">Profile // Dossier</span>
            <span className="font-mono text-[10px] text-hex-300/50">ID_4Y</span>
          </div>

          {/* Headline */}
          <h2 className="display-h text-2xl sm:text-3xl text-hex-100 leading-tight mb-2">
            Software Developer
          </h2>
          <p className="text-xs tracking-[0.2em] uppercase text-hex-300/70 font-mono mb-6">
            Backend · Node.js · PHP · 4 Years
          </p>

          {/* Role tags (like LoL role icons) */}
          <div className="flex flex-wrap gap-2 mb-6">
            {roleTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-hex-600/50 text-[10px] tracking-[0.2em] uppercase font-semibold text-hex-200 bg-hex-400/5 clip-bevel-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-5">
            <span className="h-px flex-1 bg-hex-600/60" />
            <span className="block w-1.5 h-1.5 rotate-45 bg-hex-400" />
            <span className="h-px flex-1 bg-hex-600/60" />
          </div>

          {/* Lore / summary */}
          <p className="text-sm text-hex-100/75 leading-relaxed mb-6">
            {siteConfig.summary}
          </p>

          {/* Stat strip */}
          <div className="grid grid-cols-2 gap-px bg-hex-600/30 border border-hex-600/30 mb-7 clip-bevel-sm">
            <StatCell label="Years" value="04" />
            <StatCell label="Companies" value="03" />
          </div>

          {/* Education */}
          <div className="flex items-center gap-3 mb-7 text-xs">
            <span className="block w-1.5 h-1.5 rotate-45 bg-hex-400" />
            <span className="text-hex-300/70 tracking-[0.2em] uppercase font-mono text-[10px]">
              Academy
            </span>
            <span className="text-hex-100/80 font-mono">{education.school}</span>
          </div>

          {/* Spacer pushes CTA to bottom */}
          <div className="flex-1" />

          {/* Lock-in actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#career"
              className="group relative flex-1 inline-flex items-center justify-center gap-3 px-6 py-3.5 clip-bevel bg-gradient-to-b from-hex-400 to-hex-600 text-void-950 font-semibold tracking-[0.25em] uppercase text-xs hover:from-hex-300 hover:to-hex-400 transition-all"
            >
              <span>Lock In</span>
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 clip-bevel border border-hex-400/50 text-hex-200 font-semibold tracking-[0.25em] uppercase text-xs hover:border-hex-300 hover:text-hex-100 hover:bg-hex-400/5 transition-all"
            >
              Recruit
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-void-900/80 px-3 py-3 text-center">
      <div className="display-h text-xl sm:text-2xl text-hex-shine leading-none mb-1">
        {value}
      </div>
      <div className="text-[9px] tracking-[0.3em] uppercase text-hex-300/70 font-mono">
        {label}
      </div>
    </div>
  );
}

/* ============================================================
   BOTTOM — Tech roster (LoL champion grid analogue)
   ============================================================ */
function TechBench() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.45, ease }}
      className="relative mt-6"
    >
      <div className="border border-hex-600/40 bg-void-900/40 backdrop-blur-sm clip-bevel-sm px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase font-mono text-hex-300/80">
            <span className="block w-1.5 h-1.5 rotate-45 bg-hex-400" />
            Bench · Tech Roster
          </div>
          <a
            href="#abilities"
            className="text-[10px] tracking-[0.3em] uppercase font-mono text-hex-300/60 hover:text-hex-100 transition-colors"
          >
            View Abilities ▸
          </a>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
          {techRoster.map((t, i) => (
            <BenchHex key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BenchHex({
  name,
  letter,
  primary,
  index,
}: {
  name: string;
  letter: string;
  primary?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.04, ease }}
      whileHover={{ y: -3 }}
      className="relative group cursor-default"
      title={name}
    >
      <div
        className={cn(
          "relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-colors",
        )}
      >
        <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full">
          <polygon
            points="28,3 50,15.5 50,40.5 28,53 6,40.5 6,15.5"
            fill={primary ? "rgba(200,170,110,0.18)" : "rgba(200,170,110,0.05)"}
            stroke={primary ? "#c8aa6e" : "#785a28"}
            strokeWidth="1.2"
            className="transition-all group-hover:stroke-[#c8aa6e]"
          />
          <polygon
            points="28,9 43.5,18 43.5,38 28,47 12.5,38 12.5,18"
            fill="none"
            stroke={primary ? "#c8aa6e" : "#5b5a56"}
            strokeWidth="0.5"
            opacity="0.6"
          />
        </svg>
        <span
          className={cn(
            "relative font-mono text-[11px] sm:text-xs font-semibold tracking-tight transition-colors",
            primary ? "text-hex-100" : "text-hex-200/80 group-hover:text-hex-100",
          )}
        >
          {letter}
        </span>
      </div>
      {/* Tooltip on hover */}
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-2 text-[9px] tracking-[0.2em] uppercase text-hex-300/70 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {name}
      </span>
    </motion.div>
  );
}

/* ============================================================
   Cinematic backdrop
   ============================================================ */
function BackdropFX() {
  return (
    <>
      <div
        aria-hidden
        className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, #c89b3c, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, #0ac8b9, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 inset-x-0 h-px bg-gradient-to-r from-transparent via-hex-600/30 to-transparent"
      />
    </>
  );
}
