"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Palmtree,
  Briefcase,
  GraduationCap,
  Heart,
  Sun,
  Wifi,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Globe,
  CreditCard,
  Plane,
  RefreshCw,
  Building2,
  MapPin,
  Users,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const visaTypes = [
  {
    icon: Palmtree,
    code: "TR",
    title: "Visa Touristique",
    description:
      "Pour les séjours de tourisme jusqu\u2019à 60 jours, renouvelable une fois.",
    conditions: [
      "Passeport valide 6 mois",
      "Billet retour requis",
      "Justificatif hébergement",
    ],
    highlight: false,
    badge: null,
  },
  {
    icon: Briefcase,
    code: "Non-Imm B",
    title: "Visa Travail",
    description:
      "Pour les expatriés ayant une offre d\u2019emploi ou créant une entreprise en Thaïlande.",
    conditions: [
      "Contrat de travail",
      "Work Permit obligatoire",
      "Sponsor entreprise thaïe",
    ],
    highlight: false,
    badge: null,
  },
  {
    icon: GraduationCap,
    code: "ED",
    title: "Visa Éducation",
    description:
      "Pour étudier le thaï, les arts martiaux ou suivre une formation universitaire.",
    conditions: [
      "Inscription école agréée",
      "Présence obligatoire",
      "Renouvellement 90 jours",
    ],
    highlight: false,
    badge: null,
  },
  {
    icon: Heart,
    code: "Non-Imm O",
    title: "Visa Famille",
    description:
      "Pour les conjoints de citoyens thaïlandais ou parents d\u2019enfants thaïs.",
    conditions: [
      "Certificat de mariage",
      "Preuve de revenus",
      "Acte de naissance enfant",
    ],
    highlight: false,
    badge: null,
  },
  {
    icon: Sun,
    code: "OA / OX",
    title: "Visa Retraite 50+",
    description:
      "Pour les retraités de plus de 50 ans souhaitant vivre en Thaïlande.",
    conditions: [
      "50 ans minimum",
      "800 000 THB en banque",
      "Assurance santé obligatoire",
    ],
    highlight: true,
    badge: null,
  },
  {
    icon: Wifi,
    code: "DTV",
    title: "Visa Digital Nomad",
    description:
      "Nouveau visa pour les travailleurs à distance et freelances internationaux.",
    conditions: [
      "Revenu mensuel requis",
      "Durée 5 ans max",
      "Travail à distance uniquement",
    ],
    highlight: false,
    badge: "NOUVEAU",
  },
];

const detailedConditions = [
  {
    icon: Palmtree,
    name: "Visa Touristique (TR)",
    eligibility: [
      "Passeport valide minimum 6 mois",
      "Preuve de fonds (20 000 THB/personne)",
      "Billet de sortie du territoire",
      "Pas de casier judiciaire en Thaïlande",
    ],
    documents: [
      "Formulaire de demande rempli",
      "Photo d\u2019identité 4x6 cm",
      "Relevé bancaire des 3 derniers mois",
      "Confirmation de réservation hôtel",
      "Copie du billet d\u2019avion aller-retour",
    ],
  },
  {
    icon: Briefcase,
    name: "Visa Travail (Non-Imm B)",
    eligibility: [
      "Offre d\u2019emploi d\u2019une entreprise thaïe",
      "Qualifications professionnelles reconnues",
      "L\u2019entreprise doit avoir un capital de 2M THB",
      "Ratio 4 employés thaïs pour 1 étranger",
    ],
    documents: [
      "Lettre d\u2019invitation de l\u2019entreprise",
      "Enregistrement de la société (DBD)",
      "Liste des actionnaires",
      "Bilan financier de l\u2019entreprise",
      "CV et diplômes certifiés",
    ],
  },
  {
    icon: GraduationCap,
    name: "Visa Éducation (ED)",
    eligibility: [
      "Inscription dans un établissement agréé MoE",
      "Programme d\u2019études à temps plein",
      "Présence minimum 80% des cours",
      "Âge minimum selon le programme",
    ],
    documents: [
      "Lettre d\u2019acceptation de l\u2019école",
      "Programme de cours détaillé",
      "Preuve de paiement des frais",
      "Relevé de notes précédent",
      "Certificat médical",
    ],
  },
  {
    icon: Heart,
    name: "Visa Famille (Non-Imm O)",
    eligibility: [
      "Marié(e) à un(e) citoyen(ne) thaïlandais(e)",
      "OU parent d\u2019un enfant thaïlandais",
      "OU gardien d\u2019un national thaïlandais",
      "Revenu mensuel min. 40 000 THB ou 400 000 THB en banque",
    ],
    documents: [
      "Certificat de mariage légalisé",
      "Acte de naissance de l\u2019enfant",
      "Preuve de revenus ou relevé bancaire",
      "Attestation de domicile",
      "Photos du couple/famille",
    ],
  },
  {
    icon: Sun,
    name: "Visa Retraite (OA / OX)",
    eligibility: [
      "Avoir 50 ans révolus",
      "800 000 THB sur un compte bancaire thaï (OA)",
      "OU revenus mensuels de 65 000 THB minimum",
      "Assurance santé couvrant 40 000 THB ambulatoire et 400 000 THB hospitalisation",
    ],
    documents: [
      "Attestation bancaire de la banque thaïe",
      "Lettre de vérification de revenus (ambassade)",
      "Certificat médical",
      "Police d\u2019assurance santé conforme",
      "Casier judiciaire vierge (moins de 3 mois)",
    ],
  },
  {
    icon: Wifi,
    name: "Visa Digital Nomad (DTV)",
    eligibility: [
      "Travailler à distance pour une entreprise étrangère",
      "OU être freelance avec des clients étrangers",
      "Revenu annuel minimum de 500 000 THB",
      "Pas d\u2019emploi local en Thaïlande",
    ],
    documents: [
      "Preuve d\u2019emploi ou contrats clients",
      "Relevés bancaires des 6 derniers mois",
      "Lettre de l\u2019employeur (si salarié)",
      "Portfolio professionnel",
      "Assurance santé internationale",
    ],
  },
];

