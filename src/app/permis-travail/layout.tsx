import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permis de Travail Thaïlande 2025 : Conditions & Démarche Complète",
  description:
    "Guide complet du work permit en Thaïlande : qui est concerné, conditions candidat et employeur, procédure en 5 étapes, renouvellement et pièges à éviter.",
  openGraph: {
    title: "Permis de Travail Thaïlande 2025 : Conditions & Démarche Complète",
    description:
      "Qui a besoin d'un work permit, quelles conditions remplir et comment l'obtenir étape par étape en Thaïlande.",
    type: "article",
  },
};

export default function PermisTravailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
