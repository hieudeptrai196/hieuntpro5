import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldDivider } from "@/components/ui/HexFrame";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { strengths, siteConfig, education } from "@/lib/data";

export function About() {
  return (
    <section
      id="lore"
      className="relative section-edge py-28 sm:py-36 px-5 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel
          eyebrow="Lore // Chapter 01"
          title="The Story Behind the Code"
          description="Origins, traits, and the philosophy that shapes every system I forge."
        />

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left — biography */}
          <Reveal className="lg:col-span-5 space-y-6">
            <div className="relative pl-6 border-l border-hex-600/60">
              <span className="absolute -left-1 top-0 w-2 h-2 rotate-45 bg-hex-400" />
              <p className="text-hex-100/85 leading-relaxed text-[15px]">
                {siteConfig.summary}
              </p>
            </div>

            <GoldDivider />

            {/* Academy */}
            <div className="space-y-3">
              <div className="label-eyebrow">Academy</div>
              <div className="bg-void-900/60 border border-hex-600/30 p-5 clip-bevel-sm">
                <div className="display-h text-lg text-hex-100">
                  {education.school}
                </div>
                <div className="text-xs text-hex-200/70 mt-1.5">
                  {education.status} · {education.major}
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-mono text-hex-300">
                  <span className="w-1.5 h-1.5 rotate-45 bg-hex-400" />
                  {education.period}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — traits */}
          <StaggerGroup className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {strengths.map((s, i) => (
              <StaggerItem key={s.title}>
                <article className="group relative h-full bg-gradient-to-b from-void-900/80 to-void-950/80 p-6 border border-hex-600/40 hover:border-hex-400/70 transition-colors clip-bevel-sm corner-bracket">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-hex-300/70">
                      TRAIT_0{i + 1}
                    </span>
                    <TraitGlyph index={i} />
                  </div>
                  <h3 className="display-h text-lg text-hex-100 mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-hex-100/65 leading-relaxed">
                    {s.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

function TraitGlyph({ index }: { index: number }) {
  const glyphs = ["◇", "◈", "◆", "❖"];
  return (
    <span className="text-hex-400/80 text-lg group-hover:text-hex-300 transition-colors">
      {glyphs[index % glyphs.length]}
    </span>
  );
}