const steps = [
  {
    icon: FileText,
    title: "Identifier le bon visa",
    description:
      "Déterminez le type de visa adapté à votre situation : tourisme, travail, retraite, études ou digital nomad. Chaque catégorie a ses propres conditions.",
  },
  {
    icon: ClipboardList,
    title: "Rassembler les documents",
    description:
      "Préparez tous les documents requis : passeport valide, photos, justificatifs financiers, certificats médicaux et documents spécifiques à votre catégorie de visa.",
  },
  {
    icon: Globe,
    title: "Déposer la demande",
    description:
      "Soumettez votre dossier à l\u2019ambassade de Thaïlande, via le portail e-Visa ou directement au consulat. Les délais varient de 3 à 15 jours ouvrés.",
  },
  {
    icon: CreditCard,
    title: "Payer les frais",
    description:
      "Réglez les frais de visa : Tourist TR (1 000 THB), Non-Immigrant (2 000 THB), DTV (10 000 THB). Paiement en espèces ou par virement selon le consulat.",
  },
  {
    icon: Plane,
    title: "Entrer en Thaïlande",
    description:
      "Présentez votre visa à l\u2019immigration à l\u2019arrivée. Un tampon d\u2019entrée sera apposé avec la date limite de séjour. Conservez votre carte de départ TM.6.",
  },
  {
    icon: RefreshCw,
    title: "Renouveler / Étendre",
    description:
      "Rendez-vous au bureau d\u2019immigration local pour étendre votre visa avant expiration. Extension de 30 jours pour les Tourist, 1 an pour les Non-Immigrant avec justificatifs.",
  },
];

const applyPlaces = [
  {
    icon: Building2,
    title: "Ambassade de Thaïlande à Paris",
    description:
      "8 rue Greuze, 75116 Paris. Dépôt du lundi au vendredi, 9h30-12h00. Délai : 2-3 jours ouvrés.",
    link: "Prendre rendez-vous \u2192",
  },
  {
    icon: Globe,
    title: "Portail E-Visa Thaïlande",
    description:
      "Demande en ligne sur thaievisa.go.th. Paiement par carte bancaire. Délai : 5-10 jours ouvrés. Disponible pour la plupart des types de visa.",
    link: "Accéder au portail \u2192",
  },
  {
    icon: MapPin,
    title: "Bureau d\u2019Immigration en Thaïlande",
    description:
      "Pour les extensions et changements de visa sur place. Bureau principal : Chaeng Watthana, Bangkok. Bureaux régionaux dans chaque province.",
    link: "Voir les bureaux \u2192",
  },
  {
    icon: Users,
    title: "Consulats honoraires",
    description:
      "Lyon, Marseille, Strasbourg et autres villes. Services limités mais peuvent traiter certaines demandes de visa. Vérifiez les services disponibles.",
    link: "Liste des consulats \u2192",
  },
];

