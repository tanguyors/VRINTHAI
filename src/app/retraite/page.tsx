"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palmtree,
  FileText,
  Shield,
  Banknote,
  HeartPulse,
  Hospital,
  Stethoscope,
  Mountain,
  Waves,
  Building2,
  AlertTriangle,
  Home,
  Calendar,
  CreditCard,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const visaCards = [
  {
    icon: FileText,
    title: "Visa O-A — Le standard",
    description:
      "Visa Non-Immigrant O-A, valide 1 an et renouvelable. Le visa retraite le plus courant. Accessible dès 50 ans avec justificatifs financiers.",
    hero: true,
    points: [
      "Valide 1 an renouvelable",
      "Entrées multiples",
      "Le plus répandu",
    ],
  },
  {
    icon: Shield,
    title: "Visa O-X — Long séjour",
    description:
      "Visa 5 ans pour les ressortissants de certains pays. Conditions financières plus strictes (3 millions THB en banque). Renouvellement sur place.",
    hero: false,
  },
  {
    icon: Banknote,
    title: "Conditions financières",
    description:
      "Minimum 800 000 THB en banque thaïlandaise (~22 000 \u20ac) OU revenu mensuel de 65 000 THB (~1 720 \u20ac). Combinaison des deux acceptée.",
    hero: false,
  },
];

const healthCards = [
  {
    icon: HeartPulse,
    title: "Assurance obligatoire",
    description:
      "Une assurance santé couvrant l\u2019hospitalisation est requise pour le visa O-A. Couverture minimum recommandée : 400 000 THB pour les soins ambulatoires et 40 000 THB pour les hospitalisations.",
  },
  {
    icon: Hospital,
    title: "Infrastructures médicales",
    description:
      "La Thaïlande dispose d\u2019hôpitaux internationaux de premier plan, surtout à Bangkok. Bumrungrad, Bangkok Hospital, Samitivej : standards internationaux à prix compétitifs.",
  },
  {
    icon: Stethoscope,
    title: "Conseils pratiques",
    description:
      "Choisissez 1 à 2 cliniques de référence proches de votre logement. Numérisez vos dossiers médicaux. Vérifiez la disponibilité de la téléconsultation.",
  },
];

const cityBudgets = [
  {
    icon: Mountain,
    title: "Chiang Mai",
    description:
      "Cadre paisible, communauté expat active et coût de la vie imbattable. Le choix numéro 1 des retraités.",
    hero: true,
    label: "Le plus abordable",
    fees: [
      { level: "Logement", range: "350 – 600 \u20ac" },
      { level: "Courses", range: "180 – 280 \u20ac" },
      { level: "Transport", range: "15 – 30 \u20ac" },
      { level: "Total estimé", range: "600 – 1 000 \u20ac" },
    ],
  },
  {
    icon: Waves,
    title: "Hua Hin",
    description:
      "Station balnéaire calme, à 3h de Bangkok. Bonne infrastructure médicale et ambiance retraite internationale.",
    hero: false,
    fees: [
      { level: "Logement", range: "450 – 750 \u20ac" },
      { level: "Courses", range: "200 – 300 \u20ac" },
      { level: "Transport", range: "20 – 40 \u20ac" },
      { level: "Total estimé", range: "750 – 1 200 \u20ac" },
    ],
  },
  {
    icon: Building2,
    title: "Bangkok",
    description:
      "Meilleure infrastructure médicale du pays. Plus animé et plus cher, mais accès à tout.",
    hero: false,
    fees: [
      { level: "Logement", range: "500 – 900 \u20ac" },
      { level: "Courses", range: "220 – 320 \u20ac" },
      { level: "Transport", range: "20 – 45 \u20ac" },
      { level: "Total estimé", range: "800 – 1 400 \u20ac" },
    ],
  },
  {
    icon: Palmtree,
    title: "Phuket",
    description:
      "Cadre balnéaire premium. Budget plus élevé mais qualité de vie côtière exceptionnelle.",
    hero: false,
    fees: [
      { level: "Logement", range: "600 – 1 100 \u20ac" },
      { level: "Courses", range: "220 – 320 \u20ac" },
      { level: "Transport", range: "25 – 45 \u20ac" },
      { level: "Total estimé", range: "900 – 1 600 \u20ac" },
    ],
  },
];

const mistakes = [
  {
    icon: AlertTriangle,
    title: "Arriver sans assurance adaptée",
    description:
      "L\u2019assurance santé est obligatoire pour le visa O-A. Arriver sans couverture conforme peut compromettre votre visa et vous exposer à des frais médicaux énormes.",
  },
  {
    icon: FileText,
    title: "Sous-estimer les documents",
    description:
      "Certificats de banque, traductions, attestations : la paperasse est conséquente. Préparez tout en amont pour éviter les allers-retours.",
  },
  {
    icon: Home,
    title: "S\u2019engager trop vite sur un bail",
    description:
      "Testez un quartier 2 à 4 semaines en logement temporaire avant de signer un bail long. Chaque quartier a son ambiance.",
  },
  {
    icon: Calendar,
    title: "Oublier les échéances",
    description:
      "Le visa retraite se renouvelle chaque année. Un retard peut entraîner une amende, un overstay voire un refus de renouvellement.",
  },
  {
    icon: CreditCard,
    title: "Négliger la preuve bancaire",
    description:
      "Les 800 000 THB doivent être sur un compte thaïlandais depuis au moins 2 mois avant le renouvellement. Anticipez les transferts.",
  },
];

