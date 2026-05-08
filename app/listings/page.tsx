import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { listingsPage } from "@/content";
import {
  ListingsPageHero,
  AllListings,
  ListingsCtaBanner,
} from "@/components/listings-page/ListingsSections";

/**
 * /listings — premium recreation of aliazam.ca/listings/.
 *
 * All page copy lives in `content.tsx#listingsPage`. The route shell only
 * composes section components and exports metadata.
 */

export const metadata: Metadata = {
  title: listingsPage.metadata.title,
  description: listingsPage.metadata.description,
};

export default function ListingsPage() {
  return (
    <>
      <Nav />

      <main>
        <ListingsPageHero />
        <AllListings />
        <ListingsCtaBanner />
      </main>

      <Footer />
    </>
  );
}
