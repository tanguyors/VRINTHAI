import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retraite en Thaïlande 2025 : Visa, Budget, Santé & Villes",
  description:
    "Guide complet pour prendre sa retraite en Thaïlande : visa O-A et O-X, conditions financières, assurance santé, budget par ville et erreurs à éviter.",
  alternates: {
    canonical: "/retraite",
  },
  openGraph: {
    title: "Retraite en Thaïlande 2025 : Visa, Budget, Santé & Villes",
    description:
      "Visa retraite, conditions financières, santé, budget et villes recommandées pour vivre votre retraite en Thaïlande.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retraite en Thaïlande 2025 : Visa, Budget, Santé & Villes",
    description:
      "Visa retraite, conditions financières, santé, budget et villes recommandées pour vivre votre retraite en Thaïlande.",
  },
};

export default function RetraiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
