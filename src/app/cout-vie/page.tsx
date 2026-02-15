"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Banknote,
  Home,
  ShoppingCart,
  Car,
  Wifi,
  Zap,
  UtensilsCrossed,
  Building2,
  Mountain,
  Palmtree,
  User,
  Users,
  Baby,
  Search,
  ShoppingBag,
  Calendar,
  PiggyBank,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const cities = [
  {
    icon: Building2,
    name: "Bangkok",
    badge: null,
    expenses: [
      { label: "Loyer T2 (hors centre)", range: "500 – 900 €" },
      { label: "Courses alimentaires", range: "200 – 300 €" },
      { label: "Transport", range: "20 – 40 €" },
      { label: "Internet fibre", range: "10 – 20 €" },
      { label: "Énergie + eau", range: "60 – 110 €" },
    ],
    total: "790 – 1 370 €/mois",
    highlight: false,
  },
  {
    icon: Mountain,
    name: "Chiang Mai",
    badge: "Moins cher",
    expenses: [
      { label: "Loyer T2 (hors centre)", range: "350 – 600 €" },
      { label: "Courses alimentaires", range: "180 – 250 €" },
      { label: "Transport", range: "15 – 25 €" },
      { label: "Internet fibre", range: "10 – 15 €" },
      { label: "Énergie + eau", range: "50 – 90 €" },
    ],
    total: "605 – 980 €/mois",
    highlight: true,
  },
  {
    icon: Palmtree,
    name: "Phuket",
    badge: null,
    expenses: [
      { label: "Loyer T2 (hors centre)", range: "600 – 1 100 €" },
      { label: "Courses alimentaires", range: "220 – 320 €" },
      { label: "Transport", range: "25 – 45 €" },
      { label: "Internet fibre", range: "10 – 20 €" },
      { label: "Énergie + eau", range: "70 – 120 €" },
    ],
    total: "925 – 1 605 €/mois",
    highlight: false,
  },
];

const expensePosts = [
  {
    icon: Home,
    title: "Loyer",
    description:
      "Le logement représente 45\u202f% du budget. Un T2 correct hors centre coûte 350 à 900\u202f€ selon la ville. En centre-ville, comptez 30 à 50\u202f% de plus.",
  },
  {
    icon: ShoppingCart,
    title: "Courses alimentaires",
    description:
      "Marchés locaux (50–100\u202f€/mois) vs supermarchés internationaux (200–300\u202f€). Mélanger les deux permet un bon équilibre qualité/prix.",
  },
  {
    icon: Car,
    title: "Transport",
    description:
      "Le BTS/MRT à Bangkok coûte 15–40\u202f€/mois. À Chiang Mai, un scooter revient à 80–100\u202f€/mois (location). Grab/Bolt : 2–5\u202f€ par trajet.",
  },
  {
    icon: Wifi,
    title: "Internet & Mobile",
    description:
      "Fibre optique 100 Mbps : 10–20\u202f€/mois. Forfait mobile 4G/5G illimité : 8–15\u202f€/mois. Parmi les meilleurs rapports qualité/prix d\u2019Asie.",
  },
  {
    icon: Zap,
    title: "Énergie & Eau",
    description:
      "Électricité : 50–100\u202f€/mois (la climatisation représente 60–70\u202f% de la facture). Eau : 5–10\u202f€/mois. Gaz : rare, plaques électriques standard.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Sorties",
    description:
      "Street food : 1–2\u202f€/plat. Restaurant local : 3–5\u202f€. Restaurant international : 15–30\u202f€. Une bière locale : 1,50–3\u202f€.",
  },
];

const profiles = [
  {
    icon: User,
    title: "Solo / Digital Nomad",
    budget: "800 à 1\u202f500 €/mois",
    description:
      "Rythme mixte local/international. Studio ou coliving, street food + resto occasionnel, scooter ou transports en commun.",
    points: [
      "Loyer studio : 300–600\u202f€",
      "Alimentation mixte : 150–250\u202f€",
      "Transport : 20–50\u202f€",
    ],
    highlight: false,
  },
  {
    icon: Users,
    title: "Couple",
    budget: "1\u202f200 à 2\u202f200 €/mois",
    description:
      "Le logement est le poste principal. Transport minimal grâce au métro et VTC. Possibilité de bel appartement T2 bien situé.",
    points: [
      "Loyer T2 : 500–900\u202f€",
      "Courses à deux : 250–400\u202f€",
      "Loisirs : 150–300\u202f€",
    ],
    highlight: true,
  },
  {
    icon: Baby,
    title: "Famille (2 enfants)",
    budget: "2\u202f500 à 5\u202f000 €/mois",
    description:
      "La scolarité internationale impacte fortement le budget : 500 à 1\u202f500\u202f€/enfant/mois. Le reste du coût de vie reste compétitif.",
    points: [
      "Scolarité : 1\u202f000–3\u202f000\u202f€",
      "Loyer maison : 800–1\u202f500\u202f€",
      "Alimentation : 400–600\u202f€",
    ],
    highlight: false,
  },
  {
    icon: Palmtree,
    title: "Retraité 50+",
    budget: "1\u202f000 à 2\u202f500 €/mois",
    description:
      "Confort prioritaire : climatisation, check-ups réguliers, loisirs. Chiang Mai et Hua Hin très compétitifs hors haute saison.",
    points: [
      "Loyer confort : 400–800\u202f€",
      "Santé + assurance : 200–500\u202f€",
      "Loisirs : 150–400\u202f€",
    ],
    highlight: false,
  },
];

