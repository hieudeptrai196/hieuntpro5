"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider } from "@/components/ui/HexFrame";
import { siteConfig } from "@/lib/data";

type Channel = {
  label:    string;
  value:    string;
  href:     string | null;
  glyph:    string;
  external?: boolean;
  copyable?: boolean;
};

const channels: Channel[] = [
  { label: "Email",   value: siteConfig.email,   href: `mailto:${siteConfig.email}`, glyph: "✉", copyable: true },
  { label: "Phone",   value: siteConfig.phone,   href: `tel:${siteConfig.phone}`,   glyph: "☏", copyable: true },
  { label: "LinkedIn",value: "hieunguyen196",     href: siteConfig.linkedin,         glyph: "⌬", external: true },
  { label: "Region",  value: siteConfig.location, href: null,                        glyph: "◈" },
];

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (e: React.MouseEvent, value: string, label: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="relative section-edge py-28 sm:py-36 px-5 sm:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <SectionLabel
          eyebrow="Summon // Chapter 05"
          title="Send the Signal"
          description="Open to new campaigns, technical consultancy, or simply a conversation on systems and craft."
        />

        <Reveal>
          <div className="relative bg-gradient-to-b from-void-900 to-void-950 border border-hex-600/50 clip-bevel p-8 sm:p-12 corner-bracket">
            <div className="grid sm:grid-cols-2 gap-5">
              {channels.map((c) => (
                <div key={c.label} className="relative group">
                  <a
                    href={c.href ?? undefined}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-4 p-5 border border-hex-600/30 clip-bevel-sm bg-void-900/40 ${
                      c.href ? "hover:border-hex-400/70 hover:bg-hex-400/5" : ""
                    } transition-all`}
                  >
                    <span className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-hex-400 text-lg border border-hex-600/60 group-hover:border-hex-400 transition-colors clip-bevel-sm">
                      {c.glyph}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-hex-300/70 font-mono">
                        {c.label}
                      </div>
                      <div className="text-sm text-hex-100 mt-0.5 truncate font-mono">
                        {c.value}
                      </div>
                    </div>
                    {c.href && !c.copyable && (
                      <span className="ml-auto text-hex-300/40 group-hover:text-hex-300 group-hover:translate-x-1 transition-all flex-shrink-0">
                        →
                      </span>
                    )}
                  </a>

                  {/* Copy button */}
                  {c.copyable && (
                    <button
                      onClick={(e) => handleCopy(e, c.value, c.label)}
                      aria-label={`Copy ${c.label}`}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                                 flex items-center gap-1 px-2 py-1
                                 text-[9px] tracking-[0.2em] uppercase font-mono
                                 border border-hex-600/30 bg-void-950/80
                                 text-hex-300/50 hover:text-cyan-glow hover:border-cyan-glow/50
                                 transition-all clip-bevel-sm"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied === c.label ? (
                          <m.span
                            key="copied"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{   opacity: 0, y:  4 }}
                            className="text-cyan-glow"
                          >
                            ✓ Copied
                          </m.span>
                        ) : (
                          <m.span
                            key="copy"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{   opacity: 0, y:  4 }}
                          >
                            Copy
                          </m.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <GoldDivider className="my-10" />

            <div className="text-center">
              <p className="text-hex-100/70 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                Have a system to build, scale, or salvage? Let&apos;s talk
                architecture and trade-offs.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-3 px-8 py-3.5 clip-bevel bg-gradient-to-b from-hex-400 to-hex-600 text-void-950 font-semibold tracking-[0.25em] uppercase text-xs hover:from-hex-300 hover:to-hex-400 transition-all"
              >
                Begin Conversation
                <span>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
