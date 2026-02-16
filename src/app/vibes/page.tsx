"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MoveRight, Map, Sun } from 'lucide-react';

export default function VibesSelection() {
  return (
    <div className="w-full">
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 p-6 text-center">
        <h1 className="text-3xl font-black text-white mb-2">Choix des Couleurs Corporate</h1>
        <p className="text-white/60 font-medium">Scrollez pour voir les 5 palettes — même structure, couleurs différentes</p>
      </div>

      {/* VIBE_1_START */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1e3a8a] selection:bg-[#d4af37] selection:text-white border-y-8 border-[#d4af37]">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-md rounded-full border-2 border-[#d4af37]">
          <span className="text-[#d4af37] font-black text-lg tracking-wider">VIBE 1 — NAVY EXECUTIVE</span>
        </div>

        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(circle at 20% 30%, #172554 0%, transparent 50%), radial-gradient(circle at 80% 10%, #d4af37 0%, transparent 40%), radial-gradient(circle at 50% 80%, #1e40af 0%, transparent 50%), radial-gradient(circle at 90% 90%, #1e3a8a 0%, transparent 50%)`
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[120px] mix-blend-screen opacity-20"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-[#d4af37] text-sm font-bold tracking-widest uppercase"
            >
              <Compass className="w-4 h-4" />
              <span>Votre nouvelle vie commence ici</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic"
            >
              Partir Vivre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fde047] to-[#d4af37] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">en Thaïlande</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Le guide complet pour s'expatrier au pays du sourire. De la paperasse administrative aux meilleurs spots de Koh Samui.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button className="group relative px-10 py-5 bg-[#d4af37] hover:bg-[#b8952e] text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(212,175,55,0.3)] flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Découvrir le guide</span>
                <MoveRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 text-white font-bold text-lg hover:text-[#d4af37] transition-colors group">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-[#d4af37] transition-colors">
                  <Map className="w-5 h-5" />
                </div>
                <span>Voir la carte</span>
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Température Moyenne</span>
            <span className="text-2xl font-black text-[#d4af37] flex items-center gap-2">
              30°C <Sun className="w-5 h-5 fill-current" />
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Vibe</span>
            <span className="text-2xl font-black text-white italic tracking-tighter">Sabai Sabai</span>
          </div>
        </div>
      </section>
      {/* VIBE_1_END */}

      {/* VIBE_2_START */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1e293b] selection:bg-[#0891b2] selection:text-white border-y-8 border-[#0891b2]">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-md rounded-full border-2 border-[#0891b2]">
          <span className="text-[#22d3ee] font-black text-lg tracking-wider">VIBE 2 — CHARCOAL MODERN</span>
        </div>

        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at 20% 30%, #0f172a 0%, transparent 50%), radial-gradient(circle at 80% 10%, #0891b2 0%, transparent 40%), radial-gradient(circle at 50% 80%, #22d3ee 0%, transparent 50%), radial-gradient(circle at 90% 90%, #164e63 0%, transparent 50%)`
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#22d3ee] rounded-full blur-[120px] mix-blend-screen opacity-20"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 text-[#22d3ee] text-sm font-bold tracking-widest uppercase"
            >
              <Compass className="w-4 h-4" />
              <span>Votre nouvelle vie commence ici</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic"
            >
              Partir Vivre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] via-[#22d3ee] to-[#0891b2] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
                en Thaïlande
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Le guide complet pour s'expatrier au pays du sourire. De la paperasse administrative aux meilleurs spots de Koh Samui.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button className="group relative px-10 py-5 bg-[#0891b2] hover:bg-[#0e7490] text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(8,145,178,0.3)] flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Découvrir le guide</span>
                <MoveRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 text-white font-bold text-lg hover:text-[#22d3ee] transition-colors group">
                <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-[#22d3ee] transition-colors">
                  <Map className="w-5 h-5" />
                </div>
                <span>Voir la carte</span>
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Température Moyenne</span>
            <span className="text-2xl font-black text-[#22d3ee] flex items-center gap-2">
              30°C <Sun className="w-5 h-5 fill-current" />
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Vibe</span>
            <span className="text-2xl font-black text-white italic tracking-tighter">Sabai Sabai</span>
          </div>
        </div>
      </section>
      {/* VIBE_2_END */}

      {/* VIBE_3_START */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#064e3b] selection:bg-[#c4a962] selection:text-white border-y-8 border-[#c4a962]">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-md rounded-full border-2 border-[#c4a962]">
          <span className="text-[#c4a962] font-black text-lg tracking-wider">VIBE 3 — DEEP FOREST ELITE</span>
        </div>

        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at 20% 30%, #042f24 0%, transparent 50%), radial-gradient(circle at 80% 10%, #c4a962 0%, transparent 40%), radial-gradient(circle at 50% 80%, #1a3a32 0%, transparent 50%), radial-gradient(circle at 90% 90%, #03221a 0%, transparent 50%)`
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-24 w-[700px] h-[700px] bg-[#c4a962] rounded-full blur-[140px] mix-blend-screen opacity-20"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-[#d4bf8a] rounded-full blur-[120px] mix-blend-screen opacity-20"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-10 text-[#c4a962] text-sm font-bold tracking-widest uppercase shadow-xl"
            >
              <Compass className="w-4 h-4" />
              <span>Votre nouvelle vie commence ici</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic"
            >
              Partir Vivre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a962] via-[#e5d5a8] to-[#c4a962] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
                en Thaïlande
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Le guide complet pour s'expatrier au pays du sourire. De la paperasse administrative aux meilleurs spots de Koh Samui.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button className="group relative px-10 py-5 bg-[#c4a962] hover:bg-[#b39854] text-[#064e3b] font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(196,169,98,0.25)] flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Découvrir le guide</span>
                <MoveRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 text-white font-bold text-lg hover:text-[#c4a962] transition-colors group">
                <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-[#c4a962] transition-colors bg-white/5 backdrop-blur-sm">
                  <Map className="w-5 h-5" />
                </div>
                <span>Voir la carte</span>
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 hidden xl:flex items-center gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Température Moyenne</span>
            <span className="text-2xl font-black text-[#c4a962] flex items-center gap-2">
              30°C <Sun className="w-5 h-5 fill-current" />
            </span>
          </div>
          <div className="w-[1px] h-12 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Vibe</span>
            <span className="text-2xl font-black text-white italic tracking-tighter">Sabai Sabai</span>
          </div>
        </div>
      </section>
      {/* VIBE_3_END */}

      {/* VIBE_4_START */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0f172a] selection:bg-[#cbd5e1] selection:text-[#0f172a] border-y-8 border-[#cbd5e1]">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-md rounded-full border-2 border-[#cbd5e1]">
          <span className="text-[#cbd5e1] font-black text-lg tracking-wider">VIBE 4 — MIDNIGHT PREMIUM</span>
        </div>

        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(circle at 20% 30%, #1e293b 0%, transparent 50%), radial-gradient(circle at 80% 10%, #cbd5e1 0%, transparent 40%), radial-gradient(circle at 50% 80%, #94a3b8 0%, transparent 50%), radial-gradient(circle at 90% 90%, #0f172a 0%, transparent 50%)`
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#cbd5e1] rounded-full blur-[120px] mix-blend-screen opacity-20"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 text-[#cbd5e1] text-sm font-bold tracking-widest uppercase"
            >
              <Compass className="w-4 h-4" />
              <span>Votre nouvelle vie commence ici</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic"
            >
              Partir Vivre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cbd5e1] via-white to-[#cbd5e1] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
                en Thaïlande
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Le guide complet pour s'expatrier au pays du sourire. De la paperasse administrative aux meilleurs spots de Koh Samui.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button className="group relative px-10 py-5 bg-[#cbd5e1] hover:bg-white text-[#0f172a] font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(203,213,225,0.15)] flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Découvrir le guide</span>
                <MoveRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex items-center gap-3 text-white font-bold text-lg hover:text-[#cbd5e1] transition-colors group">
                <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-[#cbd5e1] transition-colors">
                  <Map className="w-5 h-5" />
                </div>
                <span>Voir la carte</span>
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Température Moyenne</span>
            <span className="text-2xl font-black text-[#ffc857] flex items-center gap-2">
              30°C <Sun className="w-5 h-5 fill-current" />
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Vibe</span>
            <span className="text-2xl font-black text-[#ffc857] italic tracking-tighter">Sabai Sabai</span>
          </div>
        </div>
      </section>
      {/* VIBE_4_END */}

      {/* VIBE_5_START */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#334155] selection:bg-[#b45309] selection:text-white border-y-8 border-[#b45309]">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-md rounded-full border-2 border-[#f59e0b]">
          <span className="text-[#f59e0b] font-black text-lg tracking-wider">VIBE 5 — SLATE PROFESSIONAL</span>
        </div>

        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(circle at 20% 30%, #1e293b 0%, transparent 50%), radial-gradient(circle at 80% 10%, #b45309 0%, transparent 40%), radial-gradient(circle at 50% 80%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 90% 90%, #0f172a 0%, transparent 50%)`
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#f59e0b] rounded-full blur-[120px] mix-blend-screen opacity-20"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 text-[#f59e0b] text-sm font-bold tracking-widest uppercase"
            >
              <Compass className="w-4 h-4" />
              <span>Votre nouvelle vie commence ici</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic"
            >
              Partir Vivre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#b45309] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">en Thaïlande</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Le guide complet pour s'expatrier au pays du sourire. De la paperasse administrative aux meilleurs spots de Koh Samui.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button className="group relative px-10 py-5 bg-[#b45309] hover:bg-[#92400e] text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(180,83,9,0.3)] flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Découvrir le guide</span>
                <MoveRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex items-center gap-3 text-white font-bold text-lg hover:text-[#f59e0b] transition-colors group">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-[#f59e0b] transition-colors">
                  <Map className="w-5 h-5" />
                </div>
                <span>Voir la carte</span>
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Température Moyenne</span>
            <span className="text-2xl font-black text-[#f59e0b] flex items-center gap-2">
              30°C <Sun className="w-5 h-5 fill-current" />
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Vibe</span>
            <span className="text-2xl font-black text-white italic tracking-tighter">Sabai Sabai</span>
          </div>
        </div>
      </section>
      {/* VIBE_5_END */}

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
