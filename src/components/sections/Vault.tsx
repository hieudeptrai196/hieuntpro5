"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { proverbs, type Proverb } from "@/lib/quotes";
import { cn } from "@/lib/cn";

type Phase = "idle" | "opening" | "revealed";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Vault — a LoL-style Hextech chest that rolls a random proverb when opened.
 * Pure visual easter egg; client-only.
 */
export function Vault() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [quote, setQuote] = useState<Proverb | null>(null);

  function pickQuote(prev: Proverb | null): Proverb {
    if (proverbs.length === 1) return proverbs[0];
    let next: Proverb;
    do {
      next = proverbs[Math.floor(Math.random() * proverbs.length)];
    } while (prev && next.text === prev.text);
    return next;
  }

  const open = () => {
    if (phase === "opening") return;
    setPhase("opening");
    setQuote(pickQuote(quote));
    setTimeout(() => setPhase("revealed"), 900);
  };

  const reset = () => setPhase("idle");

  const openAgain = () => {
    setPhase("idle");
    setTimeout(open, 220);
  };

  return (
    <section
      id="vault"
      className="relative section-edge py-28 sm:py-36 px-5 sm:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <SectionLabel
          eyebrow="Vault // Boon"
          title="Hextech Chest"
          description="Click the vault. Each opening drops a single piece of engineering wisdom."
        />

        <div className="flex flex-col items-center">
          <Chest phase={phase} onOpen={open} onReset={reset} />

          <AnimatePresence mode="wait">
            {phase === "revealed" && quote && (
              <QuoteCard
                key={quote.text}
                quote={quote}
                onAgain={openAgain}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Chest — Hextech cube with cyan crystal core (League of Legends)
   ============================================================ */
function Chest({
  phase,
  onOpen,
  onReset,
}: {
  phase: Phase;
  onOpen: () => void;
  onReset: () => void;
}) {
  const idle = phase === "idle";
  const opening = phase === "opening";
  const revealed = phase === "revealed";

  return (
    <div className="relative">
      <motion.button
        onClick={revealed ? onReset : onOpen}
        disabled={opening}
        animate={
          opening
            ? { scale: [1, 1.06, 0.97, 1.04, 1], rotate: [0, -1.5, 1.5, -0.8, 0] }
            : revealed
            ? { scale: 0.78, opacity: 0.6 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: opening ? 0.9 : 0.6, ease }}
        whileHover={idle ? { scale: 1.04, rotate: -1 } : {}}
        whileTap={idle ? { scale: 0.97 } : {}}
        className="relative w-60 h-60 sm:w-72 sm:h-72 cursor-pointer disabled:cursor-progress group"
        aria-label="Open Hextech vault"
      >
        {/* Ambient floor glow */}
        <motion.div
          animate={
            opening
              ? { scale: 3.2, opacity: 0 }
              : { scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.6, 0.3] }
          }
          transition={
            opening
              ? { duration: 0.9, ease }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute inset-0 bg-cyan-glow/30 blur-3xl pointer-events-none"
        />

        {/* Light rays bursting outward */}
        {opening && (
          <>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
              <motion.span
                key={rot}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, ease, delay: 0.15 }}
                style={{
                  transform: `translate(-50%, -100%) rotate(${rot}deg)`,
                  transformOrigin: "50% 100%",
                }}
                className="absolute left-1/2 top-1/2 w-1 h-40 bg-gradient-to-t from-cyan-glow via-cyan-glow/70 to-transparent pointer-events-none"
              />
            ))}
          </>
        )}

        {/* Hextech chest SVG */}
        <svg
          viewBox="0 0 240 240"
          className="absolute inset-0 w-full h-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.6)]"
        >
          <defs>
            {/* Brass gradients */}
            <linearGradient id="brassMain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8c987" />
              <stop offset="35%" stopColor="#c8aa6e" />
              <stop offset="70%" stopColor="#8a6d3a" />
              <stop offset="100%" stopColor="#3e2c10" />
            </linearGradient>
            <linearGradient id="brassDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5e4720" />
              <stop offset="100%" stopColor="#1f1408" />
            </linearGradient>
            <linearGradient id="brassEdge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5e1a8" />
              <stop offset="100%" stopColor="#785a28" />
            </linearGradient>
            <linearGradient id="recessFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#020812" />
              <stop offset="100%" stopColor="#0a1428" />
            </linearGradient>

            {/* Crystal */}
            <radialGradient id="crystalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c2faff" stopOpacity="1" />
              <stop offset="40%" stopColor="#0ac8b9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0ac8b9" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="crystalFace" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d8fbff" />
              <stop offset="35%" stopColor="#5eecff" />
              <stop offset="70%" stopColor="#0ac8b9" />
              <stop offset="100%" stopColor="#005a82" />
            </linearGradient>
          </defs>

          {/* Chamfered cube body */}
          <polygon
            points="36,12 204,12 228,36 228,204 204,228 36,228 12,204 12,36"
            fill="url(#brassMain)"
            stroke="#2a1d08"
            strokeWidth="2"
          />
          {/* Bevel highlight on top edge */}
          <polygon
            points="36,12 204,12 220,28 36,28"
            fill="#f0d99a"
            opacity="0.55"
          />
          {/* Shadow on bottom edge */}
          <polygon
            points="20,212 220,212 204,228 36,228 20,212"
            fill="#1f1408"
            opacity="0.6"
          />

          {/* Inner recessed frame */}
          <polygon
            points="48,28 192,28 212,48 212,192 192,212 48,212 28,192 28,48"
            fill="url(#brassDark)"
            stroke="#1a1006"
            strokeWidth="1"
          />

          {/* Recessed center panel (dark void) */}
          <rect
            x="62"
            y="62"
            width="116"
            height="116"
            fill="url(#recessFill)"
            stroke="#3e2c10"
            strokeWidth="1.5"
          />

          {/* Corner armor plates — heavy gold reinforcements */}
          {[
            { x: 0, y: 0, rot: 0 },
            { x: 240, y: 0, rot: 90 },
            { x: 240, y: 240, rot: 180 },
            { x: 0, y: 240, rot: 270 },
          ].map((c, i) => (
            <g key={i} transform={`rotate(${c.rot} ${c.x} ${c.y})`}>
              <polygon
                points={`${c.x + 12},${c.y + 36} ${c.x + 36},${c.y + 12} ${c.x + 64},${c.y + 12} ${c.x + 64},${c.y + 22} ${c.x + 40},${c.y + 22} ${c.x + 22},${c.y + 40} ${c.x + 22},${c.y + 64} ${c.x + 12},${c.y + 64}`}
                fill="url(#brassEdge)"
                stroke="#3e2c10"
                strokeWidth="0.8"
              />
              {/* Rivet */}
              <circle cx={c.x + 18} cy={c.y + 18} r="2.5" fill="#3e2c10" />
              <circle cx={c.x + 18} cy={c.y + 18} r="1.2" fill="#f5e1a8" />
            </g>
          ))}

          {/* Cross-shaped gold inlay around crystal */}
          {/* Top arm */}
          <polygon
            points="116,28 124,28 124,62 116,62"
            fill="url(#brassEdge)"
            stroke="#3e2c10"
            strokeWidth="0.6"
          />
          {/* Bottom arm */}
          <polygon
            points="116,178 124,178 124,212 116,212"
            fill="url(#brassEdge)"
            stroke="#3e2c10"
            strokeWidth="0.6"
          />
          {/* Left arm */}
          <polygon
            points="28,116 28,124 62,124 62,116"
            fill="url(#brassEdge)"
            stroke="#3e2c10"
            strokeWidth="0.6"
          />
          {/* Right arm */}
          <polygon
            points="178,116 178,124 212,124 212,116"
            fill="url(#brassEdge)"
            stroke="#3e2c10"
            strokeWidth="0.6"
          />

          {/* Crystal radial glow behind */}
          <motion.circle
            cx="120"
            cy="120"
            r="58"
            fill="url(#crystalGlow)"
            animate={
              opening
                ? { scale: [1, 1.8, 0.8], opacity: [1, 1, 0] }
                : { scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }
            }
            transition={
              opening
                ? { duration: 0.9, ease }
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "120px 120px" }}
          />

          {/* Hexagonal crystal */}
          <motion.g
            animate={
              opening
                ? { scale: [1, 1.5, 0], opacity: [1, 1, 0] }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.9, ease }}
            style={{ transformOrigin: "120px 120px" }}
          >
            <polygon
              points="120,76 156,98 156,142 120,164 84,142 84,98"
              fill="url(#crystalFace)"
              stroke="#005a82"
              strokeWidth="1.5"
            />
            {/* Facet lines */}
            <polyline
              points="84,98 120,120 156,98"
              fill="none"
              stroke="#c2faff"
              strokeWidth="0.8"
              opacity="0.7"
            />
            <polyline
              points="84,142 120,120 156,142"
              fill="none"
              stroke="#005a82"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <line
              x1="120"
              y1="76"
              x2="120"
              y2="164"
              stroke="#c2faff"
              strokeWidth="0.5"
              opacity="0.4"
            />
            {/* Specular highlight */}
            <polygon
              points="120,76 156,98 144,108 110,90"
              fill="#ffffff"
              opacity="0.45"
            />
          </motion.g>

          {/* Outer thin gold trim */}
          <polygon
            points="36,12 204,12 228,36 228,204 204,228 36,228 12,204 12,36"
            fill="none"
            stroke="#f5e1a8"
            strokeWidth="0.8"
            opacity="0.55"
          />
        </svg>

        {/* OPENED stamp */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ease }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="px-3 py-1 text-[10px] tracking-[0.4em] uppercase font-mono text-hex-100 bg-void-950/70 border border-hex-400/60 clip-bevel-sm">
              ✦ Opened ✦
            </span>
          </motion.div>
        )}
      </motion.button>

      {/* Hint text below */}
      <div className="text-center mt-5 h-5">
        <AnimatePresence mode="wait">
          {idle && (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "text-[10px] tracking-[0.45em] uppercase font-mono text-hex-400",
                "animate-pulse",
              )}
            >
              ◇ Click to Open ◇
            </motion.div>
          )}
          {opening && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] tracking-[0.45em] uppercase font-mono text-hex-300"
            >
              Unsealing…
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================
   Quote card revealed after the chest opens
   ============================================================ */
