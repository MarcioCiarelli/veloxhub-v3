'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CATEGORIES = [
  { emoji: '🤖', label: 'Inteligência Artificial', slug: 'inteligencia-artificial', desc: 'ChatGPT, Gemini, Claude e as melhores ferramentas de IA.', count: 13, color: '#FFD400' },
  { emoji: '⚡', label: 'Tecnologia', slug: 'tecnologia', desc: 'Reviews, tutoriais e dicas de ferramentas digitais.', count: 8, color: '#60A5FA' },
  { emoji: '💰', label: 'Finanças', slug: 'financas', desc: 'Investimentos, renda extra e controle financeiro.', count: 9, color: '#34D399' },
  { emoji: '🚀', label: 'Produtividade', slug: 'produtividade', desc: 'Sistemas, hábitos e ferramentas para render mais.', count: 10, color: '#A78BFA' },
  { emoji: '📣', label: 'Marketing', slug: 'marketing', desc: 'Estratégias de conteúdo, tráfego pago e crescimento orgânico.', count: 1, color: '#F472B6' },
  { emoji: '💼', label: 'Negócios', slug: 'negocios', desc: 'Empreendedorismo, gestão e como escalar seu negócio.', count: 0, color: '#FB923C' },
]

export default function CategoriesSection() {
  return (
    <section className="py-24 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Categorias</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Explore por tema</h2>
          </div>
          <Link href="/blog" className="text-sm text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors">
            Ver todos <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}>
              <Link href={`/categoria/${cat.slug}`}
                className="group block bg-card border border-border rounded-2xl p-6 card-hover h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{cat.emoji}</div>
                  <span className="text-xs text-text-secondary bg-white/5 px-2 py-1 rounded-full">
                    {cat.count} artigos
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors"
                  style={{ color: 'inherit' }}>
                  {cat.label}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{cat.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold transition-colors"
                  style={{ color: cat.color }}>
                  Explorar <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