const faqs = [
  {
    question: "Peut-on rester en Thaïlande sans visa ?",
    answer:
      "Oui, les ressortissants français bénéficient d\u2019une exemption de visa de 60 jours (depuis mars 2024) pour les séjours touristiques. Cette exemption est renouvelable une fois pour 30 jours supplémentaires au bureau d\u2019immigration local (frais : 1 900 THB). Au total, vous pouvez rester 90 jours sans visa.",
  },
  {
    question: "Combien coûte un visa pour la Thaïlande ?",
    answer:
      "Les frais varient selon le type : Visa Touristique TR : environ 35\u20ac (entrée simple) ou 175\u20ac (entrées multiples). Non-Immigrant B/O : environ 70\u20ac. Visa OA Retraite : environ 70\u20ac. DTV Digital Nomad : environ 275\u20ac. Les frais sont payables au dépôt de la demande et non remboursables.",
  },
  {
    question: "Quel est le délai pour obtenir un visa ?",
    answer:
      "En ambassade/consulat : 2 à 5 jours ouvrés en général. Via le portail E-Visa : 5 à 15 jours ouvrés. Les délais peuvent augmenter en haute saison (novembre-février). Il est recommandé de faire sa demande au moins 1 mois avant le départ.",
  },
  {
    question: "Peut-on travailler avec un visa touristique ?",
    answer:
      "Non, il est strictement interdit de travailler en Thaïlande avec un visa touristique ou une exemption de visa. Travailler sans Work Permit est un délit passible d\u2019amende (jusqu\u2019à 100 000 THB) et d\u2019expulsion. Pour travailler légalement, vous devez obtenir un visa Non-Immigrant B et un Work Permit, ou un visa DTV pour le travail à distance.",
  },
];

/* ───────────────── SHARED BACKGROUND COMPONENT ────────────────── */