const faqs = [
  {
    question: "Peut-on combiner épargne et revenus pour le visa ?",
    answer:
      "Oui. Si vous n\u2019atteignez pas les 800 000 THB d\u2019épargne ou les 65 000 THB de revenus mensuels séparément, une combinaison des deux est acceptée tant que le total satisfait les critères de l\u2019immigration.",
  },
  {
    question: "L\u2019assurance santé est-elle vraiment obligatoire ?",
    answer:
      "Oui pour le visa O-A. La police doit couvrir au minimum 400 000 THB en soins ambulatoires et 40 000 THB en hospitalisation. Sans assurance conforme, le renouvellement du visa peut être refusé.",
  },
  {
    question: "Peut-on changer de ville après l\u2019installation ?",
    answer:
      "Oui. Vous devez mettre à jour votre adresse auprès de l\u2019immigration dans les 24 heures suivant le déménagement. Le changement n\u2019affecte pas la validité du visa.",
  },
  {
    question: "Faut-il numériser ses dossiers médicaux ?",
    answer:
      "Fortement recommandé. Stockez vos antécédents, ordonnances et résultats d\u2019examens dans un cloud sécurisé. Cela facilite les consultations et les urgences, surtout si vous changez de ville.",
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
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#cbd5e1] rounded-full blur-[150px] mix-blend-screen"
      />
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function RetraitePage() {
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
      className="h-screen bg-[#0f172a] text-white selection:bg-[#cbd5e1] selection:text-[#0f172a] font-sans overflow-x-hidden overflow-y-auto"
    >
      <main className="bg-[#0f172a] selection:bg-[#cbd5e1] selection:text-[#0f172a]">

        {/* ═══════════════ SECTION 1 — HERO ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
              alt="Plage tropicale Thaïlande"
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
                <Palmtree className="w-4 h-4" />
                <span>Retraite &amp; Sérénité</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
              >
                Retraite
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
                Visa retraite, conditions financières, santé, budget et villes
                recommandées : tout pour préparer votre expatriation. Guide
                actualisé 2025.
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Éligibilité
              </span>
              <span className="text-2xl font-black text-[#ffc857]">
                50 ans minimum
              </span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Destinations
              </span>
              <span className="text-2xl font-black text-[#ffc857] italic tracking-tighter">
                4 villes
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0f172a] z-10 pointer-events-none" />
        </section>

        {/* ═══════════════ SECTION 2 — VISA RETRAITE ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Documents visa"
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
                Le visa{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  retraite
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {visaCards.map((card, i) => {
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
                      className="relative bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] rounded-xl md:rounded-[2rem] p-5 md:p-8 group overflow-hidden shadow-[0_20px_50px_rgba(203,213,225,0.3)]"
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
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ffc857]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {card.description}
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

        {/* ═══════════════ SECTION 3 — SANTÉ ET ASSURANCE ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80"
            alt="Hôpital"
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
                Santé et{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  assurance
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {healthCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
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
                        {card.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {card.description}
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

        {/* ═══════════════ SECTION 4 — BUDGET PAR VILLE ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1920&q=80"
            alt="Villes Thaïlande"
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
                Budget mensuel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  pour un retraité
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {cityBudgets.map((city, i) => {
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
                      className="relative bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] rounded-xl md:rounded-[2rem] p-5 md:p-8 group overflow-hidden shadow-[0_20px_50px_rgba(203,213,225,0.3)]"
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
                              className={`flex items-center justify-between py-2 border-b border-white/20 last:border-b-0 ${
                                fee.level === "Total estimé"
                                  ? "font-black"
                                  : ""
                              }`}
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
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ffc857]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
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
                            className={`flex items-center justify-between py-2 border-b border-white/10 last:border-b-0 ${
                              fee.level === "Total estimé" ? "font-black" : ""
                            }`}
                          >
                            <span className="text-sm font-medium text-white/60">
                              {fee.level}
                            </span>
                            <span className="text-sm font-black text-[#cbd5e1] group-hover:text-[#ffc857] transition-colors duration-300">
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

        {/* ═══════════════ SECTION 5 — ERREURS À ÉVITER ═══════════════ */}
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
                Les erreurs{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  à éviter
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {mistakes.slice(0, 3).map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
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
                        {card.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {card.description}
                      </p>
                      <div className="mt-4 w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-0 group-hover:w-full h-full bg-[#ffc857] transition-all duration-500 ease-out" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
              {mistakes.slice(3).map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: (i + 3) * 0.1 }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ffc857]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {card.description}
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
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
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
                Besoin d&apos;un{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
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
                Nos conseillers basés à Bangkok vous accompagnent : visa
                retraite, assurance, budget, choix de la ville et installation
                complète.
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
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#cbd5e1] text-[#0f172a] hover:bg-[#ffc857] hover:shadow-[0_25px_60px_rgba(255,200,87,0.4)]  hover:text-white shadow-[0_10px_30px_rgba(203,213,225,0.4)] flex items-center justify-center transition-colors duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
