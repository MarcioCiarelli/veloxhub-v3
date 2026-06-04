'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section className="py-24 border-t border-border/50 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-accent/8 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-2xl mb-8">
            <Zap size={20} className="text-black" fill="black" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
            Pronto para acelerar<br />
            <span className="text-gradient">seus resultados?</span>
          </h2>

          <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">
            Junte-se a mais de 10.000 pessoas que usam o VeloxHub para crescer mais rápido com IA.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="primary" size="lg" href="https://veloxhub.com.br/planos">
              Assine Agora <ArrowRight size={16} />
            </Button>
            <Button variant="outline" size="lg" href="/blog">
              Explorar Grátis
            </Button>
          </div>

          <p className="text-xs text-text-secondary mt-6 opacity-60">
            Plano gratuito disponível. Sem cartão de crédito.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
