import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Où Vivre en Thaïlande 2025 : Comparatif Villes & Quartiers",
  description:
    "Guide complet pour choisir où vivre en Thaïlande : Bangkok, Chiang Mai, Phuket et alternatives. Comparatif par ville, critères essentiels et quartiers recommandés.",
  openGraph: {
    title: "Où Vivre en Thaïlande 2025 : Comparatif Villes & Quartiers",
    description:
      "Bangkok, Chiang Mai, Phuket ou ailleurs ? Comparatif par ville, par profil et par critère pour trouver votre point de chute.",
    type: "article",
  },
};

export default function OuVivreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
