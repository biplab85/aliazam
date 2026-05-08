import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { servicesPage } from "@/content";
import {
  ServicesPageHero,
  ServicesIntro,
  FeaturedServices,
  PropertyTypes,
  ServiceAlerts,
  BuyingSelling,
  ServicesCtaBanner,
} from "@/components/services-page/ServicesSections";

/**
 * /services — premium recreation of aliazam.ca/services/.
 *
 * All page copy lives in `content.tsx#servicesPage`. The route shell only
 * composes section components and exports metadata. The three Featured
 * service sections expose the source's anchor ids
 * (#residential-services, #commercial-services, #investments-services) so
 * the header sub-menu's in-page links resolve cleanly.
 */

export const metadata: Metadata = {
  title: servicesPage.metadata.title,
  description: servicesPage.metadata.description,
};

export default function ServicesPage() {
  return (
    <>
      <Nav />

      <main>
        <ServicesPageHero />
        <ServicesIntro />
        <FeaturedServices />
        <PropertyTypes />
        <ServiceAlerts />
        <BuyingSelling />
        <ServicesCtaBanner />
      </main>

      <Footer />
    </>
  );
}
