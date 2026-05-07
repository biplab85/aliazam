import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Listings } from "@/components/sections/Listings";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <>
      {/*** Nav ***/}
      <Nav />

      <main>
        {/*** Hero ***/}
        <Hero />

        {/*** Trust Strip ***/}
        <TrustStrip />

        {/*** Services ***/}
        <Services />

        {/*** Process ***/}
        <Process />

        {/*** Listings ***/}
        <Listings />

        {/*** About ***/}
        <About />

        {/*** Final CTA ***/}
        <FinalCta />
      </main>

      {/*** Footer ***/}
      <Footer />
    </>
  );
}
