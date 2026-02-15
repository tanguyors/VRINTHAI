"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Calendar } from "lucide-react";
import { articles, categories, categoryColors } from "@/data/articles";

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredArticles =
    activeCategory === "Tous"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#022c31] text-white selection:bg-[#ff8c42] selection:text-white font-sans">
      <main>

        {/* ═══════════════ HERO (COMPACT) ═══════════════ */}
        <section className="relative w-full pt-24 md:pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 20% 30%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 80% 10%, #ff8c42 0%, transparent 40%), radial-gradient(circle at 50% 80%, #ffc857 0%, transparent 50%), radial-gradient(circle at 90% 90%, #064e3b 0%, transparent 50%)`,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#ff8c42] rounded-full blur-[120px] mix-blend-screen opacity-20"
            />
          </div>

          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-[#ffc857] text-sm font-bold tracking-widest uppercase"
              >
                <BookOpen className="w-4 h-4" />
                <span>Blog &amp; Ressources</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-6 italic"
              >
                Le Blog{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] pr-2">
                  Expatriation
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed"
              >
                Guides pratiques, conseils culturels, démarches administratives
                et retours d&apos;expérience pour réussir votre installation en
                Thaïlande.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ═══════════════ FILTRES CATÉGORIES ═══════════════ */}
        <section className="relative z-10 container mx-auto px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#ff8c42] text-white shadow-[0_10px_30px_rgba(255,140,66,0.3)]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════ GRILLE D'ARTICLES ═══════════════ */}
        <section className="relative z-10 container mx-auto px-6 pb-12 md:pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {filteredArticles.map((article, i) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[2rem] overflow-hidden hover:border-[#ff8c42]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,140,66,0.15)] cursor-pointer"
                >
                  <div className="absolute -inset-24 bg-[#ff8c42] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500 rounded-full" />

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#022c31] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-black text-white uppercase tracking-wider ${
                          categoryColors[article.category] || "bg-white/20"
                        }`}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6">
                    <h2 className="text-lg font-black text-white italic tracking-tight leading-tight mb-3 group-hover:text-[#ffc857] transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="text-white/60 text-sm font-medium leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/40 text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime} de lecture
                      </span>
                    </div>
                    <div className="mt-4 w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-0 group-hover:w-full h-full bg-[#ff8c42] transition-all duration-500 ease-out" />
                    </div>
                  </div>
                </motion.article>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg font-medium">
                Aucun article dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
