"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Key,
  Building2,
  Mountain,
  Palmtree,
  MapPin,
  FileText,
  Camera,
  Zap,
  Receipt,
  Wifi,
  Shield,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const housingOptions = [
  {
    icon: Key,
    title: "Location — Le choix recommandé",
    description:
      "Flexibilité maximale pour les expatriés. Pas d\u2019engagement foncier, mobilité géographique préservée. Commencez toujours par la location pour tester un quartier avant tout achat.",
    hero: true,
    points: [
      "Flexibilité totale",
      "Pas de risque foncier",
      "Idéal pour démarrer",
    ],
  },
  {
    icon: Home,
    title: "Achat — Sous conditions",
    description:
      "Les étrangers ne peuvent pas posséder de terrain. L\u2019achat en copropriété (condo) est possible dans la limite de 49 % de quota étranger par immeuble. Nécessite un transfert de fonds depuis l\u2019étranger.",
    hero: false,
  },
  {
    icon: Building2,
    title: "Types de logement",
    description:
      "Condos meublés, maisons individuelles, townhouses, serviced apartments. Le choix dépend de votre profil, famille et budget. Les condos meublés dominent le marché locatif expat.",
    hero: false,
  },
];

const cityBudgets = [
  {
    icon: Building2,
    title: "Bangkok",
    description:
      "Le marché le plus vaste et diversifié. Large gamme de prix selon les quartiers et le standing.",
    hero: false,
    fees: [
      { level: "T2 non-central", range: "500 – 900 €" },
      { level: "Internet", range: "10 – 20 €" },
      { level: "Énergie + eau", range: "60 – 110 €" },
    ],
  },
  {
    icon: Mountain,
    title: "Chiang Mai",
    description:
      "Le meilleur rapport qualité-prix pour les expatriés. Loyers modérés, cadre de vie agréable et communauté expat active.",
    hero: true,
    label: "Le plus abordable",
    fees: [
      { level: "T2 non-central", range: "350 – 600 €" },
      { level: "Internet", range: "10 – 15 €" },
      { level: "Énergie + eau", range: "50 – 90 €" },
    ],
  },
  {
    icon: Palmtree,
    title: "Phuket",
    description:
      "Cadre balnéaire premium. Loyers plus élevés, surtout dans les zones touristiques proches des plages.",
    hero: false,
    fees: [
      { level: "T2 non-central", range: "600 – 1 100 €" },
      { level: "Internet", range: "10 – 20 €" },
      { level: "Énergie + eau", range: "70 – 120 €" },
    ],
  },
];

const neighborhoods = [
  {
    icon: Building2,
    title: "Bangkok",
    areas: [
      "Sukhumvit — Expats, BTS, restaurants",
      "Ratchada — Rapport qualité-prix, MRT",
      "Ari — Branché, cafés, familles",
      "On Nut — Abordable, BTS, supermarchés",
    ],
  },
  {
    icon: Mountain,
    title: "Chiang Mai",
    areas: [
      "Nimmanhaemin — Cafés, coworking, expats",
      "Santitham — Calme, local, abordable",
      "Hang Dong — Familles, espace, nature",
    ],
  },
  {
    icon: Palmtree,
    title: "Phuket",
    areas: [
      "Chalong — Central, écoles, hôpitaux",
      "Kathu — Golf, calme, familles",
      "Thalang — Proche aéroport, abordable",
    ],
  },
];

