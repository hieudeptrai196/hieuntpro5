import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HexBackdrop } from "@/components/effects/HexBackdrop";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { HextechLoader } from "@/components/effects/HextechLoader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Abilities } from "@/components/sections/Abilities";
import { Career } from "@/components/sections/Career";
import { Projects } from "@/components/sections/Projects";
// import { Vault } from "@/components/sections/Vault";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <HextechLoader />
      <SmoothScroll />
      <HexBackdrop />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Abilities />
        <Career />
        <Projects />
        {/* <Vault /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
