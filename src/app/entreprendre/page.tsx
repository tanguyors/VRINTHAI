"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Building2,
  Award,
  Globe,
  GitBranch,
  ClipboardList,
  FileText,
  Landmark,
  CreditCard,
  Plane,
  BadgeCheck,
  Receipt,
  Clock,
  AlertTriangle,
  Languages,
  Users,
  Scale,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const structures = [
  {
    icon: Building2,
    title: "Limited Company",
    description:
      "La forme la plus courante pour les étrangers. Cadre standard, possibilité de recruter, ouverture d\u2019un compte pro. Requiert une participation thaïlandaise majoritaire (51\u202f%) sauf dérogation BOI.",
    points: [
      "Commerce et services locaux",
      "Recrutement de personnel",
      "Cadre juridique standard",
    ],
    highlight: true,
  },
  {
    icon: Award,
    title: "Société avec BOI",
    description:
      "Le Board of Investment offre des avantages majeurs : exemptions fiscales, permis de travail facilités, possibilité de détenir 100\u202f% du capital. Réservé aux projets innovants ou prioritaires.",
    points: [
      "100% capital étranger possible",
      "Exemptions fiscales jusqu\u2019à 8 ans",
      "Quotas work permit facilités",
    ],
    highlight: false,
  },
  {
    icon: Globe,
    title: "Bureau de représentation",
    description:
      "Présence légale en Thaïlande sans facturation locale. Idéal pour la prospection, les études de marché ou la coordination régionale. Aucune vente directe autorisée.",
    points: [
      "Zéro facturation locale",
      "Prospection et études de marché",
      "Faible coût de structure",
    ],
    highlight: false,
  },
  {
    icon: GitBranch,
    title: "Succursale (Branch)",
    description:
      "Extension directe de votre société mère étrangère. Conserve le contrôle centralisé et la marque. Compliance lourde et responsabilité de la maison mère.",
    points: [
      "Contrôle centralisé",
      "Image de marque internationale",
      "Compliance importante",
    ],
    highlight: false,
  },
];

const creationSteps = [
  {
    icon: ClipboardList,
    title: "Définir votre structure",
    description:
      "Choisissez la forme juridique (Limited, BOI, bureau de représentation), définissez l\u2019actionnariat et l\u2019objet social. Cette étape conditionne tout le reste.",
  },
  {
    icon: FileText,
    title: "Réserver le nom et rédiger les statuts",
    description:
      "Réservez le nom de la société auprès du DBD (Department of Business Development). Rédigez les statuts avec un avocat local pour garantir la conformité.",
  },
  {
    icon: Landmark,
    title: "Enregistrer la société",
    description:
      "Déposez les documents au DBD, obtenez le numéro d\u2019enregistrement, le certificat d\u2019incorporation et le numéro fiscal. Délai : 3–5 jours ouvrés.",
  },
  {
    icon: CreditCard,
    title: "Ouvrir le compte bancaire pro",
    description:
      "Présentez les statuts signés, le registre à jour, la description d\u2019activité et les pièces d\u2019identité des dirigeants. Délai variable selon la banque : 1–3 semaines.",
  },
  {
    icon: Plane,
    title: "Obtenir le visa B",
    description:
      "La société enregistrée devient votre sponsor pour le visa Non-Immigrant B. Préparez le dossier avec la lettre d\u2019invitation, les documents société et votre passeport.",
  },
  {
    icon: BadgeCheck,
    title: "Déposer le work permit",
    description:
      "Le visa B autorise l\u2019entrée mais pas le travail. Le work permit est obligatoire pour exercer. Lié à votre employeur (votre société). Délai : 1–2 semaines.",
  },
  {
    icon: Receipt,
    title: "Lancer la comptabilité",
    description:
      "Engagez un comptable certifié local. La tenue comptable est obligatoire même sans chiffre d\u2019affaires. Respectez les échéances fiscales mensuelles et annuelles.",
  },
];