const tips = [
  {
    icon: Search,
    title: "Comparer les quartiers",
    description:
      "Les prix varient de 30 à 50\u202f% entre le centre-ville et la périphérie. À Bangkok, Sukhumvit est 2x plus cher qu\u2019On Nut ou Bang Na.",
  },
  {
    icon: ShoppingBag,
    title: "Mixer local et international",
    description:
      "Faites vos courses au marché pour les fruits, légumes et viandes (50\u202f% moins cher). Réservez le supermarché pour les produits importés.",
  },
  {
    icon: Calendar,
    title: "Négocier les baux longs",
    description:
      "Un bail de 12 mois permet souvent une réduction de 10–20\u202f% sur le loyer. Payez 2–3 mois d\u2019avance pour un meilleur prix.",
  },
  {
    icon: PiggyBank,
    title: "Prévoir une marge de 10–15\u202f%",
    description:
      "Prévoyez 10–15\u202f% de marge pour l\u2019installation initiale (meubles, dépôts, procédures) et les imprévus (santé, réparations).",
  },
];

const faqs = [
  {
    question: "Peut-on vivre avec 800\u202f€/mois en Thaïlande ?",
    answer:
      "Oui, c\u2019est possible en solo à Chiang Mai ou dans les villes secondaires avec un mode de vie local : studio simple (250–400\u202f€), street food quotidienne, scooter. À Bangkok ou Phuket, prévoyez plutôt 1\u202f000–1\u202f200\u202f€ minimum pour un confort correct.",
  },
  {
    question: "Le coût de la vie augmente-t-il chaque année ?",
    answer:
      "L\u2019inflation en Thaïlande reste modérée (2–3\u202f%/an en moyenne). Cependant, les loyers dans les zones prisées par les expats (Sukhumvit, Nimman) augmentent plus vite (5–8\u202f%/an). Les prix alimentaires locaux restent très stables.",
  },
  {
    question: "Faut-il un compte bancaire thaïlandais ?",
    answer:
      "Ce n\u2019est pas obligatoire mais fortement recommandé. Un compte local évite les frais de change (3–5\u202f% par retrait international). Les banques Bangkok Bank et Kasikorn acceptent les expats avec un visa Non-Immigrant. Comptez 30 min en agence avec passeport et justificatif de domicile.",
  },
  {
    question: "Quelle ville est la moins chère pour les expats ?",
    answer:
      "Chiang Mai reste la ville la plus abordable parmi les grandes villes : loyers 30–40\u202f% moins chers qu\u2019à Bangkok, restaurants locaux à 1–2\u202f€. Hua Hin et Udon Thani sont encore moins chers mais avec moins d\u2019infrastructures internationales.",
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

export default function CoutViePage() {
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
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1920&q=80"
              alt="Marché thaïlandais"
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
                <Banknote className="w-4 h-4" />
                <span>Budget &amp; Expatriation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
              >
                Coût de la Vie
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
                Combien faut-il prévoir par mois ? Comparatif par ville, par
                profil et par poste de dépense. Guide actualisé 2025.
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Villes comparées
              </span>
              <span className="text-2xl font-black text-[#ffc857]">
                3 villes
              </span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Profils détaillés
              </span>
              <span className="text-2xl font-black text-white italic tracking-tighter">
                4 profils
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#022c31] z-10 pointer-events-none" />
        </section>

        {/* ═══════════════ SECTION 2 — COMPARATIF PAR VILLE ═══════════════ */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1920&q=80"
            alt="Skyline Bangkok"
          />

          <div className="relative z-10 container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
                Combien ça coûte{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  par ville ?
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cities.map((city, i) => {
                const Icon = city.icon;
                return city.highlight ? (
                  <motion.div
                    key={city.name}
                    whileHover={{ y: -5, scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group relative overflow-hidden rounded-[2.5rem] p-8 bg-gradient-to-br from-[#ff8c42] to-[#ffc857] shadow-[0_30px_60px_rgba(255,140,66,0.25)] flex flex-col justify-between"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        {city.badge && (
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-black uppercase tracking-wider">
                            {city.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-6 leading-none">
                        {city.name}
                      </h3>
                      <div className="space-y-3 mb-6">
                        {city.expenses.map((exp) => (
                          <div
                            key={exp.label}
                            className="flex items-center justify-between"
                          >
                            <span className="text-white/90 text-sm font-medium">
                              {exp.label}
                            </span>
                            <span className="text-white text-sm font-bold">
                              {exp.range}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-white/30">
                        <div className="flex items-center justify-between">
                          <span className="text-white/90 font-bold">Total estimé</span>
                          <span className="text-xl font-black text-white">
                            {city.total}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Icon className="w-48 h-48 rotate-12" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={city.name}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 hover:border-[#ff8c42]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)] overflow-hidden"
                  >
                    <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ff8c42]/20">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-white italic tracking-tighter mb-6 group-hover:text-[#ffc857] transition-colors duration-300">
                        {city.name}
                      </h3>
                      <div className="space-y-3 mb-6">
                        {city.expenses.map((exp) => (
                          <div
                            key={exp.label}
                            className="flex items-center justify-between"
                          >
                            <span className="text-white/60 text-sm font-medium">
                              {exp.label}
                            </span>
                            <span className="text-white/90 text-sm font-bold">
                              {exp.range}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 font-bold">Total estimé</span>
                          <span className="text-xl font-black text-[#ffc857]">
                            {city.total}
                          </span>
                        </div>
                      </div>
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

        {/* ═══════════════ SECTION 3 — POSTES DE DÉPENSE ═══════════════ */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&q=80"
            alt="Vie quotidienne Thaïlande"
          />

          <div className="relative z-10 container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
                Les postes{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  de dépense
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {expensePosts.map((post, i) => {
                const Icon = post.icon;
                return (
                  <motion.div
                    key={post.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:border-[#ff8c42]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ff8c42]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {post.description}
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

        {/* ═══════════════ SECTION 4 — BUDGET PAR PROFIL ═══════════════ */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80"
            alt="Vie en Thaïlande"
          />

          <div className="relative z-10 container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
                Quel budget{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  pour votre profil ?
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
                    className="group relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-[#ff8c42] to-[#ffc857] shadow-[0_30px_60px_rgba(255,140,66,0.25)] flex flex-col justify-between"
                  >
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/30">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-3 leading-none">
                        {profile.title}
                      </h3>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-black tracking-wider mb-4">
                        {profile.budget}
                      </div>
                      <p className="text-white font-bold leading-tight opacity-90 mb-6">
                        {profile.description}
                      </p>
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
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Icon className="w-48 h-48 rotate-12" />
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
                    className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-[#ff8c42]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)] overflow-hidden"
                  >
                    <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-[#ffc857]/20 flex items-center justify-center mb-6 border border-[#ffc857]/30">
                        <Icon className="w-6 h-6 text-[#ffc857]" />
                      </div>
                      <h3 className="text-2xl font-black text-white italic tracking-tighter mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {profile.title}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-[#ffc857] text-sm font-bold tracking-wider mb-4">
                        {profile.budget}
                      </div>
                      <p className="text-white/70 font-medium mb-4">
                        {profile.description}
                      </p>
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

        {/* ═══════════════ SECTION 5 — CONSEILS OPTIMISATION ═══════════════ */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=80"
            alt="Paysage Thaïlande"
          />

          <div className="relative z-10 container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
                Optimiser{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  votre budget
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
                {tips.map((tip, i) => {
                  const Icon = tip.icon;
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={tip.title}
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
                              Conseil 0{i + 1}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tight leading-tight mb-4">
                            {tip.title}
                          </h3>
                          <p className="text-white/40 text-sm leading-relaxed font-medium">
                            {tip.description}
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
                              Conseil 0{i + 1}
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-white italic tracking-tight mb-3">
                            {tip.title}
                          </h3>
                          <p className="text-white/40 text-sm font-medium leading-relaxed">
                            {tip.description}
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
        <section className="relative w-full min-h-screen flex items-center overflow-hidden py-24">
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
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
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
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
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
                className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter italic mb-8"
              >
                Besoin d&apos;un{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  budget personnalisé ?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/80 max-w-xl mx-auto mb-12 font-medium leading-relaxed"
              >
                Nos conseillers basés à Bangkok vous aident à estimer votre
                budget selon votre profil, votre ville et votre style de vie.
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
                Estimation gratuite &bull; Réponse sous 24h &bull; Basé à
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
