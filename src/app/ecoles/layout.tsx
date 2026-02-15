import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Écoles Internationales Thaïlande 2025 : Programmes, Coûts & Admission",
  description:
    "Guide complet des écoles internationales en Thaïlande : IB, britannique, américain, français. Coûts par ville, critères de choix et procédure d'admission.",
  alternates: {
    canonical: "/ecoles",
  },
  openGraph: {
    title: "Écoles Internationales Thaïlande 2025 : Programmes, Coûts & Admission",
    description:
      "IB, britannique, américain ou français ? Comparez les programmes, les coûts par ville et suivez la procédure d'admission pas à pas.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Écoles Internationales Thaïlande 2025 : Programmes, Coûts & Admission",
    description:
      "IB, britannique, américain ou français ? Comparez les programmes, les coûts par ville et suivez la procédure d'admission pas à pas.",
  },
};

export default function EcolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