function SectionBackground({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-15"
        sizes="100vw"
        priority={false}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 20% 30%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 80% 10%, #ff8c42 0%, transparent 40%), radial-gradient(circle at 50% 80%, #ffc857 0%, transparent 50%), radial-gradient(circle at 90% 90%, #064e3b 0%, transparent 50%)`,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#ff8c42] rounded-full blur-[120px] mix-blend-screen opacity-30"
      />
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function VisaThailandePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show/hide back to top button
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => setShowBackToTop(container.scrollTop > window.innerHeight);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>(":scope > main > section"));

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateScroll(from: number, to: number) {
      isScrollingRef.current = true;
      const distance = to - from;
      const duration = 600;
      const startTime = performance.now();

      function step(time: number) {
        if (!container) return;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        container.scrollTop = from + distance * easeOutCubic(progress);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 100);
        }
      }

      requestAnimationFrame(step);
    }

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const sections = getSections();
      const scrollTop = container.scrollTop;
      const vh = container.clientHeight;

      let currentIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollTop + 10) {
          currentIdx = i;
        }
      }

      const section = sections[currentIdx];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      const canSeeBottom = scrollTop + vh >= sectionBottom - 20;
      const atSectionTop = scrollTop <= sectionTop + 20;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (scrollingDown && !canSeeBottom) return;
      if (scrollingUp && !atSectionTop) return;

      e.preventDefault();

      const nextIdx = scrollingDown
        ? Math.min(currentIdx + 1, sections.length - 1)
        : Math.max(currentIdx - 1, 0);

      if (nextIdx !== currentIdx) {
        animateScroll(scrollTop, sections[nextIdx].offsetTop);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        handleWheel({
          preventDefault: () => {},
          deltaY,
        } as unknown as WheelEvent);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const from = container.scrollTop;
    isScrollingRef.current = true;
    const duration = 800;
    const startTime = performance.now();
    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function step(time: number) {
      if (!container) return;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = from * (1 - easeOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isScrollingRef.current = false;
      }
    }
    requestAnimationFrame(step);
  }, []);

  return (
    <div ref={containerRef} className="h-screen bg-[#022c31] text-white selection:bg-[#ff8c42] selection:text-white font-sans overflow-x-hidden overflow-y-auto">
    <main className="bg-[#022c31] selection:bg-[#ff8c42] selection:text-white">

      {/* ═══════════════ SECTION 1 — HERO ═══════════════ */}
      <section className="relative w-full min-h-0 md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=80"
            alt="Thaïlande paysage tropical"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(circle at 20% 30%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 80% 10%, #ff8c42 0%, transparent 40%), radial-gradient(circle at 50% 80%, #ffc857 0%, transparent 50%), radial-gradient(circle at 90% 90%, #064e3b 0%, transparent 50%)`,
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#ff8c42] rounded-full blur-[120px] mix-blend-screen opacity-30"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-[#ffc857] text-sm font-bold tracking-widest uppercase"
            >
              <FileText className="w-4 h-4" />
              <span>Procédures administratives</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
            >
              Visa Thaïlande
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                Types, conditions &amp; procédure
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Tout ce que vous devez savoir pour obtenir votre visa et vivre
              légalement au pays du sourire. Guide actualisé 2025.
            </motion.p>
          </div>
        </div>

        {/* Bottom-left stats */}
        <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
              Types de visa
            </span>
            <span className="text-2xl font-black text-[#ffc857] flex items-center gap-2">
              6 types de visa
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
              Procédure
            </span>
            <span className="text-2xl font-black text-white italic tracking-tighter">
              en 6 étapes
            </span>
          </div>
        </div>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#022c31] z-10 pointer-events-none" />
      </section>

      {/* ═══════════════ SECTION 2 — VISA TYPES GRID ═══════════════ */}
      <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
        <SectionBackground
          src="https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1920&q=80"
          alt="Temple thaïlandais"
        />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
              Les 6 types de visa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                pour la Thaïlande
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visaTypes.map((visa, i) => {
              const Icon = visa.icon;
              return (
                <motion.div
                  key={visa.code}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative bg-white/5 backdrop-blur-md border rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ff8c42]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)] ${
                    visa.highlight
                      ? "border-[#ffc857]/50 shadow-[0_0_30px_rgba(255,200,87,0.1)]"
                      : "border-white/10"
                  }`}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                  {visa.badge && (
                    <span className="absolute top-4 right-4 px-2 py-1 bg-[#ff8c42] text-white text-[10px] font-bold uppercase tracking-widest rounded-md">
                      {visa.badge}
                    </span>
                  )}

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ff8c42]/20">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <span className="inline-block px-2 py-1 bg-white/10 rounded-md text-[#ffc857] text-xs font-bold tracking-widest uppercase mb-3">
                      {visa.code}
                    </span>

                    <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-2 group-hover:text-[#ffc857] transition-colors duration-300">
                      {visa.title}
                    </h3>

                    <p className="text-white/70 text-sm font-medium leading-relaxed mb-4">
                      {visa.description}
                    </p>

                    <ul className="space-y-2">
                      {visa.conditions.map((cond) => (
                        <li
                          key={cond}
                          className="flex items-start gap-2 text-sm text-white/80"
                        >
                          <Check className="w-4 h-4 text-[#ffc857] flex-shrink-0 mt-0.5" />
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-0 group-hover:w-full h-full bg-[#ff8c42] transition-all duration-500 ease-out" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3 — DETAILED CONDITIONS ═══════════════ */}
      <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
        <SectionBackground
          src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&q=80"
          alt="Plage tropicale Thaïlande"
        />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
              Conditions détaillées{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                par type de visa
              </span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {detailedConditions.map((item, i) => {
              const Icon = item.icon;
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff8c42]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg font-black text-white tracking-tight">
                        {item.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-white/60 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Eligibility */}
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ffc857] mb-4">
                              Conditions d&apos;éligibilité
                            </h4>
                            <ul className="space-y-3">
                              {item.eligibility.map((e) => (
                                <li
                                  key={e}
                                  className="flex items-start gap-2 text-sm text-white/80"
                                >
                                  <Check className="w-4 h-4 text-[#ff8c42] flex-shrink-0 mt-0.5" />
                                  <span>{e}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* Documents */}
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ffc857] mb-4">
                              Documents requis
                            </h4>
                            <ul className="space-y-3">
                              {item.documents.map((d) => (
                                <li
                                  key={d}
                                  className="flex items-start gap-2 text-sm text-white/80"
                                >
                                  <FileText className="w-4 h-4 text-[#ff8c42] flex-shrink-0 mt-0.5" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4 — 6-STEP TIMELINE ═══════════════ */}
      <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
        <SectionBackground
          src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1920&q=80"
          alt="Coucher de soleil Bangkok"
        />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
              Obtenir votre visa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                en 6 étapes
              </span>
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto relative">
            {/* CENTRAL GLOWING SPINE (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -ml-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-gradient-to-b from-[#ff8c42] via-[#ffc857] to-[#ff8c42] shadow-[0_0_20px_rgba(255,140,66,0.6)]"
              />
            </div>
            {/* Vertical line (mobile) */}
            <div className="md:hidden absolute left-10 top-0 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-gradient-to-b from-[#ff8c42] via-[#ffc857] to-[#ff8c42]"
              />
            </div>

            <div className="space-y-12 md:space-y-16">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`relative flex items-center md:justify-between group ${
                      isLeft ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    {/* STEP CONTENT CARD (desktop) */}
                    <div className="hidden md:block md:w-[42%]">
                      <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#ff8c42]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-[#ff8c42]/10 text-[#ff8c42]">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-black text-[#ffc857] uppercase tracking-[0.2em]">Étape 0{i + 1}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tight leading-tight mb-4">
                          {step.title}
                        </h3>
                        <p className="text-white/40 text-sm leading-relaxed font-medium">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* STEP NUMBER CIRCLE */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 bg-[#ff8c42] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#ff8c42] to-[#ffc857] p-[3px] shadow-[0_10px_30px_rgba(255,140,66,0.3)] transition-transform duration-500 group-hover:scale-110">
                          <div className="w-full h-full rounded-full bg-[#022c31] flex items-center justify-center">
                            <span className="text-3xl font-black text-white italic tracking-tighter">
                              {i + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* CONNECTOR LINE */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#ff8c42]/30 to-transparent w-20 ${
                        isLeft ? "right-20" : "left-20 rotate-180"
                      }`} />
                    </div>

                    {/* Mobile layout */}
                    <div className="md:hidden flex items-start gap-6 ml-24">
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex-1 hover:border-[#ff8c42]/50 transition-all duration-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 rounded-xl bg-[#ff8c42]/10 text-[#ff8c42]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-black text-[#ffc857] uppercase tracking-[0.2em]">Étape 0{i + 1}</span>
                        </div>
                        <h3 className="text-lg font-black text-white italic tracking-tight mb-3">
                          {step.title}
                        </h3>
                        <p className="text-white/40 text-sm font-medium leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 5 — WHERE TO APPLY ═══════════════ */}
      <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
        <SectionBackground
          src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&q=80"
          alt="Bangkok Thaïlande"
        />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
              Où faire{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                votre demande ?
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {applyPlaces.map((place, i) => {
              const Icon = place.icon;
              return (
                <motion.div
                  key={place.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ff8c42]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)]"
                >
                  <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ff8c42]/20">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-black text-white italic tracking-tight mb-2 group-hover:text-[#ffc857] transition-colors duration-300">
                      {place.title}
                    </h3>

                    <p className="text-white/70 text-sm font-medium leading-relaxed mb-4">
                      {place.description}
                    </p>

                    <span className="text-[#ff8c42] font-bold text-sm uppercase tracking-widest group-hover:text-[#ffc857] transition-colors cursor-pointer">
                      {place.link}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 6 — FAQ ═══════════════ */}
      <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
        <SectionBackground
          src="https://images.unsplash.com/photo-1494949360228-4e9f966b5c96?w=1920&q=80"
          alt="Voyage Thaïlande"
        />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
              Questions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                fréquentes
              </span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff8c42]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-lg font-black text-white tracking-tight">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-white/80 text-sm font-medium leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 7 — CTA CONTACT ═══════════════ */}
      <section className="relative w-full min-h-0 md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Mesh gradient background (no image) */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 20%, #ff8c42 0%, transparent 40%), radial-gradient(circle at 70% 80%, #ffc857 0%, transparent 40%), radial-gradient(circle at 50% 50%, #0d3b40 0%, transparent 60%), radial-gradient(circle at 10% 80%, #064e3b 0%, transparent 50%), radial-gradient(circle at 90% 20%, #022c31 0%, transparent 50%)`,
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff8c42] rounded-full blur-[150px] mix-blend-screen opacity-20"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ffc857] rounded-full blur-[120px] mix-blend-screen opacity-20"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter italic mb-8"
            >
              Besoin d&apos;un{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                accompagnement dédié ?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/80 max-w-xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Nos conseillers locaux basés en Thaïlande vous accompagnent dans
              toutes vos démarches de visa et d&apos;installation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
            >
              <button className="group relative px-10 py-5 bg-[#ff8c42] hover:bg-[#ff7a21] text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,140,66,0.3)] flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span>Contactez-nous sur WhatsApp</span>
              </button>
              <button className="flex items-center gap-3 px-8 py-5 text-white font-bold text-lg hover:text-[#ffc857] transition-colors rounded-2xl border-2 border-white/20 hover:border-[#ffc857] group">
                <Phone className="w-5 h-5" />
                <span>Appeler : +66 61 420 2619</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/60 text-sm font-medium"
            >
              Réponse sous 24h &bull; Conseil gratuit &bull; Basé à Bangkok
            </motion.div>
          </div>
        </div>
      </section>
    </main>

      {/* Back to top floating button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#ff8c42] hover:bg-[#ff7a21] text-white shadow-[0_10px_30px_rgba(255,140,66,0.4)] flex items-center justify-center transition-colors duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
