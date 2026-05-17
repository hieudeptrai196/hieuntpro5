"use client";

import { useEffect, useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { siteConfig, education } from "@/lib/data";
import { cn } from "@/lib/cn";
import Image from "next/image";

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

type TechItem = {
  name: string;
  /** SimpleIcons slug — undefined = show letter fallback */
  icon?: string;
  letter?: string;
  primary?: boolean;
};

const techRoster: TechItem[] = [
  { name: "NestJS",     icon: "nestjs",          primary: true },
  { name: "PHP",        icon: "php" },
  { name: "Laravel",    icon: "laravel" },
  { name: "CakePHP",    icon: "cakephp" },
  { name: "React",      icon: "react" },
  { name: "Next.js",    icon: "nextdotjs" },
  { name: "Angular",    icon: "angular" },
  { name: "MySQL",      icon: "mysql" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Redis",      icon: "redis" },
  { name: "RabbitMQ",   icon: "rabbitmq" },
  { name: "JWT",        icon: "jsonwebtokens" },
  { name: "Cloudflare", icon: "cloudflare" },
  { name: "Claude",     icon: "anthropic" },
  { name: "ChatGPT",    letter: "GPT" },
  { name: "Others",     letter: "···" },
];

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
    <m.div
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
    </m.div>
  );
}

/* ============================================================
   LEFT — Splash art with slider
   ============================================================ */
const CDN = "https://cdn.hieunt.site";

const portraits = [
  { src: `${CDN}/avatar.jpg`,                                              label: "Portrait · 01" },
  { src: `${CDN}/mvp1.jpg`,                                                label: "Portrait · 02" },
  { src: `${CDN}/z7448477960966_469309956b8dfe85acede9fb4dfe477b.jpg`,    label: "Portrait · 03" },
  { src: `${CDN}/z7834164545883_bd839bc7d4862e6aa73ffce7a1a57d6c.jpg`,    label: "Portrait · 04" },
];

const AUTO_PLAY_MS = 4000;

