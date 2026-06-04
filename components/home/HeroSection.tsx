'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, FileText, Wrench, LayoutTemplate } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const STATS = [
  { icon: Users, value: '+10.000', label: 'Leitores' },
  { icon: FileText, value: '+500', label: 'Artigos' },
  { icon: Wrench, value: '+100', label: 'Ferramentas' },
  { icon: LayoutTemplate, value: '+50', label: 'Templates' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-accent/6 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/4 rounded-full blur-3xl" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
              <Badge variant="accent" className="mb-6">
                <Sparkles size={11} />
                Plataforma de IA & Automação
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="text-gradient">Tecnologia.</span>
              <br />
              <span className="text-white">Automação.</span>
              <br />
              <span className="text-gradient-white">Inteligência</span>
              <br />
              <span className="text-gradient-white">Artificial.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
              Aprenda, automatize e monetize usando as melhores ferramentas de IA.
              Conteúdo premium, ferramentas SaaS e marketplace digital — tudo em um lugar.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="flex flex-wrap gap-3 mb-12">
              <Button variant="primary" size="lg" href="/blog">
                Explorar Conteúdo
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg" href="/planos">
                Começar Gratuitamente
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-accent">
                    <Icon size={14} />
                    <span className="text-xl font-bold text-white">{value}</span>
                  </div>
                  <span className="text-xs text-text-secondary">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — 3D visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full border border-accent/10 animate-pulse-slow" />
              <div className="absolute inset-8 rounded-full border border-accent/15 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />

              {/* Central element */}
              <div className="absolute inset-16 rounded-full bg-gradient-radial from-accent/20 to-transparent flex items-center justify-center">
                <div className="relative">
                  {/* Bolt icon large */}
                  <div className="w-32 h-32 bg-gradient-to-br from-accent to-yellow-600 rounded-3xl flex items-center justify-center shadow-accent-lg rotate-6">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="black">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  {/* Orbiting dots */}
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <div key={i} className="absolute w-2 h-2 rounded-full bg-accent/60"
                      style={{
                        top: '50%', left: '50%',
                        transform: `rotate(${deg}deg) translateX(80px) translate(-50%, -50%)`,
                      }} />
                  ))}
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-0 bg-card border border-border rounded-xl p-3 text-xs shadow-lg">
                <div className="flex items-center gap-2 text-accent font-bold">
                  <span>⚡</span> 500+ Artigos
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-8 left-0 bg-card border border-border rounded-xl p-3 text-xs shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span>🤖</span> IA & Automação
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-4 bg-card border border-border rounded-xl p-3 text-xs shadow-lg">
                <div className="text-text-secondary">
                  <span className="text-white font-bold">10.000+</span>
                  <br />leitores
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
