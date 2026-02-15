import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Expatriation Thaïlande : Guides, Conseils & Retours d'Expérience",
  description:
    "Blog complet sur l'expatriation en Thaïlande : guides pratiques, culture, démarches administratives, santé et lifestyle pour les expatriés français.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog Expatriation Thaïlande : Guides, Conseils & Retours d'Expérience",
    description:
      "Guides pratiques, conseils culturels et retours d'expérience pour réussir votre installation en Thaïlande.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Expatriation Thaïlande : Guides, Conseils & Retours d'Expérience",
    description:
      "Guides pratiques, conseils culturels et retours d'expérience pour réussir votre installation en Thaïlande.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
