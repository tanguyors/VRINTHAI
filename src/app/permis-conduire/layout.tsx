import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permis de Conduire Thaïlande 2025 : Types, Documents & Procédure",
  description:
    "Guide complet du permis de conduire en Thaïlande : permis international ou local, documents requis, procédure au DLT, tests et renouvellement.",
  alternates: {
    canonical: "/permis-conduire",
  },
  openGraph: {
    title: "Permis de Conduire Thaïlande 2025 : Types, Documents & Procédure",
    description:
      "Permis international ou local ? Documents, procédure au centre DLT, examens et renouvellement pour conduire légalement en Thaïlande.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Permis de Conduire Thaïlande 2025 : Types, Documents & Procédure",
    description:
      "Permis international ou local ? Documents, procédure au centre DLT, examens et renouvellement pour conduire légalement en Thaïlande.",
  },
};

export default function PermisConduireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
