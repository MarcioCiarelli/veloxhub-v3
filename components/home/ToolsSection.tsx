'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const TOOLS = [
  { id: 'skills', name: 'Skills para Claude', desc: '20 automações prontas para o Claude — publique em 5 redes sem esforço.', icon: '⚡', badge: 'R$47', href: '/skills', locked: false },
  { id: 'seo-gen', name: 'Gerador SEO', desc: 'Títulos, meta descriptions e estrutura de artigos otimizados para Google.', icon: '🔍', badge: 'Em breve', href: '/ferramentas', locked: true },
  { id: 'post-gen', name: 'Gerador de Posts', desc: 'Crie posts completos para blog em segundos com IA generativa.', icon: '✍️', badge: 'Em breve', href: '/ferramentas', locked: true },
  { id: 'img-gen', name: 'Gerador de Imagens', desc: 'Thumbnails e banners otimizados para redes sociais e blog.', icon: '🖼️', badge: 'Em breve', href: '/ferramentas', locked: true },
  { id: 'content-plan', name: 'Planejador de Conteúdo', desc: 'Calendário editorial com sugestões de pauta baseadas em tendências.', icon: '📅', badge: 'Em breve', href: '/ferramentas', locked: true },
  { id: 'video-gen', name: 'Gerador de Vídeos', desc: 'Shorts e Reels automáticos a partir dos seus artigos.', icon: '🎬', badge: 'Em breve', href: '/ferramentas', locked: true },
  { id: 'title-gen', name: 'Gerador de Títulos', desc: '10 variações de títulos com gatilhos mentais para máximo CTR.', icon: '💡', badge: 'Em breve', href: '/ferramentas', locked: true },
  { id: 'seo-analyzer', name: 'Analisador SEO', desc: 'Auditoria técnica e sugestões de melhoria para qualquer URL.', icon: '📊', badge: 'Em breve', href: '/ferramentas', locked: true },
]

export default function ToolsSection() {
  return (
    <section className="py-24 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Ferramentas SaaS</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ferramentas VeloxHub</h2>
            <p className="text-text-secondary mt-2 max-w-lg">Plataforma completa de ferramentas de IA para conteúdo, SEO e automação.</p>
          </div>
          <Link href="/ferramentas" className="text-sm text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors">
            Ver todas <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}>
              {tool.locked ? (
                <div className="block bg-card border border-border rounded-2xl p-5 h-full opacity-40 cursor-not-allowed relative">
                  <div className="absolute top-3 right-3 text-lg">🔒</div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{tool.icon}</div>
                    {tool.badge && <Badge variant="default">{tool.badge}</Badge>}
                  </div>
                  <h3 className="font-bold mb-2">{tool.name}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">{tool.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-text-secondary">
                    Em desenvolvimento
                  </div>
                </div>
              ) : (
                <Link href={tool.href}
                  className="group block bg-card border border-border rounded-2xl p-5 card-hover h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{tool.icon}</div>
                    {tool.badge && (
                      <Badge variant={tool.badge === 'R$47' ? 'accent' : 'green'}>
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-accent transition-colors">{tool.name}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">{tool.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-accent">
                    Acessar <ExternalLink size={11} />
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center">
          <Button variant="outline" size="lg" href="/ferramentas">
            Ver todas as ferramentas <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
