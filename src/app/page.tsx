"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  MoveRight,
  Map,
  Sun,
  Coins,
  Palmtree,
  IdCard,
  Users,
  Stethoscope,
  Building2,
  Utensils,
  Heart,
  ChevronRight,
  Phone,
  ArrowUpRight,
  Smartphone,
  Briefcase,
  Globe,
  FileText,
  Banknote,
  Home,
  ShoppingCart,
  Car,
  Wifi,
  Zap,
  Wallet,
  ChevronDown,
  Check,
  Star,
  GraduationCap,
  MessageCircle,
  Facebook,
  Instagram,
  ArrowRight,
} from "lucide-react";

const SectionTitle = ({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="mb-12">
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/60 mt-4 max-w-2xl font-medium"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

function CostOfLivingSection() {
  const [budget, setBudget] = useState(1200);
  const [mode, setMode] = useState<"solo" | "couple">("couple");

  const multiplier = mode === "solo" ? 1 : 1.6;

  const breakdown = useMemo(() => {
    const base = budget / multiplier;
    return {
      loyer: Math.round(base * 0.45),
      courses: Math.round(base * 0.18),
      transport: Math.round(base * 0.04),
      resto: Math.round(base * 0.08),
      internet: Math.round(base * 0.02),
      energie: Math.round(base * 0.06),
      loisirs: Math.round(base * 0.17),
    };
  }, [budget, multiplier]);

  const lifestyle = budget < 900 ? { label: "Économique", color: "text-white/60" }
    : budget < 1500 ? { label: "Confortable", color: "text-[#ffc857]" }
    : budget < 2500 ? { label: "Premium", color: "text-[#ff8c42]" }
    : { label: "Luxe", color: "text-white" };

  const expenses = [
    { item: "Loyer T2 à Bangkok", value: breakdown.loyer, icon: Home },
    { item: "Courses mensuelles", value: breakdown.courses, icon: ShoppingCart },
    { item: "Transport local", value: breakdown.transport, icon: Car },
    { item: "Restaurants", value: breakdown.resto, icon: Utensils },
    { item: "Internet fibre", value: breakdown.internet, icon: Wifi },
    { item: "Électricité + eau", value: breakdown.energie, icon: Zap },
  ];

  const maxExpense = breakdown.loyer;

  return (
    <section className="relative py-32 bg-[#022c31] overflow-hidden min-h-screen">
      {/* Background Image + Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1920&q=80"
          alt="Street food en Thaïlande"
          fill
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 opacity-80" style={{
          background: `radial-gradient(circle at 10% 20%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 90% 80%, #064e3b 0%, transparent 40%)`
        }} />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff8c42] rounded-full blur-[150px] mix-blend-screen"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-[#ffc857] text-sm font-bold tracking-widest uppercase"
          >
            <Compass className="w-4 h-4" />
            <span>Optimisez votre pouvoir d&apos;achat</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter italic"
          >
            Coût de la vie <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">en Thaïlande</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Expense Infographic — dynamic bars */}
          <div className="lg:col-span-2 space-y-10">
            {expenses.map((row, i) => (
              <div key={i} className="group relative">
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#ff8c42]/20 group-hover:border-[#ff8c42]/30 transition-all duration-300">
                      <row.icon size={22} className="text-[#ff8c42]" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">{row.item}</span>
                  </div>
                  <motion.span
                    key={row.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-[#ffc857] font-black text-xl italic"
                  >
                    {row.value} €
                  </motion.span>
                </div>
                <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                  <motion.div
                    animate={{ width: `${Math.round((row.value / maxExpense) * 100)}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-[#ff8c42] to-[#ffc857] relative shadow-[0_0_20px_rgba(255,140,66,0.4)]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Budget Simulator */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden p-1 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"
            >
              <div className="relative z-10 p-8 md:p-10 rounded-[22px] bg-[#0d3b40]/80 backdrop-blur-xl border border-white/10 h-full">
                <div className="flex items-center gap-2 mb-6 text-[#ffc857] text-[10px] font-bold uppercase tracking-[0.3em]">
                  <Wallet className="w-4 h-4" />
                  <span>Simulateur budget</span>
                </div>

                {/* Mode Toggle */}
                <div className="flex gap-2 mb-8">
                  {(["solo", "couple"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                        mode === m
                          ? "bg-[#ff8c42] text-white shadow-[0_10px_30px_rgba(255,140,66,0.3)]"
                          : "bg-white/5 text-white/40 hover:bg-white/10"
                      }`}
                    >
                      {m === "solo" ? "Solo" : "Couple"}
                    </button>
                  ))}
                </div>

                {/* Budget Amount */}
                <div className="mb-2">
                  <motion.div
                    key={budget}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    className="text-5xl md:text-6xl font-black italic text-white tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,200,87,0.3)]"
                  >
                    {budget.toLocaleString()} €
                  </motion.div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[#ffc857] font-bold text-lg">par mois</span>
                    <span className={`text-xs font-black uppercase tracking-widest ${lifestyle.color}`}>
                      — {lifestyle.label}
                    </span>
                  </div>
                </div>

                {/* Slider */}
                <div className="my-8 relative">
                  <input
                    type="range"
                    min={500}
                    max={4000}
                    step={50}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-[#ff8c42] [&::-webkit-slider-thumb]:to-[#ffc857] [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,140,66,0.5)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/30 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-br [&::-moz-range-thumb]:from-[#ff8c42] [&::-moz-range-thumb]:to-[#ffc857] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/30 [&::-moz-range-thumb]:cursor-grab"
                    style={{
                      background: `linear-gradient(to right, #ff8c42 0%, #ffc857 ${((budget - 500) / 3500) * 100}%, rgba(255,255,255,0.1) ${((budget - 500) / 3500) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                    <span>500 €</span>
                    <span>4 000 €</span>
                  </div>
                </div>

                <div className="h-px bg-white/10 mb-6" />

                {/* Dynamic Breakdown */}
                <div className="space-y-3 mb-8">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Répartition estimée</div>
                  {[
                    { label: "Loyer", value: breakdown.loyer, icon: Home },
                    { label: "Courses", value: breakdown.courses, icon: ShoppingCart },
                    { label: "Restaurants", value: breakdown.resto, icon: Utensils },
                    { label: "Loisirs", value: breakdown.loisirs, icon: Compass },
                    { label: "Énergie", value: breakdown.energie, icon: Zap },
                    { label: "Transport", value: breakdown.transport, icon: Car },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-white/60">
                        <item.icon size={14} className="text-[#ff8c42]" />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-black text-white italic">{item.value} €</span>
                    </div>
                  ))}
                </div>

                <button className="group relative w-full py-5 px-6 bg-[#ff8c42] hover:bg-[#ff7a21] text-white rounded-2xl font-black text-lg transition-all duration-300 shadow-[0_20px_50px_rgba(255,140,66,0.2)] hover:shadow-[0_25px_60px_rgba(255,140,66,0.4)] hover:-translate-y-1">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Contactez un conseiller
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const visaData = [
  {
    name: "Retirement (Retraite)",
    icon: Palmtree,
    duration: "1 an renouvelable",
    conditions: "50+ ans, 65 000€ minimum en banque thaïlandaise",
    advantages: ["Renouvellement annuel simplifié", "Accès aux soins de santé locaux", "Pas de restriction géographique dans le pays"],
  },
  {
    name: "Élite",
    icon: Star,
    duration: "5 à 20 ans",
    conditions: "Investissement de 15 000€ à 60 000€ selon la formule",
    advantages: ["Service VIP à l\u2019aéroport", "Assistance administrative dédiée", "Accès à des lounges exclusifs"],
  },
  {
    name: "Smart Visa",
    icon: Briefcase,
    duration: "4 ans",
    conditions: "Professionnel qualifié dans un secteur ciblé (tech, santé, etc.)",
    advantages: ["Autorisation de travail incluse", "Famille éligible au même visa", "Pas de report de 90 jours"],
  },
  {
    name: "Mariage",
    icon: Heart,
    duration: "1 an renouvelable",
    conditions: "Époux(se) de nationalité thaïlandaise, 12 000€ en banque",
    advantages: ["Possibilité de travailler avec un permis", "Renouvellement simplifié", "Accès au système bancaire local"],
  },
  {
    name: "Éducation",
    icon: GraduationCap,
    duration: "Durée des études",
    conditions: "Inscription dans un établissement reconnu (langue, université, arts martiaux)",
    advantages: ["Coût très abordable", "Renouvellement pendant la durée du programme", "Ouvert à tous les âges"],
  },
];

function VisaAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80"
          alt="Aéroport international"
          fill
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 opacity-80" style={{
          background: `radial-gradient(circle at 10% 20%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 90% 80%, #064e3b 0%, transparent 40%)`
        }} />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff8c42] rounded-full blur-[150px] mix-blend-screen"
        />
      </div>
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4 text-[#ffc857] text-[10px] font-bold tracking-[0.3em] uppercase"
          >
            Procédures administratives
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter leading-tight">
            Types de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] to-[#ffc857] pr-2">visas</span>
          </h2>
          <p className="mt-4 text-white/60 font-medium">Trouvez le visa adapté à votre projet d&apos;expatriation en Thaïlande</p>
        </div>

        <div className="space-y-4">
          {visaData.map((visa, i) => {
            const isOpen = openIndex === i;
            const Icon = visa.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isOpen
                    ? "bg-white/10 backdrop-blur-xl border-[#ff8c42]/50 shadow-[0_0_40px_rgba(255,140,66,0.1)]"
                    : "bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left relative"
                >
                  {isOpen && (
                    <motion.div layoutId="visa-border-accent" className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff8c42]" />
                  )}
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isOpen ? "bg-[#ff8c42] text-white" : "bg-white/10 text-[#ffc857]"}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-black italic tracking-tighter transition-colors ${isOpen ? "text-[#ffc857]" : "text-white"}`}>
                        {visa.name}
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Catégorie visa long séjour</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-black text-[#ff8c42] uppercase tracking-widest">
                      {visa.duration}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-500 ${isOpen ? "rotate-180 text-[#ffc857]" : ""}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-8 pt-2 grid md:grid-cols-2 gap-8 border-t border-white/10">
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#ffc857] font-black mb-2">Conditions d&apos;éligibilité</p>
                            <p className="text-white/80 font-medium leading-relaxed">{visa.conditions}</p>
                          </div>
                          <button className="group relative px-6 py-3 bg-[#ff8c42] hover:bg-[#ff7a21] text-white font-black text-sm rounded-xl transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(255,140,66,0.2)]">
                            En savoir plus
                            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-[#ffc857] font-black mb-3">Avantages clés</p>
                          <ul className="space-y-3">
                            {visa.advantages.map((adv, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
                                <div className="mt-1 w-4 h-4 rounded-full bg-[#064e3b] flex items-center justify-center flex-shrink-0">
                                  <Check className="w-2.5 h-2.5 text-[#ffc857]" />
                                </div>
                                {adv}
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

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff8c42] rounded-full blur-[150px] opacity-10 -translate-x-1/2 pointer-events-none" />
    </section>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>(":scope > section, :scope > footer"));

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

      // Find current section: the one whose top is closest above scroll position
      let currentIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollTop + 10) {
          currentIdx = i;
        }
      }

      const section = sections[currentIdx];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      // Can we see the bottom of this section?
      const canSeeBottom = scrollTop + vh >= sectionBottom - 20;
      // Are we at the top of this section?
      const atSectionTop = scrollTop <= sectionTop + 20;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (scrollingDown && !canSeeBottom) {
        // Haven't reached bottom yet → scroll naturally inside
        return;
      }

      if (scrollingUp && !atSectionTop) {
        // Haven't reached top yet → scroll naturally inside
        return;
      }

      // We're at an edge → snap to next/prev section
      e.preventDefault();

      const nextIdx = scrollingDown
        ? Math.min(currentIdx + 1, sections.length - 1)
        : Math.max(currentIdx - 1, 0);

      if (nextIdx !== currentIdx) {
        animateScroll(scrollTop, sections[nextIdx].offsetTop);
      }
    };

    // Touch support
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

  return (
    <div ref={containerRef} className="h-screen bg-[#022c31] text-white selection:bg-[#ff8c42] selection:text-white font-sans overflow-x-hidden overflow-y-auto">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-x-clip bg-[#022c31]">
        <div className="absolute inset-0 z-0">
          {/* Background Photo */}
          <Image
            src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=80"
            alt="Temples dorés de Thaïlande"
            fill
            className="object-cover opacity-20"
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
            className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#ffc857] rounded-full blur-[120px] mix-blend-screen opacity-30"
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
              <Compass className="w-4 h-4" />
              <span>S&apos;installer au pays du sourire</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
            >
              Vivre en Thaïlande:
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                Expatriation simplifiée
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Installez-vous en Thaïlande en toute simplicité : coût de la vie
              ultra-réduit, climat tropical idyllique, démarches facilitées et
              accompagnement sur mesure pour une expatriation sans stress.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button className="group relative px-10 py-5 bg-[#ff8c42] hover:bg-[#ff7a21] text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,140,66,0.3)] flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Contact</span>
                <MoveRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
              Température Moyenne
            </span>
            <span className="text-2xl font-black text-[#ffc857] flex items-center gap-2">
              30°C <Sun className="w-5 h-5 fill-current" />
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
              Vibe
            </span>
            <span className="text-2xl font-black text-white italic tracking-tighter">
              Sabai Sabai
            </span>
          </div>
        </div>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#022c31] z-10 pointer-events-none" />
      </section>

      {/* 2. FEATURES GRID */}
      <section className="py-32 relative overflow-hidden bg-[#022c31] selection:bg-[#ff8c42] selection:text-white min-h-screen flex flex-col justify-center">
        {/* Background Image + Decorative Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1920&q=80"
            alt="Rizières tropicales de Thaïlande"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 opacity-80" style={{
            background: `radial-gradient(circle at 10% 20%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 90% 80%, #064e3b 0%, transparent 40%)`
          }} />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff8c42] rounded-full blur-[150px] mix-blend-screen"
          />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-[#ffc857] text-sm font-bold tracking-widest uppercase"
            >
              <Compass className="w-4 h-4" />
              <span>Les avantages de l&apos;expatriation</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter italic"
            >
              Pourquoi vivre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">en Thaïlande en 2025 ?</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Coins />, text: "Coût de la vie exceptionnellement bas" },
              { icon: <Sun />, text: "Climat tropical toute l'année" },
              { icon: <IdCard />, text: "Facilités pour les visas longue durée" },
              { icon: <Users />, text: "Communauté d'expatriés dynamique" },
              { icon: <Stethoscope />, text: "Soins médicaux de qualité à prix réduits" },
              { icon: <Building2 />, text: "Infrastructure moderne dans les villes" },
              { icon: <Heart />, text: "Culture riche et population accueillante" },
              { icon: <Utensils />, text: "Cuisine exceptionnelle et variée" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] hover:border-[#ff8c42]/40 transition-all duration-500 overflow-hidden hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)]"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center text-white mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ff8c42]/20">
                    {React.cloneElement(feature.icon as React.ReactElement<{ size: number; strokeWidth: number }>, {
                      size: 28,
                      strokeWidth: 2.5
                    })}
                  </div>

                  <h3 className="text-xl font-black text-white italic tracking-tight leading-tight group-hover:text-[#ffc857] transition-colors duration-300">
                    {feature.text}
                  </h3>

                  <div className="mt-4 w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-0 group-hover:w-full h-full bg-[#ff8c42] transition-all duration-500 ease-out" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AVANTAGES & PROFILES BENTO GRID */}
      <section className="py-24 relative overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=1920&q=80"
            alt="Marché flottant en Thaïlande"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 opacity-80" style={{
            background: `radial-gradient(circle at 10% 20%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 90% 80%, #064e3b 0%, transparent 40%)`
          }} />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff8c42] rounded-full blur-[150px] mix-blend-screen"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff8c42]/10 border border-[#ff8c42]/20 mb-6 text-[#ff8c42] text-xs font-bold tracking-widest uppercase"
            >
              <Compass className="w-3 h-3" />
              <span>Pourquoi choisir la Thaïlande ?</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9] mb-8">
              Les avantages <br />
              <span className="text-[#ffc857]">de s&apos;installer</span>
            </h2>
            <p className="text-xl text-white/80 font-medium leading-relaxed">
              S&apos;installer en Thaïlande en tant qu&apos;expatrié offre des conditions uniques : coût de la vie dérisoire, climat paradisiaque, soins de santé abordables et qualité de vie élevée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* HERO CARD: Retraités */}
            <motion.div
              whileHover={{ y: -5, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-[#ff8c42] to-[#ffc857] shadow-[0_30px_60px_rgba(255,140,66,0.25)] flex flex-col justify-between min-h-[400px]"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30">
                  <Palmtree className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-4 leading-none">Retraités</h3>
                <p className="text-xl md:text-2xl text-white font-bold leading-tight max-w-md opacity-90">
                  Visa retraite, coût de la vie réduit, climat chaud et infrastructures médicales d&apos;élite.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Palmtree className="w-64 h-64 rotate-12" />
              </div>
            </motion.div>

            {/* CARD: Nomades Digitaux */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-white/15 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffc857]/20 flex items-center justify-center mb-6 border border-[#ffc857]/30">
                  <Globe className="w-6 h-6 text-[#ffc857]" />
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4">Nomades Digitaux</h3>
                <p className="text-white/70 font-medium">Internet ultra-rapide, coworkings de classe mondiale et communauté internationale dynamique.</p>
              </div>
            </motion.div>

            {/* CARD: Entrepreneurs */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-white/30 transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4">Entrepreneurs</h3>
                <p className="text-white/70 font-medium">Marché en pleine croissance, coûts opérationnels réduits et avantages fiscaux via le BOI.</p>
              </div>
            </motion.div>

            {/* CARD: Familles */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-white/30 transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4">Familles</h3>
                <p className="text-white/70 font-medium">Écoles internationales prestigieuses, sécurité exceptionnelle et proximité avec la nature sauvage.</p>
              </div>
            </motion.div>

            {/* CARD: Jeunes Actifs */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-white/30 transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4">Jeunes Actifs</h3>
                <p className="text-white/70 font-medium">Expérience asiatique immersive, opportunités de carrière uniques et soif d&apos;aventure quotidienne.</p>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center text-white/40 italic text-sm tracking-widest uppercase font-bold"
          >
            Ce cadre favorise une installation sereine, que vous soyez retraité, travailleur à distance ou entrepreneur.
          </motion.p>
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[#064e3b] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      </section>

      {/* 4. DÉMARCHES TIMELINE */}
      <section className="py-24 relative overflow-hidden bg-[#022c31] min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1920&q=80"
            alt="Temple doré de Bangkok"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 opacity-80" style={{
            background: `radial-gradient(circle at 10% 20%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 90% 80%, #064e3b 0%, transparent 40%)`
          }} />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff8c42] rounded-full blur-[150px] mix-blend-screen"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 text-[#ffc857] text-[10px] font-bold tracking-[0.3em] uppercase">
              Le parcours pas à pas
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none mb-6">
              Démarches pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] to-[#ffc857] pr-2">s&apos;expatrier</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto font-medium">
              Nous vous accompagnons selon votre situation (retraité, travailleur, étudiant).
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* CENTRAL GLOWING SPINE */}
            <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1 md:-ml-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-gradient-to-b from-[#ff8c42] via-[#ffc857] to-[#ff8c42] shadow-[0_0_20px_rgba(255,140,66,0.6)]"
              />
            </div>

            <div className="space-y-16">
              {[
                { title: "Choisir le bon type de visa", desc: "Retirement, Elite, Smart Visa ou Éducation — chaque profil a son visa adapté pour un séjour longue durée.", icon: FileText },
                { title: "Préparer les justificatifs financiers", desc: "Relevés bancaires, attestations de revenus et preuves de fonds selon les exigences du visa choisi.", icon: Banknote },
                { title: "Ouvrir un compte bancaire local", desc: "Indispensable pour le quotidien : transferts, paiements et justification de fonds pour le renouvellement du visa.", icon: Building2 },
                { title: "Souscrire à une assurance santé", desc: "Couverture médicale complète exigée pour certains visas, avec accès aux hôpitaux internationaux.", icon: Stethoscope },
                { title: "Trouver un logement adapté", desc: "Condo, maison ou villa — chaque ville offre des options variées à des prix très compétitifs.", icon: Home },
                { title: "S&apos;enregistrer auprès des autorités", desc: "TM30, 90-day report et formalités d'immigration pour rester en règle tout au long de votre séjour.", icon: IdCard },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-center md:justify-between group ${
                    i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* STEP CONTENT CARD */}
                  <div className="ml-24 md:ml-0 md:w-[42%]">
                    <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#ff8c42]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-[#ff8c42]/10 text-[#ff8c42]">
                          <step.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black text-[#ffc857] uppercase tracking-[0.2em]">Étape 0{i + 1}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tight leading-tight mb-4">
                        {step.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed font-medium">
                        {step.desc}
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
                      i % 2 === 0 ? "right-20" : "left-20 rotate-180"
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. OÙ VIVRE CITY CARDS */}
      <section className="py-24 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Chaque destination offre un cadre spécifique : urbain, balnéaire, montagnard ou insulaire. À chacun son ambiance !">
            Où vivre en Thaïlande ?
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Bangkok", desc: "Capitale moderne, opportunités économiques, transports, hôpitaux", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80" },
              { name: "Chiang Mai", desc: "Ville culturelle, coût de la vie très bas, montagnes", img: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&q=80" },
              { name: "Phuket", desc: "Plages paradisiaques, tourisme international, aéroport direct", img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80" },
              { name: "Pattaya", desc: "Proximité de Bangkok, communauté d'expatriés", img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80" },
              { name: "Hua Hin", desc: "Station balnéaire paisible, prisée des retraités", img: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=600&q=80" },
              { name: "Koh Samui", desc: "Île tropicale, style de vie décontracté, nature", img: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=600&q=80" },
            ].map((city, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative h-[350px] rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-end"
              >
                <Image
                  src={city.img}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c31] via-[#022c31]/60 to-transparent" />
                <div className="relative z-10 p-8">
                  <h3 className="text-3xl font-black italic mb-2 text-[#ffc857]">
                    {city.name}
                  </h3>
                  <p className="text-white/70 font-medium leading-tight">
                    {city.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[#ff8c42] font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Découvrir <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COÛT DE LA VIE BUDGET INFOGRAPHIC */}
      <CostOfLivingSection />

      {/* 7. TYPES DE VISAS ACCORDION */}
      <VisaAccordionSection />

      {/* 8. RESSOURCES UTILES */}
      <section className="py-24 relative overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1920&q=80"
            alt="Plage tropicale de Thaïlande"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 opacity-80" style={{
            background: `radial-gradient(circle at 10% 20%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 90% 80%, #064e3b 0%, transparent 40%)`
          }} />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff8c42] rounded-full blur-[150px] mix-blend-screen"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle>Ressources utiles</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Visa pour vivre en Thaïlande", icon: <IdCard /> },
              { title: "Retraite en Thaïlande", icon: <Sun /> },
              { title: "Coût de la vie en Thaïlande", icon: <Coins /> },
              { title: "Vivre en Thaïlande avec 1000€/mois", icon: <Utensils /> },
              { title: "Créer une entreprise en Thaïlande", icon: <Building2 /> },
              { title: "Assurance santé expatrié Thaïlande", icon: <Stethoscope /> },
            ].map((res, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-start gap-4 group cursor-pointer"
              >
                <div className="text-[#ffc857]">{res.icon}</div>
                <h3 className="text-xl font-bold leading-tight flex-1">
                  {res.title}
                </h3>
                <div className="flex items-center gap-2 text-white/40 group-hover:text-[#ff8c42] transition-colors font-bold text-sm uppercase tracking-widest">
                  En savoir plus <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 relative overflow-hidden min-h-screen flex flex-col justify-center">
        <Image
          src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&q=80"
          alt="Plage thaïlandaise au coucher du soleil"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-[#022c31] opacity-80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-[#0d3b40] to-[#022c31] border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#ff8c42] rounded-full blur-[100px] opacity-20" />
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8">
              Vous envisagez de{" "}
              <span className="text-[#ffc857]">vivre en Thaïlande ?</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 font-medium">
              Bénéficiez d&apos;un accompagnement personnalisé et d&apos;un audit
              gratuit de votre situation : retraite, visa, budget, logement, etc.
            </p>
            <button className="px-12 py-6 bg-[#ff8c42] hover:bg-[#ff7a21] text-white font-black text-xl rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95">
              Je veux vivre en Thaïlande dès maintenant
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#022c31] pt-32 pb-16 relative overflow-hidden">
        {/* Animated Gradient Separator */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#ff8c42] to-transparent"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Brand Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-black italic text-white leading-[0.9] tracking-tighter mb-6">
                Partir Vivre <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  en Thaïlande
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-medium">
                Votre guide pour s&apos;expatrier au pays du sourire
              </p>
            </div>

            <div className="w-full max-w-md">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#ffc857] font-bold mb-4">
                Recevez nos conseils expatriation
              </p>
              <div className="flex gap-2 p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-transparent px-4 py-2 text-white outline-none placeholder:text-white/20 text-sm"
                />
                <button className="px-6 py-2 bg-[#ff8c42] hover:bg-[#ff7a21] text-white rounded-xl font-bold text-sm transition-all shadow-[0_10px_20px_rgba(255,140,66,0.2)] flex items-center gap-2 group">
                  S&apos;inscrire
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-24">
            <div className="col-span-2 lg:col-span-2 pr-8">
              <div className="flex flex-col gap-4">
                <a href="tel:+66614202619" className="group">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Téléphone</p>
                  <p className="text-white font-bold group-hover:text-[#ff8c42] transition-colors">+66 61 420 2619</p>
                </a>
                <a href="mailto:contact@partir-vivre-en-thailande.com" className="group">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Email</p>
                  <p className="text-white font-bold group-hover:text-[#ff8c42] transition-colors">contact@partir-vivre-en-thailande.com</p>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-[#ffc857] font-bold mb-6">Navigation</h4>
              <ul className="space-y-3">
                {["Accueil", "Nos services", "Blog", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              <h4 className="text-xs uppercase tracking-[0.3em] text-[#ffc857] font-bold mb-6">Nos Services</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                {[
                  "Visa Thaïlande", "Assurance Santé Expat", "Logement", "Permis de Conduire",
                  "Permis de Travail", "Créer une Entreprise", "École Internationale", "Retraite"
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-medium">{service}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-[0.3em] text-[#ffc857] font-bold mb-2">Suivez-nous</h4>
              <div className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ff8c42]/50 hover:bg-[#ff8c42]/10 transition-all group">
                  <MessageCircle className="w-4 h-4 text-[#ff8c42]" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">WhatsApp</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ff8c42]/50 hover:bg-[#ff8c42]/10 transition-all group">
                  <Facebook className="w-4 h-4 text-[#ff8c42]" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ff8c42]/50 hover:bg-[#ff8c42]/10 transition-all group">
                  <Instagram className="w-4 h-4 text-[#ff8c42]" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">
              © 2025 Partir Vivre en Thaïlande – Tous droits réservés
            </p>
            <div className="flex gap-8">
              {["CGU", "Mentions légales", "Politique de confidentialité"].map((legal) => (
                <a key={legal} href="#" className="text-white/30 hover:text-white text-[10px] uppercase tracking-[0.2em] font-medium transition-colors">
                  {legal}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

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
    </div>
  );
}
