import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import RevealObserver from "@/components/RevealObserver";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-head",
  display: "swap",
  // Poppins has no Cyrillic or Devanagari. Next's automatic metric-adjusted
  // fallback would catch those scripts first and render headings in Arial;
  // switching it off lets the cascade fall through to Inter, matching the
  // original site. Inter keeps its adjusted fallback, so body text is
  // still protected from layout shift.
  adjustFontFallback: false,
  fallback: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const description =
  "Cloud Bird India — Cloud, SAP HANA, SAP Business One and infrastructure services. We keep your critical infrastructure online, secure and fast.";

export const metadata: Metadata = {
  title: "Cloud Bird India",
  description,
  openGraph: {
    title: "Cloud Bird India",
    description:
      "Cloud, SAP & infrastructure services. We keep your critical infrastructure online, secure and fast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <LanguageProvider>
          <a className="skip-link" href="#home">
            Skip to content
          </a>
          {children}
          <RevealObserver />
        </LanguageProvider>
      </body>
    </html>
  );
}
