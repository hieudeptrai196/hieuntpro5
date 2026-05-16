import { SectionLabel } from "@/components/ui/SectionLabel";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { experiences } from "@/lib/data";

// Flatten projects across all experiences, preserving order and the
// company they belong to. Source-of-truth stays in `data.ts`.
const allProjects = experiences.flatMap((e) =>
  e.projects.map((p) => ({
    ...p,
    company: e.company,
  })),
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
  project: { name: string; body: string; company: string; award?: string };
  index: number;
}) {
  return (
    <article className="group relative h-full bg-gradient-to-br from-void-900 via-void-800 to-void-950 border border-hex-600/40 hover:border-hex-400/70 transition-all duration-500 clip-bevel overflow-hidden">
      {/* Hover sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-hex-400/0 via-hex-400/0 to-hex-400/0 group-hover:from-hex-400/[0.04] group-hover:to-hex-400/[0.02] transition-all duration-500" />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-3">
          <ProjectGlyph index={index} />
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
      <div className="relative px-6 pb-6 pt-5">
        <h3 className="display-h text-xl text-hex-100 leading-tight mb-3 group-hover:text-hex-shine transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-hex-100/65 leading-relaxed">{project.body}</p>
      </div>

      {/* Bottom rule */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-hex-600/60 to-transparent" />

      {/* Footer meta */}
      <div className="relative flex items-center justify-between px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-hex-300/60 font-mono">
        <span>System // Live</span>
        <span className="flex items-center gap-1.5 text-hex-300">
          Inspect <span>→</span>
        </span>
      </div>
    </article>
  );
}

function ProjectGlyph({ index }: { index: number }) {
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <polygon
          points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5"
          fill="rgba(200,170,110,0.06)"
          stroke="#c8aa6e"
          strokeWidth="1"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center display-h text-sm text-hex-200">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
