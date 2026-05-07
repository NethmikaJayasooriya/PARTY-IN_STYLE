import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import CursorTrail from "./components/CursorTrail";

export const metadata = {
  title: {
    default: "Party in Style | Australia's Premier Event Planners",
    template: "%s | Party in Style",
  },
  description:
    "Luxury event planning across Australia. Weddings, corporate galas, private parties — curated with elegance and executed with precision.",
  keywords: [
    "event planning Australia",
    "luxury events Sydney",
    "wedding planner Melbourne",
    "corporate events Perth",
    "party planner",
    "event stylist",
  ],
  openGraph: {
    title: "Party in Style | Australia's Premier Event Planners",
    description:
      "Curating exclusive, high-octane experiences for a discerning clientele.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Serif:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface antialiased font-body-md">
        <CursorTrail />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
