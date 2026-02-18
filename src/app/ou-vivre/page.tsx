"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Building2,
  Mountain,
  Palmtree,
  Waves,
  Sun,
  Anchor,
  TreePine,
  Home,
  HeartPulse,
  GraduationCap,
  Car,
  Wifi,
  CloudSun,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const mainCities = [
  {
    icon: Building2,
    name: "Bangkok",
    description:
      "Capitale dynamique, maximise les services et l\u2019employabilité. Métro/BTS étendu, hôpitaux de référence, large offre d\u2019écoles internationales. Centre coûteux, périphérie compétitive.",
    points: [
      "Hôpitaux de référence",
      "Métro/BTS + ride-hailing",
      "Forte communauté internationale",
    ],
    badge: null,
    highlight: false,
  },
  {
    icon: Mountain,
    name: "Chiang Mai",
    description:
      "Ville verte et calme, elle optimise budget et confort. Excellent rapport qualité/prix, bon réseau de santé privé, hub de digital nomads. Transport : scooter et VTC.",
    points: [
      "Meilleur rapport qualité/prix",
      "Hub digital nomads",
      "Cadre de vie paisible",
    ],
    badge: "Coup de cœur",
    highlight: true,
  },
  {
    icon: Palmtree,
    name: "Phuket",
    description:
      "Cadre balnéaire, accès à l\u2019océan et écoles internationales. Logement plus cher en zone côtière. Bon réseau de santé privé, communauté expat et familles.",
    points: [
      "Accès plage et océan",
      "Écoles internationales",
      "Communauté familles expat",
    ],
    badge: null,
    highlight: false,
  },
];

const alternatives = [
  {
    icon: Waves,
    name: "Pattaya / Chonburi",
    description:
      "Proximité côtière à 1h30 de Bangkok. Accès aux infrastructures de la capitale tout en profitant du bord de mer. Immobilier abordable, communauté expat établie.",
  },
  {
    icon: Sun,
    name: "Hua Hin",
    description:
      "Station balnéaire familiale prisée des retraités. Ambiance calme et résidentielle, bons hôpitaux, à 3h de Bangkok. Moins d\u2019écoles internationales que Bangkok.",
  },
  {
    icon: Anchor,
    name: "Koh Samui",
    description:
      "Île au rythme plus lent, idéale pour les amoureux de la nature. Bon réseau de santé pour une île. Logement variable selon la saison et la zone.",
  },
  {
    icon: TreePine,
    name: "Koh Phangan",
    description:
      "Ambiance communautaire, yoga et bien-être. Budget très compétitif hors haute saison. Infrastructures plus limitées, ferry obligatoire.",
  },
];

const criteria = [
  {
    icon: Home,
    title: "Logement",
    description:
      "Le premier poste de dépense. Vérifiez le quartier, la proximité des transports, le standing et le prix avant de signer un bail longue durée.",
  },
  {
    icon: HeartPulse,
    title: "Santé",
    description:
      "Accès aux hôpitaux privés internationaux. Bangkok et Chiang Mai offrent les meilleurs réseaux. Sur les îles, les soins complexes nécessitent un transfert.",
  },
  {
    icon: GraduationCap,
    title: "Éducation",
    description:
      "Pour les familles : offre d\u2019écoles internationales (British, American, IB). Bangkok domine, Phuket a une bonne offre. Chiang Mai plus limité.",
  },
  {
    icon: Car,
    title: "Mobilité",
    description:
      "BTS/MRT à Bangkok, scooter à Chiang Mai, voiture à Phuket. Le choix du transport conditionne le quartier et le budget.",
  },
  {
    icon: Wifi,
    title: "Internet",
    description:
      "Fibre optique disponible dans les grandes villes (100–300 Mbps). Essentiel pour les freelances et digital nomads. Testez la connexion avant de signer.",
  },
  {
    icon: CloudSun,
    title: "Climat & Saison",
    description:
      "Saison des pluies (mai–octobre) variable selon les régions. Chiang Mai : frais en hiver. Phuket : mousson marquée. Bangkok : chaud et humide toute l\u2019année.",
  },
];

const neighborhoods = [
  {
    icon: Building2,
    city: "Bangkok",
    areas: [
      "Sukhumvit (On Nut, Ekkamai) — Expats, familles",
      "Ari / Phahon Yothin — Branché, cafés",
      "Ratchada — Budget, métro",
      "Sathorn / Silom — Business, central",
    ],
  },
  {
    icon: Mountain,
    city: "Chiang Mai",
    areas: [
      "Nimmanhaemin — Cafés, coworking",
      "Santitham — Calme, locaux",
      "Hang Dong — Familles, maisons",
      "Old City — Culture, tourisme",
    ],
  },
  {
    icon: Palmtree,
    city: "Phuket",
    areas: [
      "Chalong — Familles, écoles",
      "Kathu — Central, abordable",
      "Thalang — Nature, maisons",
      "Rawai — Expats, plage calme",
    ],
  },
];

