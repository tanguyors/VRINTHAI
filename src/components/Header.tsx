"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Compass,
  Globe,
  HeartPulse,
  Banknote,
  MapPin,
  Briefcase,
  FileText,
  Car,
  GraduationCap,
  Home,
  Palmtree,
  Phone
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Accueil", href: "/" },
  {
    name: "Nos services",
    href: "#",
    dropdown: [
      { name: "Visa Thaïlande", href: "/visa-thailande", icon: FileText },
      { name: "Assurance santé expat", href: "/assurance-sante", icon: HeartPulse },
      { name: "Coût de la vie", href: "/cout-vie", icon: Banknote },
      { name: "Où vivre en Thaïlande", href: "/ou-vivre", icon: MapPin },
      { name: "Entreprendre", href: "/entreprendre", icon: Briefcase },
      { name: "Permis de travail", href: "/permis-travail", icon: Globe },
      { name: "Permis de conduire", href: "/permis-conduire", icon: Car },
      { name: "Écoles internationales", href: "/ecoles", icon: GraduationCap },
      { name: "Logement Thaïlande", href: "/logement", icon: Home },
      { name: "Retraite en Thaïlande", href: "/retraite", icon: Palmtree },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#022c31]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff8c42] to-[#ffc857] flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
              <Compass className="w-6 h-6 text-[#022c31]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black italic text-xl tracking-tighter uppercase">
                Partir Vivre
              </span>
              <span className="text-[#ffc857] text-[10px] font-bold tracking-[0.3em] uppercase">
                en Thaïlande
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors ${
                    activeDropdown === link.name || isScrolled
                      ? "text-white hover:text-[#ffc857]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                  )}
                </Link>

                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-[#0d3b40] border border-white/10 rounded-3xl p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl grid grid-cols-2 gap-2"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#ffc857] group-hover:bg-[#ff8c42] group-hover:text-white transition-colors duration-300">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Conseiller Local</span>
              <span className="text-white font-bold text-sm flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#ffc857]" /> +66 61 420 2619
              </span>
            </div>
            <a href="https://wa.me/66614202619" target="_blank" rel="noopener noreferrer" className="group relative px-6 py-3 bg-[#ff8c42] hover:bg-[#ff7a21] text-white font-black text-sm rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(255,140,66,0.3)] flex items-center gap-2 overflow-hidden">
              <MessageCircle className="w-5 h-5" />
              <span className="relative z-10 uppercase tracking-tight">Contactez-nous</span>
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#022c31] flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <Compass className="w-8 h-8 text-[#ff8c42]" />
                <span className="text-white font-black italic text-xl tracking-tighter uppercase">Menu</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-4">
                  <Link
                    href={link.href}
                    onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                    className="text-2xl font-black text-white italic tracking-tighter block hover:text-[#ffc857] transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="grid grid-cols-1 gap-3 pl-4 border-l-2 border-white/10">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-white/60 font-bold uppercase tracking-widest text-xs hover:text-[#ffc857] transition-colors py-2"
                        >
                          <sub.icon className="w-4 h-4 text-[#ff8c42]" />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-8 bg-[#0d3b40] border-t border-white/10">
              <div className="mb-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#ffc857] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#ffc857]" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">WhatsApp direct</p>
                  <p className="text-white font-bold text-lg">+66 61 420 2619</p>
                </div>
              </div>
              <button className="w-full py-5 bg-[#ff8c42] text-white font-black text-lg rounded-2xl shadow-[0_20px_50px_rgba(255,140,66,0.3)] flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6" />
                Contactez-nous sur WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
