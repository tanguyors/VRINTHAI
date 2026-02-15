"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  AlertTriangle,
  Shield,
  FileText,
  Plane,
  Building2,
  Stethoscope,
  Wallet,
  Baby,
  Briefcase,
  Users,
  Palmtree,
  ClipboardList,
  Search,
  FileCheck,
  CheckCircle,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const whyCards = [
  {
    icon: AlertTriangle,
    title: "Coûts hospitaliers élevés",
    description:
      "Le système privé thaïlandais est performant mais une hospitalisation peut coûter entre 100\u202f000 et 1\u202f000\u202f000 THB. Sans assurance, ces frais sont à votre charge.",
  },
  {
    icon: Shield,
    title: "Accès prioritaire aux soins",
    description:
      "Une assurance vous ouvre les portes des meilleurs hôpitaux internationaux (Bumrungrad, Bangkok Hospital) avec prise en charge directe sans avance de frais.",
  },
  {
    icon: FileText,
    title: "Obligation visa OA/OX",
    description:
      "Depuis 2019, les titulaires de visa retraite OA/OX doivent justifier d\u2019une assurance couvrant 40\u202f000 THB en ambulatoire et 400\u202f000 THB en hospitalisation.",
  },
  {
    icon: Plane,
    title: "Rapatriement médical",
    description:
      "En cas d\u2019urgence grave, le rapatriement vers la France peut coûter 50\u202f000\u20ac à 150\u202f000\u20ac. L\u2019assurance couvre ce risque vital.",
  },
];

const guarantees = [
  {
    icon: Building2,
    title: "Plafond hospitalisation",
    description:
      "Vérifiez un plafond minimum de 2\u202f000\u202f000 THB pour couvrir les interventions chirurgicales et séjours prolongés.",
  },
  {
    icon: Stethoscope,
    title: "Soins ambulatoires",
    description:
      "Consultations, examens, analyses : un plafond de 40\u202f000 THB minimum couvre vos visites médicales courantes.",
  },
  {
    icon: Plane,
    title: "Rapatriement",
    description:
      "Couverture du transport sanitaire vers votre pays d\u2019origine en cas d\u2019urgence ou de traitement indisponible localement.",
  },
  {
    icon: HeartPulse,
    title: "Maladies préexistantes",
    description:
      "Certains assureurs excluent les pathologies connues avant la souscription. Vérifiez les délais de carence et exclusions.",
  },
  {
    icon: Wallet,
    title: "Franchise raisonnable",
    description:
      "Une franchise élevée réduit la prime mais augmente vos dépenses en cas de sinistre. Trouvez le bon équilibre selon votre profil.",
  },
  {
    icon: Baby,
    title: "Options complémentaires",
    description:
      "Maternité, dentaire, optique : ces garanties sont souvent en option. Ajoutez-les selon vos besoins spécifiques.",
  },
];

const profiles = [
  {
    icon: Briefcase,
    title: "Solo / Jeune actif",
    description:
      "Priorité à l\u2019hospitalisation avec un ambulatoire raisonnable. Évitez les options superflues pour optimiser votre prime.",
    budget: "1\u202f500 à 3\u202f000 \u20ac/an",
    points: [
      "Hospitalisation haut plafond",
      "Ambulatoire de base",
      "Franchise modérée",
    ],
    highlight: false,
  },
  {
    icon: Users,
    title: "Couples & Familles",
    description:
      "Équilibre entre qualité de couverture et maîtrise du budget. Pédiatrie, proximité des cliniques avec les écoles, franchise contrôlée.",
    budget: "3\u202f000 à 6\u202f000 \u20ac/an",
    points: [
      "Couverture pédiatrique",
      "Réseau cliniques proches écoles",
      "Franchise ajustable",
    ],
    highlight: true,
  },
  {
    icon: Palmtree,
    title: "Retraités 50+",
    description:
      "Plafonds élevés, réseau hospitalier solide, conditions claires sur les maladies préexistantes. Obligatoire pour visa OA/OX.",
    budget: "4\u202f000 à 10\u202f000 \u20ac/an",
    points: [
      "Plafonds hospitalisation élevés",
      "Réseau hôpitaux internationaux",
      "Conformité visa OA/OX",
    ],
    highlight: false,
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Définir vos besoins",
    description:
      "Identifiez votre profil (solo, famille, retraité), votre durée de séjour, votre type de visa et vos besoins spécifiques (maternité, dentaire, etc.).",
  },
  {
    icon: Search,
    title: "Comparer les devis",
    description:
      "Demandez 3 à 5 devis en ajustant les plafonds, franchises et options. Comparez le rapport couverture/prix et vérifiez les exclusions.",
  },
  {
    icon: FileCheck,
    title: "Vérifier la conformité visa",
    description:
      "Si vous avez un visa OA/OX, assurez-vous que votre contrat respecte les minimums imposés : 40\u202f000 THB ambulatoire et 400\u202f000 THB hospitalisation.",
  },
  {
    icon: CheckCircle,
    title: "Finaliser et conserver",
    description:
      "Souscrivez, téléchargez votre attestation et conservez-la en version numérique et papier. Enregistrez le numéro d\u2019assistance 24h/24.",
  },
];

