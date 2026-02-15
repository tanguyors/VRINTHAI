"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Nos services", href: "/#services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  { name: "Visa Thaïlande", href: "/visa-thailande" },
  { name: "Assurance Santé Expat", href: "/assurance-sante" },
  { name: "Logement", href: "/logement" },
  { name: "Permis de Conduire", href: "/permis-conduire" },
  { name: "Permis de Travail", href: "/permis-travail" },
  { name: "Créer une Entreprise", href: "/entreprendre" },
  { name: "École Internationale", href: "/ecoles" },
  { name: "Retraite", href: "/retraite" },
];

export default function Footer() {
  return (
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
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors text-sm font-medium">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[#ffc857] font-bold mb-6">Nos Services</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-white/60 hover:text-white transition-colors text-sm font-medium">{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[#ffc857] font-bold mb-2">Suivez-nous</h4>
            <div className="flex flex-col gap-2">
              <a href="https://wa.me/66614202619" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ff8c42]/50 hover:bg-[#ff8c42]/10 transition-all group">
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
  );
}
