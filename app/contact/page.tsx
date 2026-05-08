import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { contactPage } from "@/content";
import {
  ContactPageHero,
  GetInTouch,
  ContactClosing,
} from "@/components/contact-page/ContactSections";

/**
 * /contact — premium recreation of aliazam.ca/contact/.
 *
 * All page copy lives in `content.tsx#contactPage`. The route shell only
 * composes section components and exports metadata.
 */

export const metadata: Metadata = {
  title: contactPage.metadata.title,
  description: contactPage.metadata.description,
};

export default function ContactPage() {
  return (
    <>
      <Nav />

      <main>
        <ContactPageHero />
        <GetInTouch />
        <ContactClosing />
      </main>

      <Footer />
    </>
  );
}
