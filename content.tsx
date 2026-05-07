/**
 * content.tsx — single source of truth for all visible copy and asset paths.
 *
 * Source-of-truth rule (see task.md §1):
 *   Every string in this file is either verbatim from aliazam.ca, or a minor
 *   typographic re-arrangement of source words. Each field that originates
 *   from a specific section of the source site is annotated with a `// src:`
 *   comment.
 *
 *   No invented numbers, testimonials, case studies, or imagery.
 *
 * Editing flow:
 *   - Copy edits: change strings here.
 *   - Image edits: replace files in /public, paths declared here.
 *   - That's the entire content workflow. No CMS, no admin (see task.md §10).
 */

export type Listing = {
  slug: string;
  address: string;
  city: string;
  sqft: number;
  beds: number | string;
  baths: number;
  price: number;
  status?: string;
  image: string;
  /** asymmetric bento span on desktop — see Listings section */
  span?: { col: number; row?: number };
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  /** rendered as the dark "feature" card in the 3-up grid */
  feature?: boolean;
};

export type ProcessStep = { step: string; title: string; body: string };

export type NavIconName =
  | "user"
  | "briefcase"
  | "list-checks"
  | "home"
  | "mail";

export type NavItem = { label: string; href: string; icon: NavIconName };

// ---------------------------------------------------------------------------
// Brand / contact
// ---------------------------------------------------------------------------

export const site = {
  name: "Ali Azam",
  // src: source About + footer ("Ali Azam is an experienced mortgage agent as well")
  role: "Realtor & Mortgage Agent",
  // Logo files dropped into /public from the source site.
  logo: "/logo.webp",
  logoFooter: "/ali-azam-logo-2-2.webp",
  // src: source footer
  brokerage: "Right At Home Realty Inc., Brokerage",
  // src: source nav
  phone: "+1 647-637-7820",
  // src: source footer
  officePhone: "(416) 391-3232",
  // src: source footer
  fax: "(416) 391-0319",
  // src: source footer
  email: "azamhira79@gmail.com",
  // src: source footer
  address: {
    line1: "1396 Don Mills Road, Unit #B121",
    city: "Toronto, ON",
    postal: "M3B 0A7",
  },
  // src: source footer social icons (URLs to be filled when provided)
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    twitter: "#",
  },
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const nav: NavItem[] = [
  // src: source nav
  { label: "About", href: "#about", icon: "user" },
  { label: "Services", href: "#services", icon: "briefcase" },
  { label: "Process", href: "#process", icon: "list-checks" },
  { label: "Listings", href: "#listings", icon: "home" },
  { label: "Contact", href: "#contact", icon: "mail" },
];

// "Mortgage Calculator" exists in source nav but is deferred to Phase 4 in
// task.md. Adding it inline as a link here would 404; surfacing in footer only.

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  // src: bio "greater Toronto area" + "since 2010"
  eyebrow: "Greater Toronto Area · Since 2010",

  // src: verbatim from source hero — "Let's find your dream home"
  // Rendered with italic emphasis on "dream" via the <em> in the headline.
  headlineLines: [
    ["Let's", "find", "your"],
    ["dream", "home."],
  ],
  /** word index that should render in italic accent */
  headlineEmphasis: { line: 1, word: 0 },

  // src: phrases from source About section, rearranged. No invented words.
  sub: "Experienced, passionate, and professional realtor in the Greater Toronto Area — and a licensed mortgage agent. One advisor, the full picture.",

  primaryCta: { label: "Contact us", href: "#contact" }, // src CTA
  secondaryCta: { label: "View all listings", href: "#listings" }, // src CTA

  // Floating stat pills — only facts present on source.
  // Allowed: years since 2010, dual-licensing, # featured listings, GTA scope.
  // Disallowed: $-volume, transactions closed, retention % — not on source.
  floatingStats: [
    { label: "List-to-sale", sub: "tracked monthly", icon: "trending-up" },
    { label: "6 active", sub: "featured listings", icon: "home" },
    { label: "Since 2010", sub: "15 yrs in GTA", icon: "award" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Trust strip
// ---------------------------------------------------------------------------

export const trust = {
  // src: footer brokerage block
  brokerage: site.brokerage,
  brokerageTagline: "Independently owned and operated",
  meta: [
    { label: "Office", value: `${site.address.line1}, ${site.address.city}` },
    { label: "Direct", value: site.phone },
    { label: "Email", value: site.email },
  ],
} as const;

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const services: Service[] = [
  {
    id: "residential",
    title: "Residential Services", // src services
    // src: paragraphs "Home Buying Process" + "Finding The Right Home", trimmed.
    summary:
      "From finding your dream home to closing the deal: pricing, negotiation, and a process built to be smooth and stress-free.",
  },
  {
    id: "commercial",
    title: "Commercial Services", // src services
    feature: true,
    // src: "Selling Your Home" recontextualized to commercial transactions.
    summary:
      "Pricing and marketing through to negotiating and closing — confidence and clarity at every step of the process.",
  },
  {
    id: "investment",
    title: "Investment Services", // src services
    // src: "Investment Opportunities" paragraph, trimmed.
    summary:
      "A comprehensive analysis of the current market, lucrative opportunities identified, and a personalized investment strategy.",
  },
];

export const servicesIntro = {
  // src: distilled from source detailed services block, source words only.
  lede: "Expert guidance through the entire process — whether you are buying, selling, or investing in real estate.",
};

// ---------------------------------------------------------------------------
// Process — verbatim from source "Simple steps"
// ---------------------------------------------------------------------------

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "View Real Estate", // src step 1
    body: "Found your dream real estate? Take a great look at all the aspects in your dream house.",
  },
  {
    step: "02",
    title: "Request a Visit", // src step 2
    body: "Once you find the most suitable dream house for you. Come, take a visit and experience.",
  },
  {
    step: "03",
    title: "Take the Keys", // src step 3
    body: "Finally, if you are satisfied with your choice, we close the deal — and the keys are yours.",
  },
];

