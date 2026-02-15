"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Globe,
  BookOpen,
  Flag,
  Languages,
  Building2,
  Mountain,
  Palmtree,
  Search,
  FileText,
  ClipboardList,
  BadgeCheck,
  Settings,
  Trophy,
  Users,
  Dumbbell,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const programs = [
  {
    icon: Globe,
    title: "IB — Baccalauréat International",
    description:
      "Programme reconnu mondialement : PYP, MYP et DP. Développe l\u2019esprit critique, la recherche et l\u2019ouverture internationale. Accepté par les universités du monde entier.",
    hero: true,
    points: [
      "Reconnu mondialement",
      "Pensée critique & recherche",
      "Accès universel aux universités",
    ],
  },
  {
    icon: BookOpen,
    title: "Curriculum britannique",
    description:
      "Système modulaire IGCSE et A-Levels. Structure claire, spécialisation progressive. Idéal pour les parcours vers le Royaume-Uni, l\u2019Europe et au-delà.",
    hero: false,
  },
  {
    icon: Flag,
    title: "Curriculum américain",
    description:
      "High School Diploma avec options AP (Advanced Placement). Système flexible, parascolaire riche. Adapté aux projets vers l\u2019Amérique du Nord.",
    hero: false,
  },
  {
    icon: Languages,
    title: "Section francophone",
    description:
      "Écoles homologuées AEFE ou partenaires. Programme français complet pour les familles envisageant un retour en France ou un parcours francophone.",
    hero: false,
  },
];

const cityFees = [
  {
    icon: Building2,
    title: "Bangkok",
    description:
      "Le plus large choix d\u2019écoles et de programmes. Frais plus élevés mais offre la plus complète.",
    hero: false,
    fees: [
      { level: "Primaire", range: "7 000 – 14 000 €" },
      { level: "Secondaire", range: "8 500 – 16 000 €" },
      { level: "Lycée", range: "10 000 – 20 000 €" },
    ],
  },
  {
    icon: Mountain,
    title: "Chiang Mai",
    description:
      "Établissements à taille humaine, coûts modérés et cadre de vie paisible. Rapport qualité-prix imbattable.",
    hero: true,
    label: "Meilleur rapport qualité-prix",
    fees: [
      { level: "Primaire", range: "4 500 – 9 000 €" },
      { level: "Secondaire", range: "5 500 – 10 500 €" },
      { level: "Lycée", range: "7 000 – 13 000 €" },
    ],
  },
  {
    icon: Palmtree,
    title: "Phuket",
    description:
      "Cadre balnéaire avec une offre internationale correcte. Frais intermédiaires entre Bangkok et Chiang Mai.",
    hero: false,
    fees: [
      { level: "Primaire", range: "6 000 – 12 000 €" },
      { level: "Secondaire", range: "7 500 – 14 000 €" },
      { level: "Lycée", range: "9 000 – 18 000 €" },
    ],
  },
];

const admissionSteps = [
  {
    icon: Search,
    title: "Pré-sélection",
    description:
      "Identifiez 3 à 5 établissements selon le programme, la localisation et le budget. Consultez les résultats d\u2019examens et les avis de parents expatriés.",
  },
  {
    icon: FileText,
    title: "Constitution du dossier",
    description:
      "Bulletins scolaires, lettres de recommandation, certificat médical et pièces d\u2019identité. Préparez les traductions certifiées si nécessaire.",
  },
  {
    icon: ClipboardList,
    title: "Évaluation & entretien",
    description:
      "Tests de niveau en langue et mathématiques, entretien avec la direction. Certaines écoles évaluent aussi le positionnement académique.",
  },
  {
    icon: BadgeCheck,
    title: "Offre & inscription",
    description:
      "Frais d\u2019inscription, dépôt de garantie, achat des uniformes. Confirmez la place rapidement car les listes d\u2019attente sont fréquentes.",
  },
  {
    icon: Settings,
    title: "Logistique & rentrée",
    description:
      "Transport scolaire, cantine, activités extrascolaires. Organisez la logistique avant la rentrée pour une transition en douceur.",
  },
];

