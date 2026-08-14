import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { ThemeProvider } from "./components/ThemeProvider";
import { SITE_URL } from "@/lib/seo";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | MN Legal",
    default: "MN Legal - Data Privacy & Corporate Law Experts Nairobi",
  },
  description: "Kenya's premier Legal Tech and Data Privacy law firm, specializing in AI Law, Corporate Commercial, and Dispute Resolution in Nairobi.",
  keywords: ["Legal Tech Kenya", "Data Privacy Lawyers Nairobi", "AI Law Kenya", "Corporate Lawyers Nairobi", "MN Advocates LLP", "Tech Lawyers Kenya"],
  authors: [{ name: "MN Legal" }],
  creator: "MN Legal",
  publisher: "MN Advocates LLP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "MN Legal - Leading Legal Tech & Data Privacy Firm Kenya",
    description: "Expert legal counsel in Data Protection, AI Governance, and Corporate Commercial Law. Based in Nairobi, serving East Africa.",
    url: SITE_URL,
    siteName: "MN Legal",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MN Legal - MN Advocates LLP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MN Legal - Top Legal Tech Firm Kenya",
    description: "Premier Data Privacy and AI Law experts in Nairobi. Precision. Counsel. Resolve.",
    creator: "@mnlegaladvocate",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3NYD2MRHRL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3NYD2MRHRL');
          `}
        </Script>

        {/* Structured Data — WebSite, LegalService + Organization (appears on every page) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.mnlegal.net/#website",
                  "url": "https://www.mnlegal.net",
                  "name": "MN Legal",
                  "alternateName": "MN Advocates LLP",
                  "publisher": { "@id": "https://www.mnlegal.net/#organization" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.mnlegal.net/insights/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "LegalService",
                  "@id": "https://www.mnlegal.net/#legalservice",
                  "name": "MN Legal",
                  "alternateName": "MN Advocates LLP",
                  "url": "https://www.mnlegal.net",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.mnlegal.net/og-image.jpg",
                    "width": 1200,
                    "height": 630
                  },
                  "telephone": "+254700325089",
                  "email": "info@mnlegal.net",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Global Center, 1st Floor, CBC Building, Off Argwings Kodhek Road, Kilimani",
                    "addressLocality": "Nairobi",
                    "addressRegion": "Nairobi County",
                    "addressCountry": "KE"
                  },
                  "areaServed": [
                    { "@type": "Country", "name": "Kenya" },
                    { "@type": "Place", "name": "East Africa" }
                  ],
                  "serviceType": [
                    "Data Privacy & Protection Law",
                    "Corporate & Commercial Law",
                    "Litigation & Dispute Resolution",
                    "Conveyancing & Property Law",
                    "Intellectual Property Law",
                    "Banking, Finance & Fintech Law",
                    "Employment & Labour Law"
                  ],
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "17:00"
                  },
                  "priceRange": "$$",
                  "sameAs": [
                    "https://www.linkedin.com/company/mn-legal",
                    "https://twitter.com/mnlegaladvocate",
                    "https://www.instagram.com/mnlegaladvocates/"
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.mnlegal.net/#organization",
                  "name": "MN Advocates LLP",
                  "url": "https://www.mnlegal.net",
                  "logo": "https://www.mnlegal.net/og-image.jpg",
                  "foundingLocation": { "@type": "Place", "name": "Nairobi, Kenya" },
                  "employee": [
                    { "@type": "Person", "name": "Mbula Nzuki", "jobTitle": "Founder & Managing Partner", "url": "https://www.mnlegal.net/team/mbula-nzuki", "sameAs": "https://www.linkedin.com/in/mbulanzuki/", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Sebie Salim", "jobTitle": "Chief Operations, Strategy & Growth", "url": "https://www.mnlegal.net/team/sebie-salim", "sameAs": "https://www.linkedin.com/in/sebie/", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Mutundu Chege", "jobTitle": "Litigation Department, Co-Head", "url": "https://www.mnlegal.net/team/mutundu-chege", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Konstantina Zariou", "jobTitle": "Of Counsel - London", "url": "https://www.mnlegal.net/team/konstantina-zariou", "sameAs": "https://www.linkedin.com/in/konstantina-zariou-aciarb/", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Husna Mohammed", "jobTitle": "Senior Associate", "url": "https://www.mnlegal.net/team/husna-mohammed", "sameAs": "https://www.linkedin.com/in/husna-mohammed-94686317b/", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Zachary Ongeri", "jobTitle": "AI & Digital Transformation Associate", "url": "https://www.mnlegal.net/team/zachary-ongeri", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Nour Sheriff", "jobTitle": "Associate", "url": "https://www.mnlegal.net/team/nour-sheriff", "sameAs": "https://www.linkedin.com/in/nour-sherif-%E4%B9%90-%E6%98%8E-7a59b6118/", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Tyrus Muya Kamau", "jobTitle": "Head of Cybersecurity", "url": "https://www.mnlegal.net/team/tyrus-muya-kamau", "sameAs": "https://www.linkedin.com/in/tyruskamau/", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Keziah Mwangi", "jobTitle": "HRM and Tax Associate", "url": "https://www.mnlegal.net/team/keziah-mwangi", "sameAs": "https://www.linkedin.com/in/keziah-mwangi/", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } },
                    { "@type": "Person", "name": "Nahashon Ian Muhari", "jobTitle": "Digital Marketing & Communications Lead", "url": "https://www.mnlegal.net/team/nahashon-muhari", "sameAs": "https://www.linkedin.com/in/nahashon-muhari-474a0628b/", "worksFor": { "@id": "https://www.mnlegal.net/#organization" } }
                  ],
                  "sameAs": [
                    "https://www.linkedin.com/company/mn-legal",
                    "https://twitter.com/mnlegaladvocate",
                    "https://www.instagram.com/mnlegaladvocates/"
                  ]
                }
              ]
            })
          }}
        />

        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