const visaWorkPermit = [
  {
    icon: Plane,
    title: "Visa Non-Immigrant B",
    description:
      "Le visa B autorise votre entrée en Thaïlande à des fins professionnelles. Il est sponsorisé par votre société et renouvelable annuellement. Insuffisant seul pour travailler.",
    points: [
      "Sponsorisé par la société",
      "Renouvelable chaque année",
      "Nécessaire mais pas suffisant",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Work Permit",
    description:
      "L\u2019exercice effectif d\u2019une activité exige un work permit lié à votre employeur. Sans ce document, toute activité professionnelle est illégale, même en tant que dirigeant de votre propre société.",
    points: [
      "Obligatoire pour travailler",
      "Lié à votre société",
      "Délai : 1–2 semaines",
    ],
  },
];

const pitfalls = [
  {
    icon: Clock,
    title: "Sous-estimer les délais bancaires",
    description:
      "L\u2019ouverture du compte pro peut prendre 1 à 3 semaines. Certaines banques demandent des documents supplémentaires. Anticipez cette étape dès l\u2019enregistrement.",
  },
  {
    icon: AlertTriangle,
    title: "Vendre avant les autorisations",
    description:
      "Lancer des ventes ou facturer avant l\u2019activation complète des autorisations (enregistrement, compte pro, work permit) expose à des sanctions.",
  },
  {
    icon: Languages,
    title: "Négliger les traductions certifiées",
    description:
      "De nombreux documents doivent être traduits en thaï par un traducteur assermenté. Prévoyez les délais et coûts de traduction (500–2\u202f000 THB/page).",
  },
  {
    icon: Users,
    title: "Ignorer la conformité RH",
    description:
      "Contrats de travail, fiches de paie, assurance sociale : les obligations employeur sont strictes. Un manquement peut bloquer le renouvellement de votre work permit.",
  },
  {
    icon: Scale,
    title: "Choisir la mauvaise structure",
    description:
      "Une structure inadaptée complique le renouvellement du visa et du work permit. Prenez conseil avant de vous engager, changer de forme juridique coûte cher.",
  },
];

const faqs = [
  {
    question:
      "Peut-on travailler 100\u202f% à distance depuis la Thaïlande ?",
    answer:
      "C\u2019est possible si vous ne facturez pas localement, mais votre statut migratoire doit être en règle. Un visa touriste ne vous autorise pas à travailler, même à distance pour un client étranger. Privilégiez le visa DTV (Digital Nomad) ou le visa Non-Immigrant B avec work permit.",
  },
  {
    question: "Le visa B suffit-il pour travailler ?",
    answer:
      "Non. Le visa B autorise l\u2019entrée à des fins professionnelles mais l\u2019exercice effectif d\u2019une activité exige un work permit lié à votre employeur. Sans work permit, toute activité est illégale, y compris la signature de contrats.",
  },
  {
    question: "La comptabilité est-elle obligatoire même sans revenu ?",
    answer:
      "Oui. Dès l\u2019enregistrement de votre société, la tenue comptable est obligatoire. Même sans chiffre d\u2019affaires, vous devez déposer des déclarations mensuelles (TVA, retenues à la source) et un bilan annuel audité.",
  },
  {
    question: "Combien de temps prend la création d\u2019une société ?",
    answer:
      "Comptez 4 à 8 semaines selon la complexité : 3–5 jours pour l\u2019enregistrement, 1–3 semaines pour le compte bancaire, 1–2 semaines pour le work permit. Les projets BOI peuvent nécessiter 2–3 mois supplémentaires pour l\u2019approbation.",
  },
];

/* ───────────────── SHARED BACKGROUND COMPONENT ────────────────── */

function SectionBackground({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-15"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 10% 20%, #1e293b 0%, transparent 50%), radial-gradient(circle at 90% 80%, #cbd5e1 0%, transparent 40%)`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#cbd5e1] rounded-full blur-[150px] mix-blend-screen opacity-15"
      />
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function EntreprenderPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSteps, setActiveSteps] = useState<boolean[]>([false, false, false, false, false, false, false]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () =>
      setShowBackToTop(container.scrollTop > window.innerHeight);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(":scope > main > section")
      );

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
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
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
    <div
      ref={containerRef}
      className="h-screen bg-[#0f172a] text-white selection:bg-[#cbd5e1] selection:text-[#0f172a] font-sans overflow-x-hidden overflow-y-auto"
    >
      <main className="bg-[#0f172a] selection:bg-[#cbd5e1] selection:text-[#0f172a]">

        {/* ═══════════════ SECTION 1 — HERO ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=60"
              alt="Business Bangkok"
              fill
              className="object-cover opacity-15"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(circle at 20% 30%, #1e293b 0%, transparent 50%), radial-gradient(circle at 80% 10%, #cbd5e1 0%, transparent 40%), radial-gradient(circle at 50% 80%, #cbd5e1 0%, transparent 50%), radial-gradient(circle at 90% 90%, #cbd5e1 0%, transparent 50%)`,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#cbd5e1] rounded-full blur-[120px] mix-blend-screen opacity-30"
            />
          </div>

          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-[#cbd5e1] text-sm font-bold tracking-widest uppercase"
              >
                <Briefcase className="w-4 h-4" />
                <span>Business &amp; Expatriation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
              >
                Entreprendre
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  en Thaïlande
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
              >
                Structures juridiques, étapes de création, visa et work permit :
                tout ce qu&apos;il faut savoir pour lancer votre activité. Guide
                actualisé 2025.
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Structures juridiques
              </span>
              <span className="text-2xl font-black text-[#ffc857]">
                4 options
              </span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Processus de création
              </span>
              <span className="text-2xl font-black text-[#ffc857] italic tracking-tighter">
                7 étapes clés
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0f172a] z-10 pointer-events-none" />
        </section>

        {/* ═══════════════ SECTION 2 — STRUCTURES JURIDIQUES ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=60"
            alt="Bureau moderne"
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
                Quelle structure{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  pour votre projet ?
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {structures.map((structure, i) => {
                const Icon = structure.icon;
                return structure.highlight ? (
                  <motion.div
                    key={structure.title}
                    whileHover={{ y: -5, scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-[#ffc857] to-[#ff8c42] shadow-[0_30px_60px_rgba(255,200,87,0.35)] hover:shadow-[0_35px_70px_rgba(255,200,87,0.5)] flex flex-col justify-between transition-all duration-300"
                  >
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/30">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-3 leading-none">
                        {structure.title}
                      </h3>
                      <p className="text-white font-bold leading-tight opacity-90 mb-6">
                        {structure.description}
                      </p>
                      <ul className="space-y-2">
                        {structure.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-2 text-white/90 font-medium"
                          >
                            <Check className="w-4 h-4 flex-shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="absolute top-0 right-0 p-5 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Icon className="w-48 h-48 rotate-12" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={structure.title}
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-5 md:p-8 flex flex-col justify-between hover:border-[#ffc857]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)] overflow-hidden"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-[#cbd5e1]/20 flex items-center justify-center mb-6 border border-[#cbd5e1]/30">
                        <Icon className="w-6 h-6 text-[#cbd5e1] group-hover:text-[#ffc857] transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl font-black text-white italic tracking-tighter mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {structure.title}
                      </h3>
                      <p className="text-white/70 font-medium mb-4">
                        {structure.description}
                      </p>
                      <ul className="space-y-2">
                        {structure.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-2 text-white/70 text-sm font-medium"
                          >
                            <Check className="w-4 h-4 text-[#cbd5e1] flex-shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-0 group-hover:w-full h-full bg-[#ffc857] transition-all duration-500 ease-out" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 3 — ÉTAPES DE CRÉATION ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=60"
            alt="Bangkok skyline"
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
                Créer votre entreprise{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  en 7 étapes
                </span>
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -ml-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full bg-gradient-to-b from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] shadow-[0_0_20px_rgba(203,213,225,0.6)]"
                />
              </div>
              <div className="md:hidden absolute left-10 top-0 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full bg-gradient-to-b from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1]"
                />
              </div>

              <div className="space-y-12 md:space-y-16">
                {creationSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isLeft = i % 2 === 0;
                  const isActive = activeSteps[i];
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      onViewportEnter={() => {
                        setActiveSteps(prev => {
                          const newSteps = [...prev];
                          newSteps[i] = true;
                          return newSteps;
                        });
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`relative flex items-center md:justify-between group ${
                        isLeft ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      <div className="hidden md:block md:w-[42%]">
                        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#ffc857]/50 transition-all hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)] duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-1">
                          <div className="flex items-center gap-4 mb-4">
                            <motion.div
                              animate={{
                                backgroundColor: isActive ? "rgba(255, 200, 87, 0.2)" : "rgba(203, 213, 225, 0.1)",
                                color: isActive ? "#ffc857" : "#cbd5e1"
                              }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="p-3 rounded-xl"
                            >
                              <Icon className="w-6 h-6" />
                            </motion.div>
                            <motion.span
                              animate={{ color: isActive ? "#ffc857" : "#cbd5e1" }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="text-[10px] font-black uppercase tracking-[0.2em]"
                            >
                              Étape 0{i + 1}
                            </motion.span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tight leading-tight mb-4">
                            {step.title}
                          </h3>
                          <p className="text-white/40 text-sm leading-relaxed font-medium">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                        <div className="relative w-20 h-20">
                          <motion.div
                            animate={{ opacity: isActive ? 0.6 : 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 bg-[#ffc857] rounded-full blur-xl"
                          />
                          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#ffc857] to-[#ff8c42] p-[3px] shadow-[0_10px_30px_rgba(255,200,87,0.3)] transition-transform duration-500 group-hover:scale-110">
                            <motion.div
                              animate={{
                                background: isActive
                                  ? "linear-gradient(135deg, #ffc857 0%, #ff8c42 100%)"
                                  : "#0f172a"
                              }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="w-full h-full rounded-full flex items-center justify-center"
                            >
                              <span className="text-3xl font-black text-white italic tracking-tighter relative z-10">
                                {i + 1}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] overflow-hidden w-20 ${
                          isLeft ? "right-20" : "left-20 rotate-180"
                        }`}>
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isActive ? 1 : 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{ transformOrigin: isLeft ? "right" : "left" }}
                            className="h-full bg-gradient-to-r from-[#ffc857] to-transparent"
                          />
                        </div>
                      </div>

                      <div className="md:hidden flex items-start gap-6 ml-24">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex-1 hover:border-[#ffc857]/50 transition-all hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)] duration-500">
                          <div className="flex items-center gap-3 mb-3">
                            <motion.div
                              animate={{
                                backgroundColor: isActive ? "rgba(255, 200, 87, 0.2)" : "rgba(203, 213, 225, 0.1)",
                                color: isActive ? "#ffc857" : "#cbd5e1"
                              }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="p-3 rounded-xl"
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>
                            <motion.span
                              animate={{ color: isActive ? "#ffc857" : "#cbd5e1" }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="text-[10px] font-black uppercase tracking-[0.2em]"
                            >
                              Étape 0{i + 1}
                            </motion.span>
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

        {/* ═══════════════ SECTION 4 — VISA B & WORK PERMIT ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1562601579-599dec564e06?w=800&q=60"
            alt="Documents administratifs"
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
                Visa B et{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  Work Permit
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {visaWorkPermit.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 hover:border-[#ffc857]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)] overflow-hidden"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter mb-4 group-hover:text-[#ffc857] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/70 font-medium leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <ul className="space-y-3">
                        {item.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-3 text-white/70 font-medium"
                          >
                            <Check className="w-5 h-5 text-[#cbd5e1] flex-shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-0 group-hover:w-full h-full bg-[#ffc857] transition-all duration-500 ease-out" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 5 — PIÈGES À ÉVITER ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=60"
            alt="Bangkok"
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
                Les pièges{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  à éviter
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pitfalls.map((pitfall, i) => {
                const Icon = pitfall.icon;
                return (
                  <motion.div
                    key={pitfall.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ffc857]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {pitfall.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {pitfall.description}
                      </p>
                      <div className="mt-4 w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-0 group-hover:w-full h-full bg-[#ffc857] transition-all duration-500 ease-out" />
                      </div>
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
            src="https://images.unsplash.com/photo-1494949360228-4e9f966b5c96?w=800&q=60"
            alt="Thaïlande"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
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
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#ffc857]/50 transition-all hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)] duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
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
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 20%, #cbd5e1 0%, transparent 40%), radial-gradient(circle at 70% 80%, #cbd5e1 0%, transparent 40%), radial-gradient(circle at 50% 50%, #1e293b 0%, transparent 60%), radial-gradient(circle at 10% 80%, #cbd5e1 0%, transparent 50%), radial-gradient(circle at 90% 20%, #0f172a 0%, transparent 50%)`,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#cbd5e1] rounded-full blur-[150px] mix-blend-screen opacity-20"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#cbd5e1] rounded-full blur-[120px] mix-blend-screen opacity-20"
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
                Prêt à{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  vous lancer ?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/80 max-w-xl mx-auto mb-12 font-medium leading-relaxed"
              >
                Nos conseillers basés à Bangkok vous accompagnent de la
                structure juridique au work permit. Plan de création sous 48h.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
              >
                <button className="group relative px-10 py-5 bg-[#cbd5e1] text-[#0f172a] hover:bg-[#ffc857] hover:shadow-[0_25px_60px_rgba(255,200,87,0.4)]  hover:text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(203,213,225,0.3)] flex items-center gap-3">
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
                Plan de création sous 48h &bull; Réponse sous 24h &bull; Basé à
                Bangkok
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#cbd5e1] text-[#0f172a] hover:bg-[#ffc857] hover:shadow-[0_25px_60px_rgba(255,200,87,0.4)]  hover:text-white shadow-[0_10px_30px_rgba(203,213,225,0.4)] flex items-center justify-center transition-colors duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