const criteria = [
  {
    icon: BookOpen,
    title: "Type de curriculum",
    description:
      "IB, britannique, américain ou français : choisissez en fonction du projet d\u2019études supérieures et de la mobilité géographique de votre famille.",
  },
  {
    icon: Languages,
    title: "Langue d\u2019enseignement",
    description:
      "Anglais majoritairement, avec des options bilingues ou francophones. Vérifiez le niveau de soutien ESL pour les non-anglophones.",
  },
  {
    icon: Trophy,
    title: "Résultats aux examens",
    description:
      "Taux de réussite IB, notes moyennes A-Levels ou scores AP. Un indicateur clé de la qualité académique de l\u2019établissement.",
  },
  {
    icon: Users,
    title: "Taille des classes",
    description:
      "Des classes de 15 à 25 élèves maximum favorisent l\u2019encadrement personnalisé et l\u2019attention portée à chaque enfant.",
  },
  {
    icon: Dumbbell,
    title: "Activités & infrastructures",
    description:
      "STEM, arts, sports, piscine, auditorium. Les meilleures écoles offrent un environnement complet au-delà de l\u2019académique.",
  },
  {
    icon: GraduationCap,
    title: "Partenariats universitaires",
    description:
      "Certaines écoles facilitent les admissions vers des universités partenaires. Un atout pour les parcours post-bac internationaux.",
  },
];

