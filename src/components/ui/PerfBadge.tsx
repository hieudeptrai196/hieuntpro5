"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

// ── Types ────────────────────────────────────────────────────────────────────

type Stats = {
  // Timing
  loadMs: number;
  ttfbMs: number;
  domReadyMs: number;
  // Resources
  resources: number;
  transferKB: number;
  // Web Vitals (best-effort)
  fcpMs: number | null;
  lcpMs: number | null;
  // Network
  connection: string;
  downlinkMbps: number | null;
};

// ── Collect ───────────────────────────────────────────────────────────────────

function collect(): Stats {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

  const loadMs     = nav ? Math.round(nav.loadEventEnd  - nav.startTime) : Math.round(performance.now());
  const ttfbMs     = nav ? Math.round(nav.responseStart - nav.startTime) : 0;
  const domReadyMs = nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0;

  const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  const resources  = entries.length;
  const transferKB = Math.round(entries.reduce((s, e) => s + (e.transferSize ?? 0), 0) / 1024);

  // FCP / LCP from PerformanceObserver entries already buffered
  let fcpMs: number | null = null;
  let lcpMs: number | null = null;
  try {
    const paintEntries = performance.getEntriesByType("paint");
    const fcp = paintEntries.find((e) => e.name === "first-contentful-paint");
    if (fcp) fcpMs = Math.round(fcp.startTime);
    // LCP — may be available via buffered entries in newer browsers
    const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
    if (lcpEntries.length) lcpMs = Math.round(lcpEntries[lcpEntries.length - 1].startTime);
  } catch {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conn = (navigator as any).connection;
  let connection = "Unknown";
  let downlinkMbps: number | null = null;
  if (conn) {
    const t = conn.effectiveType as string;
    const map: Record<string, string> = { "4g": "4G", "3g": "3G", "2g": "2G", "slow-2g": "Slow 2G" };
    connection = map[t] ?? t.toUpperCase();
    if (conn.downlink) downlinkMbps = conn.downlink as number;
  }

  return { loadMs, ttfbMs, domReadyMs, resources, transferKB, fcpMs, lcpMs, connection, downlinkMbps };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtMs(ms: number): string {
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(2)} s`;
}

type Tier = "good" | "ok" | "poor";

function tier(ms: number, good: number, poor: number): Tier {
  if (ms <= good) return "good";
  if (ms <= poor) return "ok";
  return "poor";
}

const tierColor: Record<Tier, string> = {
  good: "text-cyan-glow",
  ok:   "text-hex-300",
  poor: "text-red-400/80",
};

const tierBg: Record<Tier, string> = {
  good: "bg-cyan-glow/10 border-cyan-glow/30",
  ok:   "bg-hex-400/8 border-hex-600/40",
  poor: "bg-red-400/8 border-red-400/30",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function PerfBadge() {
  const [stats,     setStats]     = useState<Stats | null>(null);
  const [visible,   setVisible]   = useState(false);
  const [open,      setOpen]      = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const show = () => {
      setStats(collect());
      setVisible(true);
    };
    if (document.readyState === "complete") {
      setTimeout(show, 1200);
    } else {
      window.addEventListener("load", () => setTimeout(show, 1200), { once: true });
    }
  }, []);

  // Close modal on Escape
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  if (dismissed) return null;

  return (
    <>
      {/* ── Badge ── */}
      <AnimatePresence>
        {visible && stats && (
          <m.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,   scale: 1   }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 right-6 z-40 font-mono"
          >
            <div
              className="relative bg-void-950/95 border border-hex-600/40 backdrop-blur-sm overflow-hidden"
              style={{ clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 px-3 py-1.5 border-b border-hex-600/25 bg-void-900/60">
                <button
                  onClick={() => setOpen(true)}
                  className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-glow animate-pulse" />
                  <span className="text-[9px] tracking-[0.3em] uppercase text-hex-300/60 hover:text-hex-300/90 transition-colors">
                    System Diagnostics
                  </span>
                </button>
                <button
                  onClick={() => setDismissed(true)}
                  className="text-hex-300/30 hover:text-hex-300/80 transition-colors text-xs leading-none"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
              </div>

              {/* Mini stats — click to expand */}
              <button
                onClick={() => setOpen(true)}
                className="grid grid-cols-4 gap-px bg-hex-600/15 px-px pb-px w-full hover:brightness-110 transition-all"
              >
                <MiniCell
                  label="Load"
                  value={fmtMs(stats.loadMs)}
                  t={tier(stats.loadMs, 800, 2000)}
                />
                <MiniCell label="Files" value={String(stats.resources)} />
                <MiniCell label="Size"  value={stats.transferKB > 0 ? `${stats.transferKB}KB` : "--"} />
                <MiniCell label="Net"   value={stats.connection} />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && stats && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-void-950/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <m.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-4 sm:inset-auto sm:top-24 sm:right-8 sm:w-[420px] z-50 font-mono"
              style={{ clipPath: "polygon(14px 0%,100% 0%,100% calc(100% - 14px),calc(100% - 14px) 100%,0% 100%,0% 14px)" }}
            >
              <div className="bg-void-950 border border-hex-600/50">

                {/* Modal header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-hex-600/30 bg-void-900/60">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-hex-300/80">
                      Performance Report
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-hex-300/40 hover:text-hex-300/90 transition-colors text-sm"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-5 space-y-5 overflow-y-auto max-h-[60vh] overscroll-contain">

                  {/* ── Methodology banner ── */}
                  <div className="flex gap-3 px-3 py-3 bg-void-900/60 border border-hex-600/25">
                    <span className="text-cyan-glow text-sm flex-shrink-0 mt-0.5">📡</span>
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-hex-300/70 font-mono">
                        Telemetry Protocol
                      </p>
                      <p className="text-[10px] text-hex-200/50 leading-relaxed">
                        Telemetry is read directly from the{" "}
                        <span className="text-hex-300/80">Browser Performance API</span>
                        {" "}— the native browser API available after load complete.
                        No external tracking scripts are used, and no data is sent to any server.
                        Results reflect actual real-time speeds on{" "}
                        <span className="text-hex-300/80">your local device & network</span>
                        {" "}at the moment of access.
                      </p>
                    </div>
                  </div>

                  {/* ── Section: Page Load Timing ── */}
                  <ModalSection title="Page Load Timing">
                    <MetricRow
                      label="Total Load Time"
                      value={fmtMs(stats.loadMs)}
                      t={tier(stats.loadMs, 800, 2000)}
                      good="< 800 ms"
                      desc="Duration from navigation start until all resources finish loading (window.load event)."
                    />
                    <MetricRow
                      label="Time to First Byte (TTFB)"
                      value={stats.ttfbMs > 0 ? fmtMs(stats.ttfbMs) : "--"}
                      t={tier(stats.ttfbMs, 200, 600)}
                      good="< 200 ms"
                      desc="Time taken for the server/Cloudflare CDN to respond with the first byte of HTML."
                    />
                    <MetricRow
                      label="DOM Interactive"
                      value={stats.domReadyMs > 0 ? fmtMs(stats.domReadyMs) : "--"}
                      t={tier(stats.domReadyMs, 500, 1200)}
                      good="< 500 ms"
                      desc="When the browser finishes parsing HTML and the DOM tree is ready, before images load."
                    />
                  </ModalSection>

                  {/* ── Section: Core Web Vitals ── */}
                  <ModalSection title="Core Web Vitals">
                    {stats.fcpMs !== null ? (
                      <MetricRow
                        label="First Contentful Paint (FCP)"
                        value={fmtMs(stats.fcpMs)}
                        t={tier(stats.fcpMs, 1800, 3000)}
                        good="< 1.8 s"
                        desc="The time when the first text or image is rendered. A good FCP reassures users that the page is loading."
                      />
                    ) : (
                      <UnavailableRow label="First Contentful Paint (FCP)" />
                    )}
                    {stats.lcpMs !== null ? (
                      <MetricRow
                        label="Largest Contentful Paint (LCP)"
                        value={fmtMs(stats.lcpMs)}
                        t={tier(stats.lcpMs, 2500, 4000)}
                        good="< 2.5 s"
                        desc="When the largest content element (e.g. hero image or heading) is rendered. Core Google quality metric."
                      />
                    ) : (
                      <UnavailableRow label="Largest Contentful Paint (LCP)" />
                    )}
                  </ModalSection>

                  {/* ── Section: Resources ── */}
                  <ModalSection title="Resources">
                    <MetricRow
                      label="Resource Count"
                      value={`${stats.resources} files`}
                      desc="Total number of JS, CSS, font, and image requests made by this page session."
                    />
                    <MetricRow
                      label="Transferred Size"
                      value={stats.transferKB > 0 ? `${stats.transferKB} KB` : "--"}
                      t={stats.transferKB > 0 ? tier(stats.transferKB, 300, 800) : undefined}
                      good="< 300 KB"
                      desc="Total compressed payload (Brotli/Gzip) sent over the network. Smaller is faster on mobile."
                    />
                  </ModalSection>

                  {/* ── Section: Connection ── */}
                  <ModalSection title="Connection">
                    <MetricRow
                      label="Connection Type"
                      value={stats.connection}
                      desc="Effective network type detected by the browser using the Network Information API."
                    />
                    {stats.downlinkMbps !== null && (
                      <MetricRow
                        label="Estimated Bandwidth"
                        value={`${stats.downlinkMbps} Mbps`}
                        desc="Approximate real-time downlink speed estimated by your browser."
                      />
                    )}
                  </ModalSection>

                  {/* Footer note */}
                  <p className="text-[10px] text-hex-300/30 leading-relaxed pt-1 border-t border-hex-600/20">
                    Data collected via browser Performance APIs in this current session.
                    Values vary depending on local cache state and real-time network latency.
                    Served by Vercel + Cloudflare CDN.
                  </p>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function MiniCell({ label, value, t }: { label: string; value: string; t?: Tier }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-2 px-3 bg-void-950/80">
      <span className="text-[8px] tracking-[0.2em] uppercase text-hex-300/35">{label}</span>
      <span className={`text-xs font-bold tabular-nums ${t ? tierColor[t] : "text-hex-200"}`}>
        {value}
      </span>
    </div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-1 rotate-45 bg-hex-400 flex-shrink-0" />
        <span className="text-[9px] tracking-[0.35em] uppercase text-hex-300/50">{title}</span>
        <span className="flex-1 h-px bg-hex-600/25" />
      </div>
      {children}
    </div>
  );
}

function MetricRow({
  label, value, t, good, desc,
}: {
  label: string;
  value: string;
  t?: Tier;
  good?: string;
  desc: string;
}) {
  return (
    <div className={`px-3 py-2.5 border ${t ? tierBg[t] : "bg-void-900/40 border-hex-600/20"} space-y-1.5`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] text-hex-200/70">{label}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {good && t && (
            <span className={`text-[9px] ${tierColor[t]} opacity-60`}>
              {t === "good" ? "✓ Good" : t === "ok" ? "~ Needs Work" : "✗ Slow"}
            </span>
          )}
          <span className={`text-sm font-bold tabular-nums ${t ? tierColor[t] : "text-hex-100"}`}>
            {value}
          </span>
        </div>
      </div>
      <p className="text-[10px] text-hex-300/40 leading-relaxed">{desc}</p>
      {good && (
        <p className="text-[9px] text-hex-300/25">Target: {good}</p>
      )}
    </div>
  );
}

function UnavailableRow({ label }: { label: string }) {
  return (
    <div className="px-3 py-2.5 border border-hex-600/15 bg-void-900/20 flex items-center justify-between">
      <span className="text-[10px] text-hex-200/40">{label}</span>
      <span className="text-[10px] text-hex-300/25">Not supported by browser</span>
    </div>
  );
}
