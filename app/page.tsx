import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { Listings } from "@/components/sections/Listings";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero — single image, calm */}
        <Hero />

        {/* Featured listings — clean grid */}
        <Listings />

        {/* About — merges old About + Mission + TrustStrip facts */}
        <About />

        {/* Services — merges old Services + HomeBuying */}
        <Services />

        {/* Process — three simple steps */}
        <Process />

        {/* Final CTA */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
