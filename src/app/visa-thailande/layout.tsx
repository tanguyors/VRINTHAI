import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa Thaïlande 2025 : Types, Conditions & Procédure Complète",
  description:
    "Guide complet des visas pour la Thaïlande : Tourist TR, Non-Immigrant B, Education ED, Famille O, Retraite OA/OX et DTV Digital Nomad. Conditions, documents requis et procédure étape par étape.",
  alternates: {
    canonical: "/visa-thailande",
  },
  openGraph: {
    title: "Visa Thaïlande 2025 : Types, Conditions & Procédure Complète",
    description:
      "Guide complet des visas pour la Thaïlande : Tourist TR, Non-Immigrant B, Education ED, Famille O, Retraite OA/OX et DTV Digital Nomad.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Thaïlande 2025 : Types, Conditions & Procédure Complète",
    description:
      "Guide complet des visas pour la Thaïlande : Tourist TR, Non-Immigrant B, Education ED, Famille O, Retraite OA/OX et DTV Digital Nomad.",
  },
};

export default function VisaThailandeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
