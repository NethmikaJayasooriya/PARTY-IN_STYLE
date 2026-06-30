import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import CursorTrail from "./components/CursorTrail";
import CardSpotlight from "./components/CardSpotlight";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Manrope, Fraunces, Italianno } from "next/font/google";

// Body / UI — warm geometric sans
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-manrope",
});

// Display / headings — soft modern old-style serif
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-fraunces",
});

// Accent script — used sparingly for flourish words
const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  variable: "--font-script",
});

export const metadata = {
  metadataBase: new URL("https://partyinstyle.com.au"),
  title: {
    default: "Party in Style | Themed Kids Birthday Parties & Event Styling Melbourne",
    template: "%s | Party in Style",
  },
  description:
    "Melbourne's themed kids birthday party stylists — Spider-Man, Batman, Barbie, princess, unicorn & custom themes, balloon garlands, backdrops & full setup across the south-east suburbs (Cranbourne, Berwick, Pakenham, Narre Warren). Plus weddings, christenings & corporate events. Free quote.",
  keywords: [
    "themed kids birthday parties Melbourne",
    "kids party stylist Melbourne",
    "superhero party Melbourne",
    "Barbie and princess party Melbourne",
    "balloon garland Melbourne",
    "1st birthday party Melbourne",
    "party hire Cranbourne Berwick Pakenham",
    "backdrop and prop hire Melbourne",
    "christening and naming day styling Melbourne",
    "corporate and EOFY event styling Melbourne",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Party in Style | Themed Kids Birthday Parties & Event Styling Melbourne",
    description: "Melbourne's themed kids birthday party stylists — superhero, Barbie, princess & custom themes, balloon garlands, backdrops & full setup across the south-east. Plus weddings & corporate events.",
    url: "https://partyinstyle.com.au",
    siteName: "Party in Style",
    images: [
      {
        url: "/images/hero-1stbday-ls.webp",
        width: 1920,
        height: 1080,
        alt: "Themed kids birthday party styling in Melbourne by Party in Style",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Party in Style | Themed Kids Birthday Parties Melbourne",
    description: "Melbourne's themed kids birthday party stylists — superhero, Barbie, princess & custom themes, balloon garlands & full setup. Plus weddings & corporate events.",
    images: ["/images/hero-1stbday-ls.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};


import { getSettings } from "@/lib/getSettings";
import { HOME_FAQ } from "@/lib/homeFaq";

export default async function RootLayout({ children }) {
  const settings = (await getSettings()) || {};
  const eventBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EventPlanningBusiness",
    name: "Party in Style",
    description: "Melbourne's themed kids birthday party stylists and event styling team — superhero, Barbie, princess, unicorn and custom themes, balloon garlands, backdrops, prop hire and full setup, plus weddings, christenings and corporate events across Melbourne's south-east suburbs.",
    slogan: "Themed kids parties, styled to the last balloon.",
    url: "https://partyinstyle.com.au",
    logo: "https://partyinstyle.com.au/logo.webp",
    image: "https://partyinstyle.com.au/images/hero-1stbday-ls.webp",
    telephone: "+61494334934",
    priceRange: "$$",
    knowsAbout: [
      "Themed kids birthday parties",
      "Superhero parties",
      "Barbie and princess parties",
      "Balloon garlands and backdrops",
      "1st birthday styling and cake smash",
      "Christenings and naming days",
      "Weddings and engagements",
      "Corporate and EOFY events",
    ],
    makesOffer: [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Themed Kids Birthday Parties" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Superhero Parties (Spider-Man & Batman)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Princess & Barbie Parties" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "1st Birthday Styling & Cake Smash" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Balloon Garlands, Backdrops & Prop Hire" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Table Styling & Event Decoration" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Christenings & Naming Days" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Weddings & Engagements" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate & EOFY Events" } }
    ],
    "@id": "https://partyinstyle.com.au/#business",
    email: "Kosatheman@gmail.com",
    founder: {
      "@type": "Person",
      name: "Kosala Perera",
      jobTitle: "Founder & Lead Stylist",
      email: "Kosatheman@gmail.com",
    },
    foundingDate: "2014",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+61494334934",
      email: "Kosatheman@gmail.com",
      areaServed: "AU",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cranbourne East",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      postalCode: "3977",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.105,
      longitude: 145.307,
    },
    areaServed: [
      { "@type": "City", name: "Melbourne" },
      { "@type": "City", name: "Cranbourne" },
      { "@type": "City", name: "Berwick" },
      { "@type": "City", name: "Pakenham" },
      { "@type": "City", name: "Narre Warren" },
      { "@type": "AdministrativeArea", name: "South-East Melbourne" },
      { "@type": "State", name: "Victoria" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      }
    ],
    sameAs: [
      "https://www.facebook.com/groups/1440866676676461/user/61586600203536/",
      "https://www.instagram.com/partyinstyle111",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <html lang="en-AU" className="h-full" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          id="schema-event-business"
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventBusinessSchema) }}
        />
        <script
          id="schema-organization"
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://partyinstyle.com.au/#organization",
              name: "Party in Style",
              url: "https://partyinstyle.com.au",
              logo: "https://partyinstyle.com.au/logo.webp",
              sameAs: [
                "https://www.facebook.com/groups/1440866676676461/user/61586600203536/",
                "https://www.instagram.com/partyinstyle111",
              ]
            })
          }}
        />
        <script
          id="schema-website"
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://partyinstyle.com.au/#website",
              url: "https://partyinstyle.com.au",
              name: "Party in Style",
              publisher: {
                "@id": "https://partyinstyle.com.au/#organization"
              }
            })
          }}
        />
        <script
          id="schema-faq"
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add,arrow_back,arrow_forward,auto_awesome,business_center,cake,call,celebration,check_circle,chevron_left,chevron_right,close,cloud_upload,delete,diamond,eco,error,event_available,expand_more,favorite,forum,groups,handshake,image,inbox,list_alt,location_on,logout,mail,menu,nightlife,palette,photo_library,play_arrow,progress_activity,save,schedule,sell,send,settings,shield,star,theater_comedy,tune,upload,verified,workspace_premium,zoom_in&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true} className={`min-h-full flex flex-col bg-background text-on-surface antialiased font-body-md selection:bg-primary/30 selection:text-primary-light ${manrope.variable} ${fraunces.variable} ${italianno.variable}`}>
        <script dangerouslySetInnerHTML={{__html: "document.documentElement.classList.add('js')"}} />
        {/* Ambient luxury glow orbs */}
        <div className="ambient-glow site-chrome" aria-hidden="true">
          <div className="ambient-orb ambient-orb-1" />
          <div className="ambient-orb ambient-orb-2" />
          <div className="ambient-orb ambient-orb-3" />
          <div className="ambient-orb ambient-orb-4" />
          <div className="ambient-orb ambient-orb-5" />
        </div>

        <Preloader />
        <div className="site-chrome"><CursorTrail /></div>
        <CardSpotlight />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <FloatingWhatsApp settings={settings} />
        <GoogleAnalytics gaId="G-4181F1Z5W0" />
      </body>
    </html>
  );
}
