import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Partir Vivre en Thaïlande – Assistance Expatriation",
  description:
    "Contactez notre équipe basée en Thaïlande. WhatsApp, téléphone ou email — réponse sous 24h pour toutes vos questions sur l'expatriation.",
  keywords: [
    "contact expatriation thailande",
    "aide expatrié thailande",
    "conseil expatriation bangkok",
    "whatsapp thailande",
    "assistance visa thailande",
  ],
  openGraph: {
    title: "Contactez-nous | Partir Vivre en Thaïlande",
    description:
      "Notre équipe locale vous accompagne dans toutes vos démarches d'expatriation en Thaïlande. Réponse garantie sous 24h.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
