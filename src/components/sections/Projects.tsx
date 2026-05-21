"use client";

import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/cn";

type Project = {
  name: string;
  body: string;
  company: string;
  link?: string;
  award?: string;
};

// Flatten projects across all experiences, preserving order and the
// company they belong to. Source-of-truth stays in `data.ts`.
const allProjects: Project[] = experiences.flatMap((e) =>
  "projects" in e
    ? e.projects.map((p) => ({
        ...p,
        company: e.company,
        link: "link" in p ? (p as { link?: string }).link : undefined,
      }))
    : [],
);

export function Projects() {
  return (
    <section
      id="projects"
      className="relative section-edge py-28 sm:py-36 px-5 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel
          eyebrow="Arsenal // Chapter 04"
          title="Featured Projects"
          description="Production systems forged in real-world battle — telecommunications, e-commerce, and AI-driven products."
        />

        <StaggerGroup className="grid md:grid-cols-2 gap-6 lg:gap-8" stagger={0.1}>
          {allProjects.map((p, i) => (
            <StaggerItem key={p.name}>
              <ProjectCard project={p} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const hasLink = Boolean(project.link);

  // Strip protocol + trailing slash for display
  const displayUrl = project.link
    ? project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  const Wrapper = hasLink ? "a" : "article";
  const wrapperProps = hasLink
    ? {
        href: project.link,
        target: "_blank" as const,
        rel: "noopener noreferrer",
        "aria-label": `Open ${project.name}`,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col h-full bg-gradient-to-br from-void-900 via-void-800 to-void-950",
        "border transition-all duration-500 clip-bevel overflow-hidden",
        hasLink
          ? "border-hex-600/40 hover:border-hex-400/70 cursor-pointer"
          : "border-hex-600/30 cursor-default",
      )}
    >
      {/* Hover sheen */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500",
          hasLink
            ? "bg-gradient-to-br from-hex-400/0 to-hex-400/0 group-hover:from-hex-400/[0.05] group-hover:to-hex-400/[0.02]"
            : "bg-transparent",
        )}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-6 pt-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <ProjectGlyph index={index} hasLink={hasLink} />
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-hex-300/80 uppercase">
              {project.company}
            </div>
            <div className="font-mono text-[10px] text-hex-300/40 mt-0.5">
              No. {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
        {project.award && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-hex-400/60 bg-hex-400/10 text-hex-200 text-[10px] font-bold tracking-[0.15em] uppercase clip-bevel-sm">
            <span className="text-hex-300">★</span> {project.award}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="relative flex-1 px-6 pb-5 pt-5">
        <h3
          className={cn(
            "display-h text-xl text-hex-100 leading-tight mb-3 transition-colors duration-300",
            hasLink && "group-hover:text-hex-shine",
          )}
        >
          {project.name}
        </h3>
        <p className="text-sm text-hex-100/65 leading-relaxed">{project.body}</p>
      </div>

      {/* Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-hex-600/60 to-transparent flex-shrink-0" />

      {/* Footer — linked vs classified */}
      <div className="relative flex-shrink-0 overflow-hidden">
        {hasLink ? (
          /* ── LINKED FOOTER ── */
          <div className="relative px-6 py-4">
            {/* Default state */}
            <div
              className={cn(
                "flex items-center justify-between text-[10px] tracking-[0.3em] uppercase font-mono transition-all duration-300",
                hovered ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0",
              )}
            >
              <span className="text-hex-300/60">System // Live</span>
              <span className="flex items-center gap-1.5 text-hex-400">
                Open ↗
              </span>
            </div>

            {/* Hover preview bar */}
            <AnimatePresence>
              {hovered && (
                <m.div
                  key="preview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center gap-3 px-6"
                >
                  {/* Browser-bar chrome */}
                  <div className="flex-1 flex items-center gap-2 bg-void-950/80 border border-hex-400/40 clip-bevel-sm px-3 py-1.5">
                    {/* Traffic dots */}
                    <span className="w-1.5 h-1.5 rounded-full bg-hex-600/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-hex-600/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-hex-600/60" />
                    <span className="mx-1 w-px h-3 bg-hex-600/40" />
                    <span className="flex-1 font-mono text-[10px] text-hex-300/80 truncate">
                      {displayUrl}
                    </span>
                  </div>
                  {/* Launch arrow */}
                  <span className="flex-shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase text-hex-400 flex items-center gap-1">
                    Launch
                    <m.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ↗
                    </m.span>
                  </span>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* ── NO-LINK FOOTER — "CLASSIFIED" ── */
          <div className="flex items-center justify-between px-6 py-4 text-[10px] tracking-[0.3em] uppercase font-mono">
            <span className="flex items-center gap-2 text-hex-300/40">
              <span className="block w-3 h-px bg-hex-600/50" />
              <span className="block w-1.5 h-1.5 rotate-45 border border-hex-600/50" />
              <span>Internal System</span>
            </span>
            <span className="text-hex-300/25">{"// NDA"}</span>
          </div>
        )}
      </div>

      {/* Linked card: subtle bottom scan line on hover */}
      {hasLink && (
        <m.div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hex-400/60 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </Wrapper>
  );
}

function ProjectGlyph({
  index,
  hasLink,
}: {
  index: number;
  hasLink: boolean;
}) {
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <polygon
          points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5"
          fill={hasLink ? "rgba(200,170,110,0.08)" : "rgba(200,170,110,0.04)"}
          stroke={hasLink ? "#c8aa6e" : "#604820"}
          strokeWidth="1"
          className="transition-all duration-300 group-hover:fill-[rgba(200,170,110,0.14)] group-hover:stroke-[#c8aa6e]"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center display-h text-sm text-hex-200">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
