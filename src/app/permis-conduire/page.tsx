"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Globe,
  Bike,
  FileText,
  MapPin,
  HeartPulse,
  CreditCard,
  Camera,
  Banknote,
  ClipboardList,
  Building2,
  Eye,
  BookOpen,
  CarFront,
  Calendar,
  RefreshCw,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const permitTypes = [
  {
    icon: Globe,
    title: "Permis international",
    description:
      "Solution temporaire pour les courts séjours. Valide 1 an maximum, il dépanne mais ne remplace pas le permis local pour une résidence prolongée. Doit être accompagné de votre permis national.",
    hero: false,
  },
  {
    icon: Car,
    title: "Permis local thaïlandais",
    description:
      "Recommandé dès que vous résidez en Thaïlande. Reconnu par les assurances locales, valable pour la location de véhicules et obligatoire pour les résidents de longue durée.",
    hero: true,
    points: [
      "Reconnu par les assurances",
      "Indispensable pour la location",
      "Renouvelable sur place",
    ],
  },
  {
    icon: Bike,
    title: "Catégorie moto",
    description:
      "Le permis auto ne couvre pas la moto. Si vous conduisez un deux-roues, une catégorie moto distincte est obligatoire. Même procédure, examen séparé.",
    hero: false,
  },
];

const documents = [
  {
    icon: FileText,
    title: "Passeport + visa",
    description:
      "Passeport valide avec visa en cours (Non-Immigrant, retraite, DTV, etc.). Le type de visa détermine votre éligibilité au permis local.",
  },
  {
    icon: MapPin,
    title: "Certificat de résidence",
    description:
      "Délivré par l\u2019immigration ou votre ambassade. Prouve votre adresse en Thaïlande. Certains bureaux DLT acceptent une lettre de votre condo.",
  },
  {
    icon: HeartPulse,
    title: "Certificat médical",
    description:
      "Examen médical récent attestant de votre aptitude à conduire. Disponible dans toute clinique ou hôpital pour 100\u2013200 THB.",
  },
  {
    icon: CreditCard,
    title: "Permis national + international",
    description:
      "Votre permis de conduire français (ou autre) et le permis international si vous en avez un. Facilitent la procédure et peuvent dispenser de l\u2019examen pratique.",
  },
  {
    icon: Camera,
    title: "Photos d\u2019identité",
    description:
      "Souvent prises sur place au centre DLT. Prévoyez tout de même 2 photos format passeport au cas où.",
  },
  {
    icon: Banknote,
    title: "Frais de dossier",
    description:
      "Comptez 205 THB pour le permis auto et 105 THB pour le permis moto. Frais de renouvellement similaires. Paiement sur place uniquement.",
  },
];

const procedureSteps = [
  {
    icon: ClipboardList,
    title: "Préparer le dossier",
    description:
      "Rassemblez tous les documents : passeport, visa, certificat de résidence, certificat médical, permis national. Vérifiez que tout est à jour et conforme.",
  },
  {
    icon: Building2,
    title: "Se rendre au centre DLT",
    description:
      "Présentez-vous au Department of Land Transport (DLT) de votre province. Arrivez tôt (8h) car les places sont limitées. Certains centres acceptent la réservation en ligne.",
  },
  {
    icon: Eye,
    title: "Passer les tests médicaux",
    description:
      "Tests de vision (acuité, perception des couleurs), test de réflexes et test de perception de profondeur. Réalisés sur place au centre DLT.",
  },
  {
    icon: BookOpen,
    title: "Examen théorique",
    description:
      "QCM sur le code de la route thaïlandais : panneaux, priorités, règles locales. 50 questions, seuil de réussite : 45/50. Disponible en anglais dans la plupart des centres.",
  },
  {
    icon: CarFront,
    title: "Examen pratique",
    description:
      "Parcours sur circuit fermé : marche avant, marche arrière, créneau, freinage. Peut être dispensé si vous présentez un permis étranger valide selon la province.",
  },
];

