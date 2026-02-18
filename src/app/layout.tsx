import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vrinthai.vercel.app"),
  title: {
    default: "Partir Vivre en Thaïlande – Expatriation simplifiée",
    template: "%s | Partir Vivre en Thaïlande",
  },
  description:
    "Le guide complet pour s'expatrier en Thaïlande. Visa, coût de la vie, logement, assurance santé et accompagnement sur mesure pour une installation réussie.",
  keywords: [
    "expatriation thailande",
    "vivre en thailande",
    "s'expatrier en thailande",
    "visa thailande",
    "coût de la vie thailande",
    "logement thailande",
    "retraite thailande",
    "travailler en thailande",
    "assurance santé expatrié",
    "permis de travail thailande",
    "école internationale thailande",
    "créer entreprise thailande",
  ],
  authors: [{ name: "Partir Vivre en Thaïlande" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Partir Vivre en Thaïlande – Expatriation simplifiée",
    description:
      "Le guide complet pour s'expatrier en Thaïlande. Visa, coût de la vie, logement, assurance santé et accompagnement sur mesure.",
    url: "https://vrinthai.vercel.app",
    siteName: "Partir Vivre en Thaïlande",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Partir Vivre en Thaïlande – Guide d'expatriation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partir Vivre en Thaïlande – Expatriation simplifiée",
    description:
      "Le guide complet pour s'expatrier en Thaïlande. Visa, coût de la vie, logement, assurance santé et accompagnement sur mesure.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Partir Vivre en Thaïlande",
      url: "https://vrinthai.vercel.app",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+66-61-420-2619",
        contactType: "customer service",
        availableLanguage: ["French", "English"],
      },
      sameAs: ["https://wa.me/66614202619"],
    },
    {
      "@type": "WebSite",
      name: "Partir Vivre en Thaïlande",
      url: "https://vrinthai.vercel.app",
      description:
        "Le guide complet pour s'expatrier en Thaïlande. Visa, coût de la vie, logement, assurance santé et accompagnement sur mesure pour une installation réussie.",
      inLanguage: "fr",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <Header />
        {children}
      </body>
    </html>
  );
}