const faqs = [
  {
    question: "Faut-il visiter avant de s\u2019installer ?",
    answer:
      "Oui, fortement recommandé. Planifiez un repérage de 2–3 semaines pour tester les trajets réels, le niveau de bruit, la qualité d\u2019internet et la proximité des services. Évitez un bail d\u2019un an sans avoir testé le quartier.",
  },
  {
    question: "Quelle est la meilleure ville pour les digital nomads ?",
    answer:
      "Chiang Mai est le choix numéro 1 : coût de vie bas, nombreux espaces de coworking, fibre rapide, communauté internationale active. Bangkok convient aussi avec plus de diversité mais un budget plus élevé. Le visa DTV facilite le séjour.",
  },
  {
    question: "Peut-on changer de ville facilement ?",
    answer:
      "Oui. Les baux courts (3–6 mois) sont courants en Thaïlande. Beaucoup d\u2019expats testent 2–3 villes avant de se fixer. Un hébergement temporaire (Airbnb, serviced apartment) permet de s\u2019adapter sans engagement.",
  },
  {
    question: "Le climat est-il un critère important ?",
    answer:
      "Absolument. Bangkok est chaud et humide toute l\u2019année (30–35\u202f°C). Chiang Mai offre un hiver frais (15–20\u202f°C en décembre–février). Phuket a une mousson marquée de mai à octobre. Le sud-est (Koh Samui) a un calendrier décalé.",
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

export default function OuVivrePage() {
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
              src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=60"
              alt="Paysage Thaïlande"
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
                <MapPin className="w-4 h-4" />
                <span>Destination &amp; Cadre de vie</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic"
              >
                Où Vivre
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
                Bangkok, Chiang Mai, Phuket ou ailleurs ? Comparatif par ville,
                par profil et par critère pour trouver votre point de chute.
                Guide actualisé 2025.
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8 z-20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Villes analysées
              </span>
              <span className="text-2xl font-black text-[#ffc857]">
                6 destinations
              </span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                Profils détaillés
              </span>
              <span className="text-2xl font-black text-[#ffc857] italic tracking-tighter">
                3 profils
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0f172a] z-10 pointer-events-none" />
        </section>

        {/* ═══════════════ SECTION 2 — LES 3 GRANDES VILLES ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=60"
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
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
                Les 3 villes{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  incontournables
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {mainCities.map((city, i) => {
                const Icon = city.icon;
                return city.highlight ? (
                  <motion.div
                    key={city.name}
                    whileHover={{ y: -5, scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group relative overflow-hidden rounded-[2.5rem] p-5 md:p-8 bg-gradient-to-br from-[#ffc857] to-[#ff8c42] shadow-[0_30px_60px_rgba(255,200,87,0.35)] hover:shadow-[0_35px_70px_rgba(255,200,87,0.5)] transition-all duration-300 flex flex-col justify-between"
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
                      <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-4 leading-none">
                        {city.name}
                      </h3>
                      <p className="text-white font-bold leading-tight opacity-90 mb-6">
                        {city.description}
                      </p>
                      <ul className="space-y-2">
                        {city.points.map((p) => (
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
                    className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-5 md:p-8 hover:border-[#ffc857]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)] overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4 group-hover:text-[#ffc857] transition-colors duration-300">
                        {city.name}
                      </h3>
                      <p className="text-white/70 font-medium mb-6">
                        {city.description}
                      </p>
                      <ul className="space-y-2">
                        {city.points.map((p) => (
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

        {/* ═══════════════ SECTION 3 — ALTERNATIVES ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=60"
            alt="Plage Thaïlande"
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
                Les alternatives{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  à explorer
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {alternatives.map((alt, i) => {
                const Icon = alt.icon;
                return (
                  <motion.div
                    key={alt.name}
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
                        {alt.name}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {alt.description}
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

        {/* ═══════════════ SECTION 4 — CRITÈRES DE CHOIX ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=60"
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
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter italic">
                Les critères{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
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
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] p-5 md:p-8 hover:border-[#ffc857]/40 transition-all duration-500 group overflow-hidden hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)]"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">
                        {item.description}
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

        {/* ═══════════════ SECTION 5 — QUARTIERS RECOMMANDÉS ═══════════════ */}
        <section className="relative w-full min-h-0 md:min-h-screen flex items-center overflow-hidden py-12 md:py-24">
          <SectionBackground
            src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=60"
            alt="Quartiers Bangkok"
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
                Les quartiers{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  recommandés
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {neighborhoods.map((hood, i) => {
                const Icon = hood.icon;
                return (
                  <motion.div
                    key={hood.city}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-5 md:p-8 hover:border-[#ffc857]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,200,87,0.15)] overflow-hidden"
                  >
                    <div className="absolute -inset-24 bg-[#ffc857] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#cbd5e1] to-[#cbd5e1] group-hover:from-[#ffc857] group-hover:to-[#ffc857] flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-[#ffc857]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-white italic tracking-tighter mb-6 group-hover:text-[#ffc857] transition-colors duration-300">
                        {hood.city}
                      </h3>
                      <ul className="space-y-3">
                        {hood.areas.map((area) => (
                          <li
                            key={area}
                            className="flex items-start gap-3 text-white/70 font-medium"
                          >
                            <MapPin className="w-4 h-4 text-[#cbd5e1] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{area}</span>
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
                Besoin d&apos;aide{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
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
                Nos conseillers basés à Bangkok vous aident à identifier la
                ville et le quartier adaptés à votre profil, votre budget et
                votre style de vie.
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
                Conseil gratuit &bull; Réponse sous 24h &bull; Basé à Bangkok
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