const renewalCards = [
  {
    icon: Calendar,
    title: "Premier permis : 2 ans",
    description:
      "Le premier permis local est délivré pour une durée de 2 ans. Il est ensuite renouvelable pour 5 ans. Prévoyez le renouvellement avant expiration.",
  },
  {
    icon: RefreshCw,
    title: "Renouvellement : 5 ans",
    description:
      "Le renouvellement se fait au DLT avec les mêmes documents de base. Pas de nouvel examen pratique, uniquement les tests médicaux et visuels.",
  },
  {
    icon: AlertTriangle,
    title: "Attention aux délais",
    description:
      "Un permis expiré invalide votre assurance. Renouvelez au moins 1 mois avant l\u2019échéance. Un permis expiré depuis plus d\u20191 an nécessite de repasser les examens.",
  },
];

const faqs = [
  {
    question:
      "Le permis international suffit-il pour résider en Thaïlande ?",
    answer:
      "Non. Il dépanne au court terme (vacances, premiers mois) mais un permis local reste recommandé pour les séjours prolongés. Les assurances locales peuvent refuser la couverture avec un simple permis international, surtout en cas d\u2019accident.",
  },
  {
    question:
      "Faut-il repasser l\u2019examen pratique avec un permis étranger ?",
    answer:
      "L\u2019examen théorique est quasi systématique. L\u2019examen pratique dépend de la province et de la reconnaissance de votre permis national. Avec un permis français, plusieurs centres dispensent du pratique. Renseignez-vous auprès de votre DLT local.",
  },
  {
    question: "Faut-il un permis séparé pour la moto ?",
    answer:
      "Oui. Les catégories auto et moto sont distinctes. Conduire une moto avec un permis auto uniquement est une infraction. La procédure est identique mais l\u2019examen pratique se fait sur deux-roues.",
  },
  {
    question: "Que faire en cas de changement d\u2019adresse ?",
    answer:
      "Mettez à jour votre adresse auprès du DLT pour maintenir la cohérence avec vos documents d\u2019assurance. Un permis avec une ancienne adresse peut compliquer les démarches en cas de sinistre.",
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

export default function PermisConduirePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSteps, setActiveSteps] = useState<boolean[]>([false, false, false, false, false]);

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
              src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
              alt="Route en Thaïlande"
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
                <Car className="w-4 h-4" />
                <span>Mobilité &amp; Conduite</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
              >
                Permis de Conduire
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
                Permis international ou local ? Documents, procédure, tests et
                renouvellement : tout pour conduire légalement. Guide actualisé
                2025.
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Catégories
              </span>
              <span className="text-2xl font-black text-[#ffc857]">
                2 types
              </span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Procédure
              </span>
              <span className="text-2xl font-black text-[#ffc857] italic tracking-tighter">
                5 étapes
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0f172a] z-10 pointer-events-none" />
        </section>

        {/* ═══════════════ SECTION 2 — QUEL PERMIS ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Route thaïlandaise"
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
                Quel permis{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  pour votre situation ?
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {permitTypes.map((card, i) => {
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

        {/* ═══════════════ SECTION 3 — DOCUMENTS ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1562601579-599dec564e06?w=1920&q=80"
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
                Les documents{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  à préparer
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {documents.map((doc, i) => {
                const Icon = doc.icon;
                return (
                  <motion.div
                    key={doc.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ffc857]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {doc.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {doc.description}
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

        {/* ═══════════════ SECTION 4 — PROCÉDURE 5 ÉTAPES ═══════════════ */}
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
                Obtenir votre permis{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
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
                {procedureSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isLeft = i % 2 === 0;
                  const isActive = activeSteps[i];
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      onViewportEnter={() => {
                        setActiveSteps(prev => {
                          const newSteps = [...prev];
                          newSteps[i] = true;
                          return newSteps;
                        });
                      }}
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

        {/* ═══════════════ SECTION 5 — VALIDITÉ ET RENOUVELLEMENT ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1920&q=80"
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
                Validité et{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  renouvellement
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {renewalCards.map((card, i) => {
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
                Nos conseillers basés à Bangkok vous accompagnent : préparation
                du dossier, choix du centre, préparation aux tests et suivi du
                renouvellement.
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
