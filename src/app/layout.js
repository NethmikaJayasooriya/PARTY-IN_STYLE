import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import CursorTrail from "./components/CursorTrail";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Outfit, Playfair_Display } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
  variable: "--font-outfit",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-playfair",
});

export const metadata = {
  metadataBase: new URL("https://partyinstyle.com.au"),
  title: {
    default: "Party in Style | Melbourne's Premier Luxury Event Planners",
    template: "%s | Party in Style",
  },
  description:
    "Melbourne's premier luxury event planners with Australia-wide capability. Weddings, corporate galas, private parties — curated with elegance.",
  keywords: [
    "Luxury event planner Melbourne",
    "milestone birthday party planner",
    "corporate function coordinators Victoria",
    "EOFY party planners Melbourne",
    "high-end office parties",
    "luxury private functions",
    "bespoke weddings",
    "event stylist",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Party in Style | Melbourne's Premier Luxury Event Planners",
    description: "Curating exclusive, high-octane experiences for a discerning clientele in Melbourne and across Australia.",
    url: "https://partyinstyle.com.au",
    siteName: "Party in Style",
    images: [
      {
        url: "/images/hero-wedding-user.webp",
        width: 1200,
        height: 630,
        alt: "Luxury wedding banquet table setup with gold cutlery in Melbourne",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Party in Style | Melbourne's Premier Luxury Event Planners",
    description: "Curating exclusive, high-octane experiences for a discerning clientele in Melbourne and across Australia.",
    images: ["/images/hero-wedding-user.webp"],
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

export default async function RootLayout({ children }) {
  const settings = (await getSettings()) || {};
  const eventBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EventPlanningBusiness",
    name: "Party in Style",
    description: "Luxury event planning across Australia. Bespoke Weddings, Corporate Functions, EOFY Parties, Milestone Birthdays, and Exclusive Private Events.",
    url: "https://partyinstyle.com.au",
    logo: "https://partyinstyle.com.au/logo.webp",
    image: "https://partyinstyle.com.au/images/hero-wedding-user.webp",
    telephone: "+61494334934",
    priceRange: "$$$",
    makesOffer: [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Weddings" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Functions" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EOFY Parties" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Milestone Birthdays" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exclusive Private Events" } }
    ],
    "@id": "https://partyinstyle.com.au/#business",
    email: "concierge@partyinstyle.com.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cranbourne East",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      postalCode: "3977",
      addressCountry: "AU",
    },
    // TODO (owner): add a `geo: { "@type": "GeoCoordinates", latitude: <num>, longitude: <num> }`
    // block here once exact coordinates are taken from Google Maps / Google Business Profile.
    areaServed: [
      { "@type": "City", name: "Melbourne" },
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
      "https://www.facebook.com/share/18SWJEeoe5/",
      "https://www.instagram.com/partyinstyle111",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of events do you plan in Melbourne?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We organize everything from bespoke weddings to luxury corporate functions, EOFY parties, and milestone birthdays across Victoria.",
        },
      },
      {
        "@type": "Question",
        name: "Can you organize high-end office parties or corporate functions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. We specialize in premium corporate events, brand launches, and executive dinners designed to impress.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a luxury event planner in Melbourne cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because every event is bespoke and styled to perfection, pricing varies based on scale, theme, and requirements. We offer a free initial consultation and bespoke quoting tailored to your specific event needs.",
        },
      },
      {
        "@type": "Question",
        name: "Can Party in Style handle last-minute event bookings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While we recommend booking well in advance for large-scale and complex events, our experienced team is equipped to manage tight turnarounds and deliver extraordinary results when necessary.",
        },
      },
    ],
  };

  return (
    <html lang="en-AU" className="h-full" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventBusinessSchema) }}
        />
        <script
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
                "https://www.facebook.com/share/18SWJEeoe5/",
                "https://www.instagram.com/partyinstyle111",
              ]
            })
          }}
        />
        <script
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add,arrow_back,arrow_forward,business_center,cake,call,celebration,check_circle,chevron_left,chevron_right,close,cloud_upload,delete,diamond,eco,error,event_available,expand_more,favorite,forum,groups,handshake,image,inbox,list_alt,location_on,logout,mail,menu,nightlife,palette,photo_library,play_arrow,progress_activity,save,schedule,sell,send,settings,shield,star,theater_comedy,tune,upload,verified,workspace_premium,zoom_in&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true} className={`min-h-full flex flex-col bg-background text-on-surface antialiased font-body-md selection:bg-primary/30 selection:text-primary-light ${outfit.variable} ${playfairDisplay.variable}`}>
        <script dangerouslySetInnerHTML={{__html: "document.documentElement.classList.add('js')"}} />
        {/* Ambient luxury glow orbs */}
        <div className="ambient-glow site-chrome" aria-hidden="true">
          <div className="ambient-orb ambient-orb-1" />
          <div className="ambient-orb ambient-orb-2" />
          <div className="ambient-orb ambient-orb-3" />
        </div>
        <Preloader />
        <div className="site-chrome"><CursorTrail /></div>
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
