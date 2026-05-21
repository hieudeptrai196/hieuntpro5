"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Career — minimalist timeline.
 * Shows only company name, role and duration for each campaign.
 */
export function Career() {
  return (
    <section
      id="career"
      className="relative section-edge py-28 sm:py-36 px-5 sm:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <SectionLabel
          eyebrow="Career // Chapter 03"
          title="Battle Record"
          description="A timeline of the campaigns I've fought in."
        />

        <ol className="relative">
          {/* Vertical thread */}
          <span
            aria-hidden
            className="absolute left-3 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-hex-400/60 via-hex-600/60 to-transparent"
          />

          {experiences.map((exp, i) => (
            <TimelineEntry
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineEntry({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[number];
  index: number;
  isLast: boolean;
}) {
  const tag = "tag" in exp ? exp.tag : null;

  return (
    <m.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className={cn("relative pl-12 sm:pl-16", !isLast && "pb-7")}
    >
      {/* Diamond node */}
      <span
        aria-hidden
        className="absolute left-3 sm:left-4 top-3 -translate-x-1/2 w-3 h-3 rotate-45 bg-hex-400 shadow-[0_0_18px_-2px_rgba(200,170,110,0.7)]"
      />
      <span
        aria-hidden
        className="absolute left-3 sm:left-4 top-3 -translate-x-1/2 w-3 h-3 rotate-45 border border-hex-300/60"
      />

      <article className="relative bg-gradient-to-r from-void-900/80 via-void-900/50 to-transparent border border-hex-600/30 hover:border-hex-400/60 transition-colors clip-bevel-sm p-5 sm:p-6">
        {/* Screen Reader Only / SEO optimization for responsibilities & projects */}
        <div className="sr-only" aria-hidden="false">
          <h4>Kinh nghiệm làm việc chi tiết tại {exp.company} - Lập trình viên Backend</h4>
          <p>
            Vị trí: {exp.position} - Nguyễn Thọ Hiếu (hieuntpro5) hoạt động trong thời gian {exp.period}.
          </p>
          {exp.responsibilities && exp.responsibilities.length > 0 && (
            <div>
              <h5>Nhiệm vụ và thành tựu chính:</h5>
              <ul>
                {exp.responsibilities.map((r, ri) => (
                  <li key={ri}>
                    <strong>{r.title}:</strong> {r.body}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {exp.projects && exp.projects.length > 0 && (
            <div>
              <h5>Các dự án tiêu biểu đã triển khai:</h5>
              <ul>
                {exp.projects.map((p, pi) => (
                  <li key={pi}>
                    <strong>{p.name}:</strong> {p.body}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0 flex items-start gap-4">
            {/* Company logo */}
            {"logo" in exp && exp.logo && (
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-sm overflow-hidden bg-void-800 border border-hex-600/25 p-1">
                <Image
                  src={exp.logo as string}
                  alt={`${exp.company} logo`}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] tracking-[0.35em] uppercase text-hex-300/70 font-mono">
                  Campaign · 0{experiences.length - index}
                </span>
                {tag && (
                  <span className="px-2 py-0.5 text-[9px] tracking-[0.25em] uppercase font-bold text-cyan-glow border border-cyan-glow/40 bg-cyan-glow/10 clip-bevel-sm">
                    {tag}
                  </span>
                )}
              </div>
              <h3 className="display-h text-xl sm:text-2xl text-hex-shine leading-tight">
                <a href={`${exp.link}`} target="_blank">{exp.company}</a>
              </h3>
              <div className="mt-1 text-sm text-hex-200/80">
                {exp.position}
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col sm:items-end items-center gap-2 sm:gap-1 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-hex-300">
              <span className="w-1.5 h-1.5 rotate-45 bg-hex-400" />
              <span className="tabular-nums">{exp.period}</span>
            </div>
          </div>
        </div>
      </article>
    </m.li>
  );
}
