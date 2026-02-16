# Design System — Partir Vivre en Thaïlande

## Vibe: Midnight Premium (Vibe 4)

### Reference Code

```tsx
{/* VIBE_4_START */}
<section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0f172a] selection:bg-[#cbd5e1] selection:text-[#0f172a]">
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
      <span className="text-2xl font-black text-[#cbd5e1] flex items-center gap-2">
        30°C <Sun className="w-5 h-5 fill-current" />
      </span>
    </div>
    <div className="w-[1px] h-10 bg-white/10" />
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Vibe</span>
      <span className="text-2xl font-black text-white italic tracking-tighter">Sabai Sabai</span>
    </div>
  </div>

  <style jsx global>{`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>
</section>
{/* VIBE_4_END */}
```

### Color Palette

**Base State:**
- **Background Primary:** `#0f172a` (Midnight Blue)
- **Background Secondary:** `#1e293b` (Slate Dark)
- **Accent Primary:** `#cbd5e1` (Silver)
- **Text Primary:** `#ffffff` (White)
- **Text Secondary:** `rgba(255, 255, 255, 0.70)` (White 70%)
- **Text Muted:** `rgba(255, 255, 255, 0.30)` (White 30%)
- **Button Text on Silver:** `#0f172a` (Midnight Blue)

**Hover State:**
- **Accent Hover:** `#ffc857` (Golden Yellow)
- **Accent Hover Secondary:** `#ff8c42` (Warm Orange)
- **Button Text on Gold:** `#ffffff` (White)

### Typography
- **Headings:** Font-black, italic, tracking-tighter, leading-[0.9]
- **Body:** Font-medium, leading-relaxed
- **Labels/Badges:** Font-bold, uppercase, tracking-widest, text-sm
- **Small Text:** text-[10px], uppercase, tracking-[0.3em]

### Design Patterns
- **Backgrounds:** Mesh gradients with radial-gradient, blurred glow orbs, mix-blend-screen
- **Cards/Badges:** `bg-white/5 backdrop-blur-md border border-white/10` (glassmorphism)
- **Buttons Primary:** `bg-[#cbd5e1] text-[#0f172a] hover:bg-[#ffc857] hover:text-white rounded-2xl shadow-[0_20px_50px_rgba(203,213,225,0.2)] hover:shadow-[0_25px_60px_rgba(255,200,87,0.4)]` with scale hover effects
- **Buttons Secondary:** Transparent with border, icon + text, `hover:border-[#ffc857] hover:bg-[#ffc857]/10`
- **Animations:** Framer Motion fade-up entries, gradient text animation, scale hover transitions
- **Selection:** `selection:bg-[#cbd5e1] selection:text-[#0f172a]`

### Dependencies
- `framer-motion` — animations
- `lucide-react` — icons
- `tailwindcss` — styling

### Scale
- **Balanced** (standard sizing)
