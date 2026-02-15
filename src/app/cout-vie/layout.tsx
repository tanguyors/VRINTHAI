import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coût de la Vie en Thaïlande 2025 : Budget par Ville & Profil",
  description:
    "Guide complet du coût de la vie en Thaïlande : comparatif Bangkok, Chiang Mai, Phuket. Budget par profil (solo, couple, famille, retraité) et postes de dépense détaillés.",
  alternates: {
    canonical: "/cout-vie",
  },
  openGraph: {
    title: "Coût de la Vie en Thaïlande 2025 : Budget par Ville & Profil",
    description:
      "Combien coûte la vie en Thaïlande ? Comparatif par ville, budget par profil et conseils pour optimiser vos dépenses.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coût de la Vie en Thaïlande 2025 : Budget par Ville & Profil",
    description:
      "Combien coûte la vie en Thaïlande ? Comparatif par ville, budget par profil et conseils pour optimiser vos dépenses.",
  },
};

export default function CoutVieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
