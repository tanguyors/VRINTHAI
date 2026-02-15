import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logement Thaïlande 2025 : Location, Budget & Quartiers Recommandés",
  description:
    "Guide complet du logement en Thaïlande : louer ou acheter, budget par ville, quartiers recommandés à Bangkok, Chiang Mai et Phuket, vérifications avant signature.",
  alternates: {
    canonical: "/logement",
  },
  openGraph: {
    title: "Logement Thaïlande 2025 : Location, Budget & Quartiers Recommandés",
    description:
      "Louer ou acheter ? Budget par ville, quartiers recommandés et vérifications essentielles pour trouver votre logement en Thaïlande.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logement Thaïlande 2025 : Location, Budget & Quartiers Recommandés",
    description:
      "Louer ou acheter ? Budget par ville, quartiers recommandés et vérifications essentielles pour trouver votre logement en Thaïlande.",
  },
};

export default function LogementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
