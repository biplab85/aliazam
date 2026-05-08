import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { aboutPage } from "@/content";
import {
  AboutPageHero,
  AboutMeManifesto,
  AboutStats,
  WeDoBetter,
  Certifications,
  AboutContactBlock,
} from "@/components/about-page/AboutSections";

/**
 * /about — premium recreation of aliazam.ca/about/.
 *
 * All page copy lives in `content.tsx#aboutPage`. This file is the route
 * shell only — it composes the section components and exports metadata.
 */

export const metadata: Metadata = {
  title: aboutPage.metadata.title,
  description: aboutPage.metadata.description,
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main>
        <AboutPageHero />
        <AboutMeManifesto />
        <AboutStats />
        <WeDoBetter />
        <Certifications />
        <AboutContactBlock />
      </main>

      <Footer />
    </>
  );
}
