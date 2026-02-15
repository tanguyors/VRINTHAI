import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assurance Santé Expat Thaïlande 2025 : Guide Complet & Devis",
  description:
    "Guide complet de l'assurance santé pour expatriés en Thaïlande : pourquoi c'est indispensable, garanties à vérifier, offres par profil (solo, famille, retraité) et procédure de souscription.",
  alternates: {
    canonical: "/assurance-sante",
  },
  openGraph: {
    title: "Assurance Santé Expat Thaïlande 2025 : Guide Complet & Devis",
    description:
      "Pourquoi une assurance santé est indispensable en Thaïlande, quelles garanties vérifier et comment souscrire simplement.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Assurance Santé Expat Thaïlande 2025 : Guide Complet & Devis",
    description:
      "Pourquoi une assurance santé est indispensable en Thaïlande, quelles garanties vérifier et comment souscrire simplement.",
  },
};

export default function AssuranceSanteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
