"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  MoveRight,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Sun,
  Clock,
  CheckCircle2,
  ChevronDown,
  User,
  AtSign,
  Smartphone,
} from "lucide-react";

const contactEmail = ["contact", "vivre-en-thailande.com"].join("@");

const sujetOptions = [
  "Visa & Immigration",
  "Assurance santé",
  "Coût de la vie",
  "Logement",
  "Entreprendre",
  "Retraite",
  "Écoles",
  "Autre",
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] selection:bg-[#cbd5e1] selection:text-[#0f172a] overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-0 md:min-h-[80vh] flex items-center justify-center pt-24 pb-20 md:pb-40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(circle at 20% 30%, #1e293b 0%, transparent 50%), radial-gradient(circle at 80% 10%, #cbd5e1 0%, transparent 40%), radial-gradient(circle at 50% 80%, #cbd5e1 0%, transparent 50%), radial-gradient(circle at 90% 90%, #cbd5e1 0%, transparent 50%)`,
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
              <Compass className="w-4 h-4" />
              <span>Assistance & Contact</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic"
            >
              Parlons de Votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-[#cbd5e1] to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                Projet
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Une question sur l&apos;expatriation ? Notre équipe basée en
              Thaïlande vous accompagne dans toutes vos démarches.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-32 left-10 hidden xl:flex items-center gap-8 z-30">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
              Délai de réponse
            </span>
            <span className="text-2xl font-black text-[#ffc857] flex items-center gap-2">
              Réponse 24h <Clock className="w-5 h-5" />
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
              Accompagnement
            </span>
            <span className="text-2xl font-black text-[#ffc857] italic tracking-tighter">
              Conseiller local
            </span>
          </div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="relative z-20 container mx-auto px-6 -mt-20 mb-16 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* WhatsApp Card - Highlighted in Gold */}
          <motion.a
            href="https://wa.me/66614202619"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="group relative p-5 md:p-8 rounded-xl md:rounded-[2rem] bg-gradient-to-br from-[#ffc857] to-[#ff8c42] shadow-[0_30px_60px_rgba(255,200,87,0.3)] flex flex-col items-start overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">
              Le moyen le plus rapide
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white italic mb-2">
              WhatsApp
            </h3>
            <p className="text-white font-bold text-xl mb-8">
              +66 61 420 2619
            </p>
            <div className="mt-auto flex items-center gap-2 text-white font-black uppercase text-sm tracking-widest group-hover:translate-x-2 transition-transform">
              Ouvrir WhatsApp <MoveRight className="w-5 h-5" />
            </div>
          </motion.a>

          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-5 md:p-8 rounded-xl md:rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-start"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-[#ffc857]" />
            </div>
            <span className="text-white/40 text-sm font-bold uppercase tracking-widest mb-2">
              Demandes détaillées
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white italic mb-2">
              Email
            </h3>
            <p className="text-white font-bold text-xl mb-4">
              {contactEmail}
            </p>
            <span className="text-white/40 text-xs font-bold uppercase tracking-wider mt-auto flex items-center gap-2">
              <Clock className="w-3 h-3" /> Réponse sous 24h
            </span>
          </motion.div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="container mx-auto px-6 py-12 md:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white italic leading-[0.9] tracking-tighter mb-8">
              Envoyez-nous <br />
              <span className="text-[#cbd5e1]">un message</span>
            </h2>
            <p className="text-base md:text-xl text-white/70 mb-12 max-w-md leading-relaxed">
              Décrivez votre projet et nous vous répondrons dans les 24 heures.
              Nos experts sont là pour faciliter votre transition.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full #cbd5e1 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#cbd5e1]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Expertise Locale
                  </h4>
                  <p className="text-white/40">
                    Conseils basés sur une expérience réelle en Thaïlande.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full #cbd5e1 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#cbd5e1]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Accompagnement 360°
                  </h4>
                  <p className="text-white/40">
                    Du visa à l&apos;ouverture de compte bancaire.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-5 md:p-8 lg:p-12 relative shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      required
                      placeholder="Jean"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#cbd5e1] transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      required
                      placeholder="Dupont"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#cbd5e1] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">
                    Email
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      placeholder="jean@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#cbd5e1] transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="tel"
                      placeholder="+33 6 00 00 00 00"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#cbd5e1] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">
                  Sujet de votre demande
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-[#cbd5e1] transition-colors cursor-pointer">
                    {sujetOptions.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-[#0f172a] text-white"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">
                  Votre message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez votre projet ici..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#cbd5e1] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full group relative px-10 py-5 bg-[#cbd5e1] text-[#0f172a] hover:bg-[#ffc857] hover:shadow-[0_25px_60px_rgba(255,200,87,0.4)]  hover:text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(203,213,225,0.3)] flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSubmitted ? "Message envoyé !" : "Envoyer le message"}
                </span>
                {isSubmitted ? (
                  <CheckCircle2 className="relative z-10 w-6 h-6" />
                ) : (
                  <Send className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
              </button>

              <p className="text-center text-white/20 text-[10px] uppercase tracking-widest font-bold">
                Vos données sont confidentielles et ne seront jamais partagées.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-32 relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[#cbd5e1] blur-[150px] rounded-[100%] opacity-10"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white italic tracking-tighter mb-8 leading-none">
              Prêt à franchir <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] to-[#cbd5e1] pr-2">
                le pas ?
              </span>
            </h2>
            <p className="text-base md:text-xl text-white/70 mb-12 max-w-2xl mx-auto font-medium">
              Rejoignez les expatriés qui vivent leur rêve thaïlandais.
              Contactez-nous dès aujourd&apos;hui pour un premier échange
              gratuit.
            </p>

            <motion.a
              href="https://wa.me/66614202619"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 px-8 md:px-12 py-4 md:py-6 bg-white text-[#0f172a] font-black text-base md:text-xl rounded-full transition-all shadow-2xl hover:shadow-white/20"
            >
              <MessageCircle className="w-6 h-6 text-[#cbd5e1] fill-current" />
              Contactez-nous sur WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
