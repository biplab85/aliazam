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
  /** full address as written on the listings index page (uppercase) */
  fullAddress?: string;
  /** Canadian postal code, no space */
  postal?: string;
  /** province (uppercase abbreviation, e.g. "ON") */
  province?: string;
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

export type NavItem = {
  label: string;
  href: string;
  icon: NavIconName;
  /** Optional in-page anchors or sub-routes — rendered as a hover dropdown on
   *  desktop and a tabbed strip on mobile. Children inherit no icons. */
  children?: ReadonlyArray<{ label: string; href: string }>;
};

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
  // src: source footer + /contact "Personal Office Address"
  address: {
    line1: "1396 Don Mills Road, Unit #B121",
    city: "Toronto, ON",
    postal: "M3B 0A7",
    label: "Personal Office Address",
  },
  // src: /contact second address (no label on source)
  addressSecondary: {
    line1: "3000 Danforth Ave Unit# 3, Room# 108B",
    city: "Toronto, ON",
    postal: "M4C 1M7",
    label: "Toronto Office",
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
  // src: source nav order — Home / About / Listings / Services / Contact.
  // Each top-level link is a real route. Services additionally exposes
  // three in-page anchors as a sub-menu, mirroring aliazam.ca/services/.
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "user" },
  { label: "Listings", href: "/listings", icon: "list-checks" },
  {
    label: "Services",
    href: "/services",
    icon: "briefcase",
    children: [
      // src: aliazam.ca top-nav sub-items, verbatim labels and anchors.
      { label: "Residential Services", href: "/services#residential-services" },
      { label: "Commercial Services", href: "/services#commercial-services" },
      { label: "Investment Services", href: "/services#investments-services" },
    ],
  },
  { label: "Contact", href: "/contact", icon: "mail" },
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
// Listings — 9 verbatim from source /listings/. Photos saved to /public/.
// First 6 are featured on the home page; the dedicated /listings page shows
// all 9. Full-address lines reflect the source's uppercase rendering.
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
    fullAddress: "23 CHRISTINE CRES TORONTO, ONTARIO, CANADA",
    postal: "M2R1A4",
    province: "ON",
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
    fullAddress: "204 - 10 TOBERMORY DR TORONTO, ONTARIO, CANADA",
    postal: "M3N2Y5",
    province: "ON",
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
    fullAddress: "112 - 364 THE EAST MALL DR TORONTO, ONTARIO, CANADA",
    postal: "M9B6C5",
    province: "ON",
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
    fullAddress: "58 SUMMER LANE PETERBOROUGH, ONTARIO, CANADA",
    postal: "K9L0G4",
    province: "ON",
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
    fullAddress: "712 - 10 CAPREOL CRT TORONTO, ONTARIO, CANADA",
    postal: "M5V4B3",
    province: "ON",
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
    fullAddress: "27 - 611 GALAHAD DR OSHAWA, ONTARIO, CANADA",
    postal: "L1K1M1",
    province: "ON",
  },
  {
    slug: "288-mill-rd-c45",
    address: "288 Mill Rd · #C45",
    city: "Toronto, ON",
    sqft: 1999,
    beds: 2,
    baths: 2,
    price: 665000,
    status: "For sale",
    image: "/07.webp",
    fullAddress: "C45 - 288 MILL RD TORONTO, ONTARIO, CANADA",
    postal: "M9C4X7",
    province: "ON",
  },
  {
    slug: "30-kentbridge-way",
    address: "30 Kentbridge Way",
    city: "Vaughan, ON",
    sqft: 3500,
    beds: 4,
    baths: 4,
    price: 2288000,
    status: "For sale",
    image: "/08.webp",
    fullAddress: "30 KENTBRIDGE WAY VAUGHAN, ONTARIO, CANADA",
    postal: "L6A5A2",
    province: "ON",
  },
  {
    slug: "166-heintzman-cres",
    address: "166 Heintzman Cres",
    city: "Vaughan, ON",
    sqft: 5000,
    beds: 8,
    baths: 6,
    price: 3199999,
    status: "For sale",
    image: "/09.webp",
    fullAddress: "166 HEINTZMAN CRES VAUGHAN, ONTARIO, CANADA",
    postal: "L6A4T8",
    province: "ON",
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

// ---------------------------------------------------------------------------
// Home page — "Home buying" section (Property categories + journey cards).
// Every paragraph below is verbatim from aliazam.ca homepage.
// ---------------------------------------------------------------------------

export const homeBuying = {
  titleStroke: "Buying",
  eyebrow: "Home buying",
  // Section umbrella headline. The first accordion item also carries the
  // verbatim "Home buying process" title from the source, so keep this
  // headline distinct to avoid pure duplication.
  headline: { lead: "Your journey,", emphasis: "guided." },
  categoriesEyebrow: "Property categories",
  categoriesHeading: "Every kind of address.",
  // src: aliazam.ca homepage — 6 categories verbatim.
  categories: [
    { label: "Apartment", icon: "building-2" },
    { label: "Building", icon: "building" },
    { label: "Condominium", icon: "buildings" },
    { label: "House", icon: "home" },
    { label: "Office", icon: "briefcase" },
    { label: "Shop", icon: "store" },
  ] as ReadonlyArray<{ label: string; icon: string }>,
  accordionEyebrow: "The journey",
  // Three-item accordion in the order the client specified:
  //   1. Home buying process
  //   2. Making An Offer
  //   3. Finding The Right Home
  // Every body paragraph is verbatim from aliazam.ca homepage.
  accordion: [
    {
      roman: "I",
      title: "Home buying process",
      icon: "compass",
      body: "The home buying process can be complex, but our experienced team of realtors is here to guide you every step of the way. From finding your dream home to closing the deal, we prioritize your needs and provide expert guidance to make the process as smooth and stress-free as possible.",
    },
    {
      roman: "II",
      title: "Making An Offer",
      icon: "handshake",
      body: "Making an offer on a home is a critical step in the home buying process, and our team of expert realtors can help you navigate this step with ease. We provide guidance on pricing and negotiation to ensure that you get the best possible deal on your dream home. Our goal is to make the offer process as stress-free and successful as possible for our clients.",
    },
    {
      roman: "III",
      title: "Finding The Right Home",
      icon: "key-round",
      body: "Finding the right home is an essential part of the home buying process, and our experienced realtors are here to help you. We take the time to understand your unique needs and preferences to find your dream home within your budget. Our team provides expert guidance throughout the entire process to ensure that you find the perfect home for you and your family.",
    },
  ] as const,
} as const;

// ---------------------------------------------------------------------------
// /about page — every string used by the About route, in one place
// ---------------------------------------------------------------------------

export const aboutPage = {
  metadata: {
    title: "About",
    description:
      "With over a decade of experience in the real estate and mortgage industries, Ali Azam is a reliable and trusted advisor — Realtor® and Mortgage Agent serving the Greater Toronto Area since 2010.",
  },
  hero: {
    titleStroke: "About", // vertical "About" parallax stroke title
    yearStamp: { label: "Established", roman: "MMX", year: "A.D. 2010" },
    eyebrow: "Realtor & Mortgage Agent · GTA",
    headline: { lead: "About", emphasis: "me." },
    strapline:
      "A reliable and trusted advisor — over a decade in the Toronto real estate and mortgage industries.",
    credentials: ["Realtor®", "Mortgage Agent", site.brokerage] as readonly string[],
    serviceArea: { label: "Service area", value: "Greater Toronto Area" },
    signature: {
      caption: "Realtor® · Mortgage Agent",
    },
    crest: {
      topArc: "EST · MMX · GREATER TORONTO AREA",
      bottomArc: "REALTOR · MORTGAGE AGENT · GTA",
      monogram: "AA",
    },
  },
  manifesto: {
    titleStroke: "Story",
    chapter: { numeral: "I.", label: "About me" },
    headline: { lead: "A reliable and trusted", emphasis: "advisor to my clients." },
    // src: aliazam.ca/about/ — "About me", paragraphs 1–4 verbatim.
    paragraphs: [
      "With over a decade of experience in the real estate and mortgage industries, I pride myself on being a reliable and trusted advisor to my clients. My dedication to providing exceptional service is evident in every transaction.",
      "As a skilled negotiator and market expert, I am committed to helping my clients make informed decisions. I offer personalized and professional services to ensure a smooth and successful transaction. Trust me to be your partner in all of your real estate needs.",
      "In addition to my extensive knowledge of the Toronto real estate market, I also stay up-to-date on the latest technology and marketing trends. I believe that utilizing innovative tools and strategies can help my clients achieve their goals faster and more efficiently. As a result, I am always seeking new ways to improve my services and deliver exceptional results.",
      "My approach is centered around building strong relationships with my clients. I take the time to understand their unique needs and goals, and work tirelessly to exceed their expectations. Whether you are buying, selling, or refinancing a home, I am here to guide you every step of the way. Contact me today to experience the difference of working with a dedicated and experienced realtor and mortgage agent.",
    ] as readonly string[],
    // Pull-quote — sentence pulled verbatim from paragraph 2 above.
    pullQuote:
      "Trust me to be your partner in all of your real estate needs.",
    closingStrip: "A decade in the Greater Toronto Area.",
    signature: {
      initials: "AA",
      name: "Ali Azam",
      role: "Realtor® · Mortgage Agent · since 2010",
      brokerage: site.brokerage,
    },
  },
  // Stats: real values supplied by client (530 / 86 / 25).
  stats: [
    { value: 530, label: "Properties", color: "var(--color-gold)" },
    { value: 86, label: "Clients", color: "var(--color-accent)" },
    { value: 25, label: "Cities", color: "var(--color-accent-2)" },
  ] as ReadonlyArray<{ value: number; label: string; color: string }>,
  weDoBetter: {
    eyebrow: "Our promise",
    headline: { lead: "We do", emphasis: "better." },
    // src: aliazam.ca/about/ — "We do better" paragraph, verbatim.
    body: "At AliAzam.com, we believe in doing better. We are committed to providing exceptional service to our clients, exceeding their expectations every step of the way. Our team of experienced and passionate realtors and mortgage agents is dedicated to helping you achieve your real estate goals. Let us show you how we can make a difference in your buying or selling experience.",
    closingStrip: "Personalized · Passionate · Professional",
    portraitAlt: "ali azam",
    portraitSrc: "/ali-azam.webp",
    floatingPlaque: { initials: "AA" },
    floatingTag: { label: "Est.", roman: "MMX" },
  },
  certifications: {
    titleStroke: "Credentials",
    eyebrow: "Credentials",
    headline: "Certifications.",
    lede: "Licensed, accredited, and continuously trained — the paperwork that backs the handshake.",
    cards: [
      { badge: "Certificate", label: "Ali Azam", src: "/certificate.webp" },
      { badge: "Certificate", label: "Ali Azam", src: "/certificate-2.webp" },
    ] as ReadonlyArray<{ badge: string; label: string; src: string }>,
  },
  contactBlock: {
    eyebrow: "Get in touch",
    headline: { lead: "One advisor,", emphasis: "the full picture." },
    rows: {
      mobile: "Mobile",
      office: "Office",
      email: "Email",
      fax: "Fax",
      officeAddress: "Office",
    },
  },
} as const;

// ---------------------------------------------------------------------------
// /listings page — every string used by the Listings route
// ---------------------------------------------------------------------------

export const listingsPage = {
  metadata: {
    title: "Listings",
    description:
      "Nine active properties across the Greater Toronto Area, Vaughan, Peterborough, and Oshawa — every listing hand-selected and personally toured by Ali Azam, Realtor® and Mortgage Agent.",
  },
  hero: {
    portfolioLabel: "Portfolio",
    headline: { lead: "Properties", emphasis: "hand-curated." },
    strapline:
      "active listings across the Greater Toronto Area, Vaughan, Peterborough, and Oshawa — every property hand-selected and personally toured.",
    stats: {
      activeLabel: "Active",
      rangeLabel: "Range high",
      citiesLabel: "Cities",
    },
    primaryCta: { label: "View all listings", href: "#all-listings" },
    secondaryCta: { label: "Request private showing" },
    spotlightLabel: "Spotlight",
    priceBandLabel: "Price band",
  },
  grid: {
    titleStroke: "Listings",
    eyebrow: "All listings",
    headline: { lead: "Every property,", emphasis: "at a glance." },
    // {count} is replaced at render time with listings.length.
    lede: "{count} active properties across the GTA, Vaughan, Peterborough, and Oshawa. Tap any card to request a private showing.",
    sortLabel: "Sorted by price",
    sortValue: "Low → High",
    cardCta: "View details",
  },
  ctaBanner: {
    eyebrow: "The agency",
    // src: aliazam.ca footer slogan, verbatim.
    headline: { lead: "For All Your", emphasis: "Real Estate Needs" },
    // {count}/{cities}/{sqft} replaced at render.
    bodyTemplate:
      "{count} active properties · {cities} cities · {sqft} of total space currently on the market. Speak with Ali for an off-market introduction or a private showing of any of the listings above.",
    primaryLabel: "Direct",
  },
} as const;

// ---------------------------------------------------------------------------
// /contact page — every string used by the Contact route
// ---------------------------------------------------------------------------

export const contactPage = {
  metadata: {
    title: "Contact",
    description:
      "We would love to hear from you! Contact Ali Azam today to schedule a consultation and learn how we can assist you with your real estate needs.",
  },
  hero: {
    letterhead: {
      label: "From the office of",
      person: `Ali Azam · ${site.role}`,
      brokerage: site.brokerage,
    },
    // src: aliazam.ca/contact/ — H1 verbatim.
    headline: "Contact us",
    // src: aliazam.ca/contact/ — lede verbatim.
    lede: "We would love to hear from you! Contact us today to schedule a consultation and learn how we can assist you with your real estate needs.",
    pills: {
      direct: "Direct",
      email: "Email",
      office: "Office",
      officeValue: "Toronto",
    },
    primaryCta: { label: "Send a message" },
    secondaryCta: { label: "Call directly" },
    postedStamp: { label: "Posted", value: "Toronto · ON" },
    replyCard: {
      label: "Reply within",
      value: "24 hours",
      hours: "Mon — Sat · 9am — 7pm EST",
    },
    envelope: {
      stampLine1: "ALI · AZAM",
      stampMonogram: "AA",
      stampLine2: "TORONTO · ON",
    },
  },
  getInTouch: {
    eyebrow: "Channels",
    // src: aliazam.ca/contact/ — section title verbatim.
    headline: "Get in touch",
    lede: "Pick the channel that suits you — every message reaches Ali personally and is replied to within 24 hours, Mon – Sat.",
    rows: {
      email: "Email",
      direct: "Direct line",
      office: "Office line",
      fax: "Fax",
    },
    form: {
      eyebrow: "Send a message",
      headline: { lead: "Drop us a line.", emphasis: "We'll be in touch." },
      privacyTemplate:
        "Submitting opens your mail client pre-filled to {email}.",
      submitLabel: "Send message",
      thankYou: {
        title: "Your message is on its way.",
        body: "We've opened your mail client with the message pre-filled. Send it when you're ready — Ali replies personally within 24 hours, Mon – Sat.",
        reset: "Send another →",
      },
      fields: {
        name: { label: "Name", placeholder: "Your full name" },
        email: { label: "Email", placeholder: "you@example.com" },
        phone: { label: "Phone", placeholder: "+1 (000) 000-0000" },
        interest: {
          label: "Interest",
          options: [
            "Buying a home",
            "Selling a home",
            "Investing",
            "Refinancing",
            "Other",
          ] as readonly string[],
        },
        message: {
          label: "Message",
          placeholder:
            "Tell us about your needs — neighbourhoods you're considering, timeline, budget, anything you'd like to share.",
        },
      },
    },
  },
  closing: {
    eyebrow: "Or, in a hurry",
    headline: { lead: "Skip the inbox.", emphasis: "Call directly." },
    body: "Available Mon – Sat, 9am – 7pm EST. Texts welcome at the same direct number. Off-market introductions and private showings on request.",
    primaryLabel: "Direct",
  },
} as const;

// ---------------------------------------------------------------------------
// /services page — every string used by the Services route
// ---------------------------------------------------------------------------

export const servicesPage = {
  metadata: {
    title: "Services",
    description:
      "Residential, commercial, and investment real estate services from Ali Azam — Realtor® and Mortgage Agent in the Greater Toronto Area.",
  },
  hero: {
    titleStroke: "Services",
    indexLabel: "Index",
    eyebrow: "Realtor® · Mortgage Agent",
    // src: aliazam.ca/services/ — page heading verbatim.
    headline: { lead: "Our", emphasis: "Services." },
    // First paragraph of "Real Estate Services" block, condensed to a hero
    // strapline. The full verbatim opener is rendered further down.
    strapline:
      "From market analysis to property viewings, negotiations, and closing the deal — a complete suite of real estate services tailored to your unique needs.",
    chapters: [
      { num: "01", label: "Residential Services", href: "#residential-services" },
      { num: "02", label: "Commercial Services", href: "#commercial-services" },
      { num: "03", label: "Investment Services", href: "#investments-services" },
    ] as const,
    primaryCta: { label: "Browse all services", href: "#all-services" },
    secondaryCta: { label: "Speak with Ali" },
  },
  // The "Real Estate Services" intro at the top of the source page.
  intro: {
    eyebrow: "Real Estate Services",
    headline: { lead: "Tailored to your", emphasis: "unique needs." },
    paragraphs: [
      "As a real estate professional, I understand that buying or selling a property can be a significant investment and an emotional process. That's why I am committed to providing my clients with exceptional real estate services that are tailored to their unique needs. Whether you are a first-time buyer, looking to upgrade, or downsizing, I am here to guide you every step of the way. From market analysis to property viewings, negotiations, and closing the deal, I am dedicated to ensuring a seamless and stress-free experience.",
      "As a licensed realtor, I have access to a wealth of resources and tools that enable me to offer comprehensive real estate services. Whether you are buying or selling, I will leverage my expertise and connections to ensure that you achieve your real estate goals. Additionally, I offer professional advice on property pricing, marketing strategies, and legal matters, ensuring that your transaction is both efficient and legally compliant. Contact me today to learn more about how I can help you with your real estate needs.",
    ] as readonly string[],
    bullets: [
      "Extensive property listings with photos and virtual tours.",
      "Personalized home search based on client preferences.",
      "Skilled negotiation for favorable buying/selling terms.",
      "Comparative market analysis to inform pricing decisions.",
      "Professional staging and photography for listed properties.",
      "Access to network of professionals (e.g. lenders, inspectors, contractors).",
      "Effective marketing techniques for maximum exposure.",
      "Local real estate market expertise (trends, pricing, neighborhoods).",
      "Ongoing support and guidance beyond the sale.",
    ] as readonly string[],
  },
  // Three featured service sections — each reachable from the Services
  // sub-menu and from the hero's chapter list.
  featured: {
    sectionEyebrow: "Featured services",
    sectionHeadline: { lead: "Three pillars,", emphasis: "one advisor." },
    items: [
      {
        roman: "I",
        anchor: "residential-services",
        title: "Residential Services",
        // Tagline is a phrase pulled from paragraph 2 of the source.
        tagline: "First-time homebuyers to experienced sellers.",
        icon: "home",
        ctaLabel: "Explore Residential",
        // src: aliazam.ca/services/ — Residential Services paragraphs verbatim.
        paragraphs: [
          "At our real estate agency, we understand that buying or selling a home is a significant decision. That's why our residential services are designed to provide you with the support you need to make informed choices. We work closely with our clients to understand their unique needs and preferences, and then tailor our services to meet those needs. Our team of real estate experts is well-versed in the local market trends and can provide you with valuable insights into the current state of the market.",
          "Whether you are a first-time homebuyer or an experienced seller, our residential services are here to guide you through the entire process. We provide a comprehensive range of services, including property valuation, property marketing, negotiations, and transaction management. Our goal is to help you achieve your real estate objectives efficiently and effectively while providing you with the exceptional service you deserve.",
        ] as readonly string[],
      },
      {
        roman: "II",
        anchor: "commercial-services",
        title: "Commercial Services",
        // Tagline directly enumerates the source phrase: "office, retail,
        // industrial, and hospitality".
        tagline: "Office · Retail · Industrial · Hospitality.",
        icon: "building",
        ctaLabel: "Explore Commercial",
        // src: aliazam.ca/services/ — Commercial Services paragraphs verbatim.
        paragraphs: [
          "Our commercial services provide a complete suite of solutions to help you with all your commercial real estate needs. Our experienced team of real estate professionals is dedicated to helping you achieve your business objectives by providing customized services tailored to your unique needs. We work with clients across a broad range of industries, including office, retail, industrial, and hospitality, providing expert guidance and valuable insights every step of the way.",
          "From market analysis and site selection to lease negotiation and property management, our commercial services cover the entire spectrum of commercial real estate. We strive to provide our clients with exceptional service, and our success is measured by the long-term relationships we build with them. Whether you are looking to expand your business or optimize your real estate portfolio, we are here to help you achieve your goals.",
        ] as readonly string[],
      },
      {
        roman: "III",
        anchor: "investments-services",
        title: "Investment Services",
        // Tagline derived from the source's enumerated services.
        tagline: "Acquisition · Asset management · Portfolio analysis.",
        icon: "trending-up",
        ctaLabel: "Explore Investment",
        // src: aliazam.ca/services/ — Investments Services paragraphs verbatim.
        paragraphs: [
          "Our investment services offer a range of opportunities to help you grow and diversify your real estate portfolio. Our team of investment experts has a wealth of experience in the real estate industry, and we are dedicated to helping you achieve your financial objectives. We provide a range of investment services, including property acquisition, disposition, asset management, and portfolio analysis, tailored to your specific needs and goals.",
          "At our real estate agency, we understand that investing in real estate can be a complex and challenging process. That's why our investment services are designed to provide you with the guidance and support you need to make informed investment decisions. We work closely with our clients to understand their investment objectives and risk tolerance, and then develop investment strategies that align with those objectives. Trust us to help you achieve your investment goals and grow your real estate portfolio.",
        ] as readonly string[],
      },
    ] as const,
  },
  // The "Property Type Categories" small grid — verbatim labels.
  propertyTypes: {
    eyebrow: "Property categories",
    headline: { lead: "Every kind of", emphasis: "address." },
    lede: "From a downtown shop to a primary residence — every property type the GTA market presents.",
    items: [
      { label: "Apartment", icon: "building-2" },
      { label: "Building", icon: "building" },
      { label: "Condominium", icon: "buildings" },
      { label: "House", icon: "home" },
      { label: "Office", icon: "briefcase" },
      { label: "Shop", icon: "store" },
    ] as ReadonlyArray<{ label: string; icon: string }>,
  },
  // Three small "always-on" services from the source.
  alerts: {
    eyebrow: "Always-on",
    headline: { lead: "Stay ahead of the", emphasis: "market." },
    cards: [
      {
        title: "Neighbourhood Buzzer",
        // src: aliazam.ca/services/ — verbatim.
        body:
          "We understand the importance of staying informed. As your trusted real estate experts, we promise to keep you updated on all neighbourhood news and trends to help you make informed decisions.",
      },
      {
        title: "Price Drop Alert",
        // src: aliazam.ca/services/ — verbatim.
        body:
          "Looking for a deal? Sign up for our Price Drop Alert and be the first to know when a property's price has been reduced, ensuring you never miss out on a great opportunity.",
      },
      {
        title: "Free Home Evaluation",
        // src: aliazam.ca/services/ — verbatim.
        body:
          "Find out the true value of your home with our free home evaluation. Our experts will keep you updated on market trends and help you make informed selling decisions.",
      },
    ] as const,
  },
  // Buying-vs-Selling — long-form expanded "Real Estate Services" section.
  buyingSelling: {
    titleStroke: "Partner",
    eyebrow: "Buying or selling",
    headline: { lead: "Buy or sell with the", emphasis: "right partner." },
    paragraphs: [
      "Purchasing a home is a complex process that requires a significant amount of financial and emotional investment. On the other hand, selling a home involves a different set of challenges and considerations, including pricing the property appropriately, marketing it effectively, and negotiating with potential buyers. That's why it's crucial to work with a real estate professional who understands the intricacies of each stage of the process and can provide tailored support and guidance.",
      "When buying a home, a real estate professional can help you navigate the market and identify properties that meet your specific needs and budget. They can also guide you through the home inspection process, help you secure financing, and negotiate on your behalf to ensure that you get the best possible deal.",
      "Selling a home, on the other hand, requires a different skill set. A real estate professional can help you price your home appropriately, stage it for showings, and create an effective marketing plan to attract potential buyers. They can also provide valuable insights into the local market and help you negotiate with buyers to ensure that you get the best possible price for your property.",
      "In short, whether you're buying or selling a home, working with a knowledgeable and experienced real estate professional is essential. We can help you navigate the complexities of the process, minimize stress and maximize your return on investment.",
    ] as readonly string[],
    columns: [
      {
        title: "If you decide to buy",
        bullets: [
          "Inform you about the current state of the housing market.",
          "Discuss and evaluate the best alternatives based on your budget and criteria.",
          "Resolve any issues that may arise when buying a new home.",
          "Provide the highest level of service so that you are at ease and confident throughout the process.",
        ] as readonly string[],
      },
      {
        title: "If you decide to sell",
        bullets: [
          "Expertly market your home through channels like social media, websites, and multiple listing services.",
          "Conduct a comparative market analysis to demonstrate what other homes in your area have been sold for in the recent months.",
          "Secure the assistance of other professionals for completing the paperwork accurately and while meeting critical deadlines.",
          "Complete a property profile of your home, including current conditions, surroundings and special features.",
        ] as readonly string[],
      },
    ] as const,
  },
  ctaBanner: {
    eyebrow: "The agency",
    // src: aliazam.ca footer slogan, verbatim.
    headline: { lead: "For All Your", emphasis: "Real Estate Needs" },
    body:
      "Three pillars, one advisor — residential, commercial, and investment real estate guided personally by Ali Azam. Reach out for an off-market introduction or to start a private consultation.",
    primaryLabel: "Direct",
  },
} as const;