const faqs = [
  {
    question: "Faut-il une assurance pour tous les types de visa ?",
    answer:
      "Ce n\u2019est pas obligatoire pour tous les visas, mais c\u2019est fortement recommandé. Seuls les visas OA et OX (retraite 50+) exigent une assurance conforme depuis 2019. Pour les autres visas (Tourist, Non-Immigrant B, ED, DTV), l\u2019assurance reste facultative mais une hospitalisation imprévue peut coûter des dizaines de milliers d\u2019euros.",
  },
  {
    question: "Franchise élevée ou faible : que choisir ?",
    answer:
      "Une franchise élevée réduit votre prime annuelle mais augmente vos frais en cas de consultation ou hospitalisation. Si vous consultez rarement, une franchise de 30\u202f000 à 50\u202f000 THB peut être avantageuse. Si vous avez des besoins médicaux réguliers, préférez une franchise basse (5\u202f000 à 10\u202f000 THB) quitte à payer une prime plus élevée.",
  },
  {
    question: "Réseau local ou international ?",
    answer:
      "Si vous restez principalement en Thaïlande, un réseau local (Bangkok Hospital, Bumrungrad, Samitivej) suffit amplement. Si vous voyagez fréquemment en Asie ou en Europe, optez pour une couverture internationale qui vous protège partout. Les assurances internationales sont généralement 20 à 40% plus chères.",
  },
  {
    question: "Peut-on souscrire depuis la Thaïlande ?",
    answer:
      "Oui, la plupart des assureurs internationaux acceptent la souscription en ligne depuis la Thaïlande. Vous recevrez votre attestation par email sous 24 à 48h. Certains assureurs locaux thaïlandais exigent cependant une visite médicale préalable, surtout après 55 ans.",
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

export default function AssuranceSantePage() {
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
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80"
              alt="Hôpital moderne en Thaïlande"
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
                <HeartPulse className="w-4 h-4" />
                <span>Santé &amp; Protection</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
              >
                Assurance Santé
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  Expat Thaïlande
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
              >
                Pourquoi c&apos;est indispensable, quelles garanties vérifier et
                comment souscrire simplement. Guide actualisé 2025.
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Profils couverts
              </span>
              <span className="text-2xl font-black text-[#ffc857]">
                3 profils
              </span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Souscription
              </span>
              <span className="text-2xl font-black text-white italic tracking-tighter">
                en 4 étapes
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#022c31] z-10 pointer-events-none" />
        </section>

        {/* ═══════════════ SECTION 2 — POURQUOI INDISPENSABLE ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&q=80"
            alt="Soins médicaux"
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
                Pourquoi une assurance{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  est indispensable ?
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {whyCards.map((card, i) => {
                const Icon = card.icon;
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

        {/* ═══════════════ SECTION 3 — GARANTIES À VÉRIFIER ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920&q=80"
            alt="Médecine Thaïlande"
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
                Les garanties{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  à vérifier
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {guarantees.map((g, i) => {
                const Icon = g.icon;
                return (
                  <motion.div
                    key={g.title}
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
                        {g.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {g.description}
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

        {/* ═══════════════ SECTION 4 — OFFRES PAR PROFIL ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80"
            alt="Famille en Thaïlande"
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
                Quelle offre{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  pour votre profil ?
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {profiles.map((profile, i) => {
                const Icon = profile.icon;
                return profile.highlight ? (
                  <motion.div
                    key={profile.title}
                    whileHover={{ y: -5, scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-[#ff8c42] to-[#ffc857] shadow-[0_30px_60px_rgba(255,140,66,0.25)] flex flex-col justify-between min-h-[400px]"
                  >
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4 leading-none">
                        {profile.title}
                      </h3>
                      <p className="text-lg text-white font-bold leading-tight max-w-md opacity-90 mb-6">
                        {profile.description}
                      </p>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-black tracking-wider mb-6">
                        {profile.budget}
                      </div>
                      <ul className="space-y-2">
                        {profile.points.map((p) => (
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
                      <Icon className="w-64 h-64 rotate-12" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={profile.title}
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-5 md:p-8 flex flex-col justify-between hover:border-[#ff8c42]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)]"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#ffc857]/20 flex items-center justify-center mb-6 border border-[#ffc857]/30">
                        <Icon className="w-6 h-6 text-[#ffc857]" />
                      </div>
                      <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4">
                        {profile.title}
                      </h3>
                      <p className="text-white/70 font-medium mb-4">
                        {profile.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-[#ffc857] text-sm font-bold tracking-wider mb-6">
                        {profile.budget}
                      </div>
                      <ul className="space-y-2">
                        {profile.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-2 text-white/70 text-sm font-medium"
                          >
                            <Check className="w-4 h-4 text-[#ffc857] flex-shrink-0" />
                            <span>{p}</span>
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

        {/* ═══════════════ SECTION 5 — PROCÉDURE 4 ÉTAPES ═══════════════ */}
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
                Souscrire{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  en 4 étapes
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
                Besoin d&apos;aide{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  pour choisir ?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/80 max-w-xl mx-auto mb-12 font-medium leading-relaxed"
              >
                Nos conseillers locaux vous aident à trouver l&apos;assurance
                adaptée à votre profil et votre budget.
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
                Devis gratuit &bull; Réponse sous 24h &bull; Basé à Bangkok
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