const checks = [
  {
    icon: FileText,
    title: "Bail bilingue",
    description:
      "Exigez un contrat en thaï et en anglais. Vérifiez les clauses de résiliation anticipée, sous-location et responsabilité des réparations.",
  },
  {
    icon: Camera,
    title: "État des lieux",
    description:
      "Photos et vidéo de chaque pièce avant emménagement. Ce document protège votre dépôt de garantie lors de la restitution.",
  },
  {
    icon: Zap,
    title: "Tarif électricité",
    description:
      "Vérifiez si l\u2019électricité est facturée au tarif officiel (MEA/PEA) ou au tarif immeuble, souvent majoré de 30 à 50 %.",
  },
  {
    icon: Receipt,
    title: "Factures précédentes",
    description:
      "Demandez 3 mois de factures eau/électricité pour estimer vos charges réelles. Évite les mauvaises surprises.",
  },
  {
    icon: Wifi,
    title: "Couverture internet",
    description:
      "Testez la fibre et la couverture mobile sur place avant de signer. La qualité varie fortement d\u2019un immeuble à l\u2019autre.",
  },
  {
    icon: Shield,
    title: "Assurance habitation",
    description:
      "Recommandée mais pas obligatoire. Couvre incendie, dégât des eaux et vol. Coût modeste pour une protection utile.",
  },
];

const faqs = [
  {
    question: "Peut-on négocier le loyer ?",
    answer:
      "Oui, surtout pour les baux de 12 mois ou plus. Les propriétaires préfèrent les locataires stables. Une remise de 5 à 15 % est courante sur les engagements longs.",
  },
  {
    question: "Quel est le montant du dépôt de garantie ?",
    answer:
      "Généralement 1 à 2 mois de loyer, plus 1 mois d\u2019avance. Le dépôt est restitué en fin de bail sous réserve de l\u2019état des lieux de sortie.",
  },
  {
    question: "Faut-il une assurance habitation ?",
    answer:
      "Ce n\u2019est pas obligatoire mais fortement recommandé. Une assurance habitation couvre incendie, dégât des eaux et vol pour un coût modeste (2 000 à 5 000 THB/an).",
  },
  {
    question: "Peut-on quitter le bail avant terme ?",
    answer:
      "Cela dépend des clauses du contrat. Certains baux prévoient une pénalité (souvent la perte du dépôt). La sous-location est généralement interdite. Lisez le bail attentivement.",
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

export default function LogementPage() {
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
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
              alt="Appartement moderne Thaïlande"
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
                <Home className="w-4 h-4" />
                <span>Immobilier &amp; Installation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
              >
                Logement
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
                Louer ou acheter ? Budget par ville, quartiers recommandés,
                vérifications avant signature et pièges à éviter. Guide
                actualisé 2025.
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Villes
              </span>
              <span className="text-2xl font-black text-[#ffc857]">
                3 marchés
              </span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Checklist
              </span>
              <span className="text-2xl font-black text-white italic tracking-tighter">
                6 vérifications
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#022c31] z-10 pointer-events-none" />
        </section>

        {/* ═══════════════ SECTION 2 — LOUER OU ACHETER ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Immeubles"
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
                Louer ou{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  acheter ?
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {housingOptions.map((card, i) => {
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

        {/* ═══════════════ SECTION 3 — BUDGET PAR VILLE ═══════════════ */}
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
                Budget mensuel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  par ville
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

        {/* ═══════════════ SECTION 4 — QUARTIERS RECOMMANDÉS ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1920&q=80"
            alt="Bangkok quartier"
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
                Quartiers{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  recommandés
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {neighborhoods.map((city, i) => {
                const Icon = city.icon;
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
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-5 group-hover:text-[#ffc857] transition-colors duration-300">
                        {city.title}
                      </h3>
                      <ul className="space-y-3">
                        {city.areas.map((area) => (
                          <li
                            key={area}
                            className="flex items-start gap-3 text-white/70 font-medium text-sm"
                          >
                            <MapPin className="w-4 h-4 text-[#ffc857] flex-shrink-0 mt-0.5" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 5 — VÉRIFICATIONS ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1494949360228-4e9f966b5c96?w=1920&q=80"
            alt="Documents"
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
                Avant de signer :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  6 vérifications
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {checks.map((item, i) => {
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
                Nos conseillers basés à Bangkok vous accompagnent : recherche de
                logement, visite, négociation et vérification du bail. Un
                service clé en main.
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
