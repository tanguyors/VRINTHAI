import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logement Thaïlande 2025 : Location, Budget & Quartiers Recommandés",
  description:
    "Guide complet du logement en Thaïlande : louer ou acheter, budget par ville, quartiers recommandés à Bangkok, Chiang Mai et Phuket, vérifications avant signature.",
  openGraph: {
    title: "Logement Thaïlande 2025 : Location, Budget & Quartiers Recommandés",
    description:
      "Louer ou acheter ? Budget par ville, quartiers recommandés et vérifications essentielles pour trouver votre logement en Thaïlande.",
    type: "article",
  },
};

export default function LogementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
