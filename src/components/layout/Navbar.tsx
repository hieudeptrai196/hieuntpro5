"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-void-950/85 backdrop-blur-md border-b border-hex-600/30"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Crest */}
        <a href="#top" className="flex items-center gap-3 group">
          <Crest />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="display-h text-sm text-hex-100">
              {siteConfig.name.split(" ").pop()}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-hex-300 uppercase">
              Developer
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={cn(
                  "relative px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase transition-colors",
                  active === l.id
                    ? "text-hex-100"
                    : "text-hex-300/60 hover:text-hex-200",
                )}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-2 right-2 -bottom-0.5 h-px bg-hex-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="hidden md:inline-flex relative items-center gap-2 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-hex-100 border border-hex-400/60 hover:bg-hex-400/10 transition-all clip-bevel-sm group"
        >
          <span className="absolute inset-0 border border-hex-400/20 m-0.5 clip-bevel-sm pointer-events-none" />
          <span className="relative">Recruit</span>
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-hex-300"
        >
          <div className="w-5 h-3.5 flex flex-col justify-between">
            <span className={cn("h-px bg-current transition-all", mobileOpen && "translate-y-[7px] rotate-45")} />
            <span className={cn("h-px bg-current transition-opacity", mobileOpen && "opacity-0")} />
            <span className={cn("h-px bg-current transition-all", mobileOpen && "-translate-y-[7px] -rotate-45")} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-void-950/95 backdrop-blur-md border-t border-hex-600/30">
          <ul className="max-w-6xl mx-auto px-5 py-5 flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-xs font-semibold tracking-[0.3em] uppercase text-hex-200/80 hover:text-hex-100 hover:bg-hex-600/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-center px-4 py-3 text-xs font-semibold tracking-[0.3em] uppercase text-hex-100 border border-hex-400/60 clip-bevel-sm"
              >
                Recruit
              </a>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}

function Crest() {
  return (
    <svg
      className="w-8 h-8 text-hex-400 transition-transform group-hover:rotate-12"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <polygon
        points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <polygon
        points="20,9 30,14.5 30,25.5 20,31 10,25.5 10,14.5"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="12"
        fontWeight="600"
        fill="currentColor"
      >
        H
      </text>
    </svg>
  );
}