function SplashPanel() {
  const [active, setActive]       = useState(0);
  const [paused, setPaused]       = useState(false);
  const [lightbox, setLightbox]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % portraits.length);
    }, AUTO_PLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    if (!paused) {
      timerRef.current = setInterval(() => {
        setActive((cur) => (cur + 1) % portraits.length);
      }, AUTO_PLAY_MS);
    }
  };

  return (
    <>
    <m.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.1, ease }}
      className="relative flex flex-col gap-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Main viewport ── */}
      <div className="relative flex-1 min-h-[440px] lg:min-h-[520px] border border-hex-400/60 clip-bevel overflow-hidden bg-void-950">

        {/* Double inner border */}
        <div className="absolute inset-2 border border-hex-400/15 clip-bevel-sm pointer-events-none z-20" />

        {/* Crossfading images — object-contain so nothing is cut */}
        <AnimatePresence mode="sync">
          <m.div
            key={active}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={portraits[active].src}
              alt={`Nguyễn Thọ Hiếu - ${portraits[active].label}`}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center"
            />
          </m.div>
        </AnimatePresence>

        {/* Clickable zoom layer */}
        <button
          onClick={() => setLightbox(true)}
          aria-label="Zoom image"
          className="absolute inset-0 z-20 cursor-zoom-in group/zoom"
        >
          {/* Zoom hint on hover */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 bg-void-950/70 border border-hex-400/40 clip-bevel-sm backdrop-blur-sm opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-200 pointer-events-none">
            <svg className="w-4 h-4 text-hex-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-hex-200">Zoom</span>
          </span>
        </button>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-void-950/50 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Hex grid wash */}
        <div className="absolute inset-0 z-10 opacity-[0.07] mix-blend-screen pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="splashHex" width="56" height="48.5" patternUnits="userSpaceOnUse">
                <polygon points="28,0 56,16 56,40 28,56 0,40 0,16" fill="none" stroke="#c8aa6e" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#splashHex)" />
          </svg>
        </div>

        {/* Scanline */}
        <m.div
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-glow/10 to-transparent z-10 pointer-events-none"
        />

        {/* Top-left status chip */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 bg-void-950/80 border border-hex-400/50 backdrop-blur-sm clip-bevel-sm pointer-events-none">
          <span className="w-1.5 h-1.5 rotate-45 bg-cyan-glow animate-pulse-glow" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-hex-100">Locked In</span>
        </div>

        {/* Top-right counter */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-mono text-hex-300/80 pointer-events-none">
          <span className="text-hex-400 text-base leading-none">◆</span>
          <span className="tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(portraits.length).padStart(2, "0")}
          </span>
        </div>

        {/* Auto-play progress bar */}
        {!paused && (
          <div className="absolute inset-x-0 top-0 h-0.5 z-30 bg-void-950/40 overflow-hidden pointer-events-none">
            <m.div
              key={active}
              className="h-full bg-gradient-to-r from-hex-600 via-hex-400 to-hex-300"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: AUTO_PLAY_MS / 1000, ease: "linear" }}
            />
          </div>
        )}

        {/* Bottom name plate */}
        <div className="absolute inset-x-0 bottom-0 z-30 p-5 sm:p-7 pointer-events-none">
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-10 h-px bg-hex-400" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-hex-300">The Champion</span>
          </div>
          <h1 className="display-h text-4xl sm:text-5xl lg:text-6xl text-hex-shine leading-[1]">
            Nguyễn Thọ Hiếu
          </h1>
          <div className="mt-3 text-xs sm:text-sm tracking-[0.25em] uppercase text-hex-200/80 font-light">
            ・ {siteConfig.title} ・
          </div>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex gap-2">
        {portraits.map((p, i) => (
          <button
            key={p.src}
            onClick={() => goTo(i)}
            aria-label={p.label}
            className={cn(
              "relative flex-1 h-16 sm:h-[72px] overflow-hidden clip-bevel-sm border transition-all duration-300",
              active === i
                ? "border-hex-400 ring-1 ring-hex-400/40"
                : "border-hex-600/40 opacity-50 hover:opacity-80 hover:border-hex-400/50",
            )}
          >
            <Image
              src={p.src}
              alt={p.label}
              fill
              sizes="25vw"
              className="object-contain object-center bg-void-950"
            />
            {/* Dark wash on inactive */}
            {active !== i && <div className="absolute inset-0 bg-void-950/50" />}
            {/* Active gold glow */}
            {active === i && <div className="absolute inset-0 bg-gradient-to-t from-hex-400/20 to-transparent pointer-events-none" />}
            {/* Index label */}
            <span className={cn(
              "absolute bottom-1 right-1.5 font-mono text-[9px] tabular-nums transition-colors",
              active === i ? "text-hex-300" : "text-hex-300/40",
            )}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </m.div>

    {/* ── Lightbox ── */}
    <AnimatePresence>
      {lightbox && (
        <m.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-void-950/92 backdrop-blur-md" />

          {/* Hex grid on backdrop */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="lbHex" width="56" height="48.5" patternUnits="userSpaceOnUse">
                  <polygon points="28,0 56,16 56,40 28,56 0,40 0,16" fill="none" stroke="#c8aa6e" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#lbHex)" />
            </svg>
          </div>

          {/* Image container */}
          <m.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[85vh] border border-hex-400/50 clip-bevel overflow-hidden bg-void-950"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner border */}
            <div className="absolute inset-2 border border-hex-400/15 clip-bevel-sm pointer-events-none z-10" />

            {/* Image */}
            <div className="relative w-full" style={{ aspectRatio: "auto", minHeight: "60vh" }}>
              <Image
                src={portraits[active].src}
                alt={portraits[active].label}
                fill
                sizes="90vw"
                className="object-contain object-center"
                priority
              />
            </div>

            {/* Top bar */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-void-950/90 to-transparent pointer-events-none">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-hex-300/70">
                {portraits[active].label}
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-hex-300/50 tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(portraits.length).padStart(2, "0")}
              </span>
            </div>

            {/* Prev / Next buttons */}
            <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-3">
              <button
                onClick={() => goTo((active - 1 + portraits.length) % portraits.length)}
                className="flex items-center justify-center w-9 h-9 bg-void-950/80 border border-hex-600/50 hover:border-hex-400 text-hex-300 hover:text-hex-100 transition-all clip-bevel-sm"
                aria-label="Previous"
              >
                ‹
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3">
              <button
                onClick={() => goTo((active + 1) % portraits.length)}
                className="flex items-center justify-center w-9 h-9 bg-void-950/80 border border-hex-600/50 hover:border-hex-400 text-hex-300 hover:text-hex-100 transition-all clip-bevel-sm"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </m.div>

          {/* Close hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] tracking-[0.35em] uppercase text-hex-300/40">
            Click outside or press Esc to close
          </div>
        </m.div>
      )}
    </AnimatePresence>
    </>
  );
}

/* ============================================================
   RIGHT — Champion info / lock-in panel
   ============================================================ */
function InfoPanel() {
  return (
    <m.div
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
            Backend · Node.js · PHP · 3+ Years
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
            <StatCell label="Years" value="03+" />
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
    </m.div>
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
    <m.div
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

        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start pb-6">
          {techRoster.map((t, i) => (
            <BenchHex key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </m.div>
  );
}

function BenchHex({
  name,
  icon,
  letter,
  primary,
  index,
}: TechItem & { index: number }) {
  // Gold tint via SimpleIcons color parameter — strip # from hex
  const iconColor = primary ? "c8aa6e" : "a08040";
  const iconSrc = icon
    ? `https://cdn.simpleicons.org/${icon}/${iconColor}`
    : null;

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.04, ease }}
      whileHover={{ y: -4, scale: 1.06 }}
      className="relative group cursor-default select-none"
      title={name}
    >
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
        {/* Hex frame SVG */}
        <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full transition-all duration-300">
          {/* Glow fill — only visible on hover or if primary */}
          <polygon
            points="28,3 50,15.5 50,40.5 28,53 6,40.5 6,15.5"
            fill={primary ? "rgba(200,170,110,0.14)" : "rgba(200,170,110,0.03)"}
            stroke={primary ? "#c8aa6e" : "#604820"}
            strokeWidth="1.2"
            className="transition-all duration-300 group-hover:fill-[rgba(200,170,110,0.18)] group-hover:stroke-[#c8aa6e]"
          />
          {/* Inner ring */}
          <polygon
            points="28,9 43.5,18 43.5,38 28,47 12.5,38 12.5,18"
            fill="none"
            stroke={primary ? "#a07830" : "#3a2e18"}
            strokeWidth="0.6"
            className="transition-all duration-300 group-hover:stroke-[#786040]"
          />
        </svg>

        {/* Icon or letter */}
        <div className="relative z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8">
          {iconSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={iconSrc}
              alt={name}
              width={28}
              height={28}
              loading="lazy"
              className={cn(
                "w-full h-full object-contain transition-all duration-300",
                primary ? "opacity-90" : "opacity-45 group-hover:opacity-80",
                /* On hover: punch brightness up slightly */
                "group-hover:brightness-110",
              )}
              style={{
                filter: primary
                  ? "brightness(1.05)"
                  : "brightness(0.9)",
              }}
            />
          ) : (
            <span
              className={cn(
                "font-mono text-[11px] sm:text-xs font-semibold tracking-tight transition-colors",
                primary ? "text-hex-100" : "text-hex-200/60 group-hover:text-hex-100",
              )}
            >
              {letter}
            </span>
          )}
        </div>
      </div>

      {/* Name tooltip below */}
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1 text-[9px] tracking-[0.18em] uppercase text-hex-300/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {name}
      </span>
    </m.div>
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
      {/* Subtle rotating hex — CSS only, no Three.js */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.04]">
        <svg viewBox="0 0 400 400" className="w-[500px] h-[500px] animate-spin-slow">
          <polygon points="200,20 360,110 360,290 200,380 40,290 40,110" fill="none" stroke="#c8aa6e" strokeWidth="1"/>
          <polygon points="200,60 330,130 330,270 200,340 70,270 70,130" fill="none" stroke="#c8aa6e" strokeWidth="0.6"/>
          <polygon points="200,100 300,155 300,245 200,300 100,245 100,155" fill="none" stroke="#0ac8b9" strokeWidth="0.4"/>
        </svg>
      </div>
    </>
  );
}