function QuoteCard({
  quote,
  onAgain,
}: {
  quote: Proverb;
  onAgain: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.7, ease }}
      className="relative mt-8 sm:mt-10 w-full max-w-xl"
    >
      <div className="relative bg-gradient-to-b from-void-900 to-void-950 border border-hex-400/60 clip-bevel corner-bracket px-7 sm:px-10 py-8 sm:py-9 text-center">
        <div className="absolute inset-2 border border-hex-400/15 clip-bevel-sm pointer-events-none" />

        <div className="text-[10px] tracking-[0.45em] uppercase text-hex-400 font-mono mb-5">
          ◆ Ancient Code ◆
        </div>

        <p
          className="text-base sm:text-xl text-hex-100/95 leading-relaxed italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          &ldquo;{quote.text}&rdquo;
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 text-xs tracking-[0.25em] uppercase text-hex-300">
          <span className="h-px w-8 bg-hex-600" />
          <span>{quote.author}</span>
          <span className="h-px w-8 bg-hex-600" />
        </div>

        <button
          onClick={onAgain}
          className="mt-7 inline-flex items-center gap-2 px-6 py-2.5 text-[10px] tracking-[0.3em] uppercase font-semibold border border-hex-400/60 text-hex-200 hover:bg-hex-400/10 hover:text-hex-100 transition-colors clip-bevel-sm"
        >
          <span className="text-hex-400">⟲</span>
          Open Again
        </button>
      </div>
    </motion.div>
  );
}