const faqs = [
  {
    question: "Le programme IB est-il indispensable ?",
    answer:
      "Non. L\u2019IB est excellent mais pas le seul chemin. Les A-Levels britanniques et les AP américains ouvrent tout autant de portes internationales. Le choix dépend du projet d\u2019études et du profil de votre enfant.",
  },
  {
    question: "Y a-t-il des listes d\u2019attente ?",
    answer:
      "Oui, surtout à Bangkok et Phuket pour les écoles les plus cotées. Anticipez les inscriptions 6 à 12 mois à l\u2019avance. Chiang Mai offre généralement plus de disponibilité.",
  },
  {
    question: "Peut-on changer de programme en cours de scolarité ?",
    answer:
      "C\u2019est possible mais nécessite une planification soignée. Le passage d\u2019un système à l\u2019autre implique des évaluations de niveau et parfois une année de transition. Consultez les deux établissements.",
  },
  {
    question:
      "Les écoles internationales offrent-elles un soutien en français ?",
    answer:
      "Certaines écoles proposent le français comme langue seconde ou ont des sections francophones homologuées AEFE. Mais la majorité des écoles internationales enseignent principalement en anglais.",
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
          background: `radial-gradient(circle at 10% 20%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 90% 80%, #064e3b 0%, transparent 40%)`,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff8c42] rounded-full blur-[150px] mix-blend-screen"
      />
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function EcolesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
      className="h-screen bg-[#022c31] text-white selection:bg-[#ff8c42] selection:text-white font-sans overflow-x-hidden overflow-y-auto"
    >
      <main className="bg-[#022c31] selection:bg-[#ff8c42] selection:text-white">
        <style jsx global>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>

        {/* ═══════════════ SECTION 1 — HERO ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80"
              alt="École internationale Thaïlande"
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
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#ff8c42] rounded-full blur-[120px] mix-blend-screen opacity-30"
            />
          </div>

          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-[#ffc857] text-sm font-bold tracking-widest uppercase"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Éducation &amp; Famille</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
              >
                Écoles Internationales
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  en Thaïlande
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
              >
                IB, britannique, américain ou français ? Programmes, coûts par
                ville, critères de choix et procédure d&apos;admission. Guide
                actualisé 2025.
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Programmes
              </span>
              <span className="text-2xl font-black text-[#ffc857]">
                4 curricula
              </span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Villes
              </span>
              <span className="text-2xl font-black text-white italic tracking-tighter">
                3 destinations
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#022c31] z-10 pointer-events-none" />
        </section>

        {/* ═══════════════ SECTION 2 — PROGRAMMES SCOLAIRES ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
            alt="Campus scolaire"
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
                Quel programme{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  pour votre enfant ?
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {programs.map((card, i) => {
                const Icon = card.icon;
                if (card.hero) {
                  return (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="relative bg-gradient-to-br from-[#ff8c42] to-[#ffc857] rounded-xl md:rounded-[2rem] p-5 md:p-8 group overflow-hidden shadow-[0_20px_50px_rgba(255,140,66,0.3)]"
                    >
                      <div className="absolute -inset-24 bg-white opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500 rounded-full" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3">
                          {card.title}
                        </h3>
                        <p className="text-white/90 text-sm font-medium leading-relaxed mb-4">
                          {card.description}
                        </p>
                        {card.points && (
                          <ul className="space-y-2">
                            {card.points.map((point) => (
                              <li
                                key={point}
                                className="flex items-center gap-2 text-white font-bold text-sm"
                              >
                                <Check className="w-4 h-4 flex-shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ff8c42]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ff8c42]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {card.description}
                      </p>
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

        {/* ═══════════════ SECTION 3 — COÛTS PAR VILLE ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1562601579-599dec564e06?w=1920&q=80"
            alt="Ville Thaïlande"
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
                Coûts annuels{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  par ville
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cityFees.map((city, i) => {
                const Icon = city.icon;
                if (city.hero) {
                  return (
                    <motion.div
                      key={city.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="relative bg-gradient-to-br from-[#ff8c42] to-[#ffc857] rounded-xl md:rounded-[2rem] p-5 md:p-8 group overflow-hidden shadow-[0_20px_50px_rgba(255,140,66,0.3)]"
                    >
                      <div className="absolute -inset-24 bg-white opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500 rounded-full" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-black text-white italic tracking-tight leading-tight">
                            {city.title}
                          </h3>
                          {city.label && (
                            <span className="text-[10px] font-black text-white/80 uppercase tracking-widest bg-white/20 px-2 py-1 rounded-full">
                              {city.label}
                            </span>
                          )}
                        </div>
                        <p className="text-white/90 text-sm font-medium leading-relaxed mb-5">
                          {city.description}
                        </p>
                        <div className="space-y-2">
                          {city.fees.map((fee) => (
                            <div
                              key={fee.level}
                              className="flex items-center justify-between py-2 border-b border-white/20 last:border-b-0"
                            >
                              <span className="text-sm font-bold text-white/90">
                                {fee.level}
                              </span>
                              <span className="text-sm font-black text-white">
                                {fee.range}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={city.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ff8c42]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ff8c42]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {city.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed mb-5">
                        {city.description}
                      </p>
                      <div className="space-y-2">
                        {city.fees.map((fee) => (
                          <div
                            key={fee.level}
                            className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0"
                          >
                            <span className="text-sm font-medium text-white/60">
                              {fee.level}
                            </span>
                            <span className="text-sm font-black text-[#ffc857]">
                              {fee.range}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 4 — ADMISSION 5 ÉTAPES ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1920&q=80"
            alt="Bangkok"
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
                Inscrire votre enfant{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  en 5 étapes
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
                  className="w-full bg-gradient-to-b from-[#ff8c42] via-[#ffc857] to-[#ff8c42] shadow-[0_0_20px_rgba(255,140,66,0.6)]"
                />
              </div>
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
                {admissionSteps.map((step, i) => {
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
                      <div className="hidden md:block md:w-[42%]">
                        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#ff8c42]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-[#ff8c42]/10 text-[#ff8c42]">
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black text-[#ffc857] uppercase tracking-[0.2em]">
                              Étape 0{i + 1}
                            </span>
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
                          <div className="absolute inset-0 bg-[#ff8c42] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#ff8c42] to-[#ffc857] p-[3px] shadow-[0_10px_30px_rgba(255,140,66,0.3)] transition-transform duration-500 group-hover:scale-110">
                            <div className="w-full h-full rounded-full bg-[#022c31] flex items-center justify-center">
                              <span className="text-3xl font-black text-white italic tracking-tighter">
                                {i + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#ff8c42]/30 to-transparent w-20 ${
                            isLeft ? "right-20" : "left-20 rotate-180"
                          }`}
                        />
                      </div>

                      <div className="md:hidden flex items-start gap-6 ml-24">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex-1 hover:border-[#ff8c42]/50 transition-all duration-500">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 rounded-xl bg-[#ff8c42]/10 text-[#ff8c42]">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-[#ffc857] uppercase tracking-[0.2em]">
                              Étape 0{i + 1}
                            </span>
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

        {/* ═══════════════ SECTION 5 — CRITÈRES DE CHOIX ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1920&q=80"
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
                Les critères{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  essentiels
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {criteria.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ff8c42]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ff8c42]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {item.description}
                      </p>
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

        {/* ═══════════════ SECTION 6 — FAQ ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1494949360228-4e9f966b5c96?w=1920&q=80"
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
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 20%, #ff8c42 0%, transparent 40%), radial-gradient(circle at 70% 80%, #ffc857 0%, transparent 40%), radial-gradient(circle at 50% 50%, #0d3b40 0%, transparent 60%), radial-gradient(circle at 10% 80%, #064e3b 0%, transparent 50%), radial-gradient(circle at 90% 20%, #022c31 0%, transparent 50%)`,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
                  accompagnement ?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/80 max-w-xl mx-auto mb-12 font-medium leading-relaxed"
              >
                Nos conseillers basés à Bangkok vous accompagnent : choix de
                l&apos;école, préparation du dossier, visites et inscription. Un
                suivi personnalisé pour chaque famille.
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
                Accompagnement complet &bull; Réponse sous 24h &bull; Basé à
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
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#ff8c42] hover:bg-[#ff7a21] text-white shadow-[0_10px_30px_rgba(255,140,66,0.4)] flex items-center justify-center transition-colors duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
