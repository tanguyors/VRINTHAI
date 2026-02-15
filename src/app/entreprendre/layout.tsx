import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entreprendre en Thaïlande 2025 : Créer sa Société & Work Permit",
  description:
    "Guide complet pour entreprendre en Thaïlande : structures juridiques (Limited, BOI, Branch), étapes de création, visa B, work permit et pièges à éviter.",
  alternates: {
    canonical: "/entreprendre",
  },
  openGraph: {
    title: "Entreprendre en Thaïlande 2025 : Créer sa Société & Work Permit",
    description:
      "Structures juridiques, étapes de création, visa et work permit : tout pour lancer votre activité en Thaïlande.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entreprendre en Thaïlande 2025 : Créer sa Société & Work Permit",
    description:
      "Structures juridiques, étapes de création, visa et work permit : tout pour lancer votre activité en Thaïlande.",
  },
};

export default function EntreprendreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
