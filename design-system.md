# Design System — Partir Vivre en Thaïlande

## Vibe: Bold Tropical Startup

### Reference Code

```tsx
{/* VIBE_2_START */}
<section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#022c31] selection:bg-[#ff8c42] selection:text-white">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 opacity-60" style={{
      background: `radial-gradient(circle at 20% 30%, #0d3b40 0%, transparent 50%), radial-gradient(circle at 80% 10%, #ff8c42 0%, transparent 40%), radial-gradient(circle at 50% 80%, #ffc857 0%, transparent 50%), radial-gradient(circle at 90% 90%, #064e3b 0%, transparent 50%)`
    }} />
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#ffc857] rounded-full blur-[120px] mix-blend-screen opacity-30" />
  </div>

  <div className="relative z-10 container mx-auto px-6">
    <div className="max-w-5xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-[#ffc857] text-sm font-bold tracking-widest uppercase">
        <Compass className="w-4 h-4" />
        <span>Votre nouvelle vie commence ici</span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic">
        Partir Vivre <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffc857] to-[#ff8c42] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">en Thaïlande</span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
        Le guide complet pour s'expatrier au pays du sourire. De la paperasse administrative aux meilleurs spots de Koh Samui.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button className="group relative px-10 py-5 bg-[#ff8c42] hover:bg-[#ff7a21] text-white font-black text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,140,66,0.3)] flex items-center gap-3 overflow-hidden">
          <span className="relative z-10">Découvrir le guide</span>
          <MoveRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="flex items-center gap-3 text-white font-bold text-lg hover:text-[#ffc857] transition-colors group">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-[#ffc857] transition-colors"><Map className="w-5 h-5" /></div>
          <span>Voir la carte</span>
        </button>
      </motion.div>
    </div>
  </div>

  <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-8">
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Température Moyenne</span>
      <span className="text-2xl font-black text-[#ffc857] flex items-center gap-2">30°C <Sun className="w-5 h-5 fill-current" /></span>
    </div>
    <div className="w-[1px] h-10 bg-white/10" />
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Vibe</span>
      <span className="text-2xl font-black text-white italic tracking-tighter">Sabai Sabai</span>
    </div>
  </div>

  <style jsx global>{`
    @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  `}</style>
</section>
{/* VIBE_2_END */}
```

### Color Palette
- **Background Primary:** `#022c31` (Deep Teal)
- **Background Secondary:** `#0d3b40` (Dark Teal)
- **Accent Primary:** `#ff8c42` (Warm Orange)
- **Accent Secondary:** `#ffc857` (Golden Yellow)
- **Accent Tertiary:** `#064e3b` (Deep Emerald)
- **Text Primary:** `#ffffff` (White)
- **Text Secondary:** `rgba(255, 255, 255, 0.8)` (White 80%)
- **Text Muted:** `rgba(255, 255, 255, 0.4)` (White 40%)

### Typography
- **Headings:** Font-black, italic, tracking-tighter, leading-[0.9]
- **Body:** Font-medium, leading-relaxed
- **Labels/Badges:** Font-bold, uppercase, tracking-widest, text-sm
- **Small Text:** text-[10px], uppercase, tracking-[0.3em]

### Design Patterns
- **Backgrounds:** Mesh gradients with radial-gradient, blurred glow orbs, mix-blend-screen
- **Cards/Badges:** `bg-white/10 backdrop-blur-md border border-white/20` (glassmorphism)
- **Buttons Primary:** `bg-[#ff8c42] hover:bg-[#ff7a21] rounded-2xl shadow-[0_20px_50px_rgba(255,140,66,0.3)]` with scale hover effects
- **Buttons Secondary:** Transparent with border, icon + text
- **Animations:** Framer Motion fade-up entries, gradient text animation, scale hover transitions
- **Selection:** `selection:bg-[#ff8c42] selection:text-white`

### Dependencies
- `framer-motion` — animations
- `lucide-react` — icons
- `tailwindcss` — styling

### Scale
- **Balanced** (standard sizing)
