"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Compass, MoveRight } from "lucide-react";
import type { Article } from "@/data/articles";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Guides Pratiques": return "bg-blue-500/80";
    case "Culture & Lifestyle": return "bg-purple-500/80";
    case "Légal & Admin": return "bg-amber-500/80";
    case "Santé & Bien-être": return "bg-emerald-500/80";
    case "Digital Nomad": return "bg-cyan-500/80";
    default: return "bg-white/10";
  }
};

export default function BlogArticle({
  article,
  relatedArticles,
}: {
  article: Article;
  relatedArticles: Article[];
}) {
  return (
    <div className="min-h-screen bg-[#022c31] text-white selection:bg-[#ff8c42] selection:text-white font-medium">
      {/* Navigation Overlay */}
      <div className="fixed top-24 left-6 z-40">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-widest uppercase">Retour au blog</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c31] via-[#022c31]/60 to-transparent" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at 20% 30%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 80% 10%, #ff8c42 0%, transparent 40%)`,
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 pb-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 mb-6 text-white text-sm font-bold tracking-widest uppercase backdrop-blur-md ${getCategoryColor(article.category)}`}
            >
              <Compass className="w-4 h-4" />
              <span>{article.category}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic"
            >
              {article.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-8 text-white/60 text-sm font-bold tracking-widest uppercase"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ffc857]" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ffc857]" />
                <span>Temps de lecture : {article.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative w-full py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-[#ff8c42] rounded-full blur-[160px] opacity-[0.07] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffc857] rounded-full blur-[160px] opacity-[0.05] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-[#ffc857] font-medium leading-relaxed mb-16 italic border-l-4 border-[#ff8c42] pl-8"
            >
              {article.excerpt}
            </motion.p>

            <div className="space-y-16">
              {article.content.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group"
                >
                  <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter mb-6 text-white">
                    {section.heading}
                  </h2>
                  <div className="space-y-5 text-lg text-white/80 leading-relaxed font-medium">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="w-full py-24 bg-[#0d3b40]/50 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-4">
                  Poursuivez{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
                    votre voyage
                  </span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="group flex items-center gap-3 text-[#ff8c42] font-black text-sm uppercase tracking-widest"
              >
                Voir tout le blog
                <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel, idx) => (
                <Link key={idx} href={`/blog/${rel.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden hover:border-[#ff8c42]/40 transition-all duration-500"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#022c31] via-transparent to-transparent opacity-60" />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-black text-white uppercase tracking-wider ${getCategoryColor(rel.category)}`}
                        >
                          {rel.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-black italic tracking-tight text-white mb-3 leading-tight group-hover:text-[#ffc857] transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
                        {rel.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-4 text-white/40 text-xs font-bold">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {rel.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {rel.readTime}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