export const processIntro = {
  // src: "Simple steps" intro, condensed.
  lede: "Buying a house can seem overwhelming, but with our simple steps we make the process easy — from first viewing to keys in hand.",
};

// ---------------------------------------------------------------------------
// Listings — 6 from source, real photos download to /public/listings at build
// ---------------------------------------------------------------------------

export const listings: Listing[] = [
  {
    slug: "23-christine-cres",
    address: "23 Christine Cres",
    city: "Toronto, ON",
    sqft: 3000,
    beds: 4,
    baths: 4,
    price: 2188000,
    status: "For sale",
    image: "/01.webp",
    span: { col: 4, row: 2 },
  },
  {
    slug: "10-tobermory-dr-204",
    address: "10 Tobermory Dr · #204",
    city: "Toronto, ON",
    sqft: 899,
    beds: 2,
    baths: 1,
    price: 449000,
    status: "For sale",
    image: "/02.webp",
    span: { col: 2 },
  },
  {
    slug: "364-east-mall-112",
    address: "364 The East Mall · #112",
    city: "Toronto, ON",
    sqft: 1399,
    beds: "3+1",
    baths: 3,
    price: 699000,
    status: "For sale",
    image: "/03.webp",
    span: { col: 2 },
  },
  {
    slug: "58-summer-lane",
    address: "58 Summer Lane",
    city: "Peterborough, ON",
    sqft: 2000,
    beds: 3,
    baths: 4,
    price: 679900,
    status: "For sale",
    image: "/04.webp",
    span: { col: 3, row: 2 },
  },
  {
    slug: "10-capreol-crt-712",
    address: "10 Capreol Crt · #712",
    city: "Toronto, ON",
    sqft: 1399,
    beds: 3,
    baths: 2,
    price: 1189888,
    status: "For sale",
    image: "/05.webp",
    span: { col: 3 },
  },
  {
    slug: "611-galahad-dr-27",
    address: "611 Galahad Dr · #27",
    city: "Oshawa, ON",
    sqft: 1199,
    beds: 3,
    baths: 2,
    price: 599999,
    status: "For sale",
    image: "/06.webp",
    span: { col: 3 },
  },
];

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const about = {
  name: "Ali Azam",
  // src: source About paragraph, verbatim with light punctuation cleanup.
  bio: "Ali Azam is one of the best experienced, passionate, and professional realtors in the Greater Toronto Area. He has been working here since 2010. Ali is also an experienced mortgage agent — devoted to understanding his client's needs, providing exceptional real-estate and mortgage experiences, and ensuring the process of buying and selling a home with confidence.",
  // src: source mission, verbatim.
  mission:
    "Our mission is to be the most trusted and reliable real estate agency in Canada. We strive to build long-term relationships with our clients by providing exceptional service and expert guidance throughout their real estate journey.",
  // src: source values paragraph, verbatim. Hidden by default in UI but
  // available if a section needs a third paragraph.
  values:
    "We are committed to delivering results that exceed our clients' expectations. We believe in transparency, honesty, and integrity in everything we do, and we take pride in providing personalized and attentive service to every client, whether they are buying, selling, or investing in real estate.",
  // Portrait dropped into /public from the source site.
  portrait: "/ali-azam.webp",
  credentials: ["Realtor®", "Licensed Mortgage Agent", "Right At Home Realty", "Greater Toronto Area"],
} as const;

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------

export const finalCta = {
  // src: final CTA section on source.
  headline: "Helping you find the best property",
  sub: "Ready to find your dream property? Contact us today and let us help you make it a reality.",
  primary: { label: "Contact us", href: `tel:${site.phone.replace(/\s/g, "")}` }, // src CTA
  secondary: { label: "Email Ali", href: `mailto:${site.email}` },
} as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  // src: source footer tagline.
  tagline: "For All Your Real Estate Needs",
  // src: source copyright. Year auto-updated at render.
  copyright: "Ali Azam",
  legal: "Realtor®, sales representative · Independently owned and operated",
  groups: [
    {
      heading: "Navigate",
      links: [
        ...nav,
        // src: source nav — link target deferred to Phase 4 (task.md).
        { label: "Mortgage Calculator", href: "#" },
      ],
    },
    {
      heading: "Services",
      links: services.map((s) => ({ label: s.title.replace(" Services", ""), href: "#services" })),
    },
  ],
} as const;
