import { Navbar }        from "@/components/layout/Navbar";
import { Footer }        from "@/components/layout/Footer";
import { HexBackdrop }   from "@/components/effects/HexBackdrop";
import { SmoothScroll }  from "@/components/effects/SmoothScroll";
import { HextechLoader } from "@/components/effects/HextechLoader";
import { HexCursor }     from "@/components/effects/HexCursor";
import { EasterEgg }     from "@/components/effects/EasterEgg";
import { Hero }          from "@/components/sections/Hero";
import { About }         from "@/components/sections/About";
import { Abilities }     from "@/components/sections/Abilities";
import { Career }        from "@/components/sections/Career";
import { Projects }      from "@/components/sections/Projects";
import { Contact }       from "@/components/sections/Contact";
import { DocPing }       from "@/components/ui/DocPing";
import { PerfBadge }     from "@/components/ui/PerfBadge";
import { ScrollTop }     from "@/components/ui/ScrollTop";
import { SectionDots }   from "@/components/ui/SectionDots";
import { SiteNotice }    from "@/components/ui/SiteNotice";

export default function HomePage() {
  return (
    <>
      {/* ── Effects & loaders ── */}
      <HextechLoader />
      <HexCursor />
      <EasterEgg />
      <SmoothScroll />
      <HexBackdrop />

      {/* ── Layout ── */}
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Abilities />
        <Career />
        <Projects />
        <Contact />
      </main>
      <Footer />

      {/* ── Floating UI ── */}
      <SectionDots />
      <ScrollTop />
      <DocPing />
      <PerfBadge />
      <SiteNotice />
    </>
  );
}
