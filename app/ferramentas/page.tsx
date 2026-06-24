import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, ArrowRight, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ferramentas — Calculadoras e dashboards para assinantes',
  description: 'Ferramentas exclusivas VeloxHub: calculadora de macros, dashboard do motorista, calculadora de investimentos e muito mais.',
}

const TOOLS_FREE = [
  {
    icon: '⚡',
    name: 'Skills para Claude',
    desc: '20 automações prontas para publicar em 5 redes sociais sem esforço.',
    badge: 'R$47',
    badgeColor: 'text-accent bg-accent/10',
    href: '/skills',
    cta: 'Ver Skills',
    free: true,
  },
]

const TOOLS_PAID = [
  {
    id: 'calculadora-macros',
    icon: '💪',
    name: 'Calculadora de Macros',
    desc: 'Descubra exatamente quanto de proteína, carbo e gordura você precisa por dia para atingir seu objetivo.',
    plan: 'Gratuita',
    href: 'https://wp.veloxhub.com.br/calculadora-macros/',
    available: true,
  },
  {
    id: 'dashboard-motorista',
    icon: '🚗',
    name: 'Dashboard do Motorista',
    desc: 'Acompanhe ganhos, gastos com combustível e lucro real por corrida em tempo real.',
    plan: 'Gratuita',
    href: 'https://wp.veloxhub.com.br/dashboard-motorista/',
    available: true,
  },
  {
    id: 'calc-investimentos',
    icon: '📊',
    name: 'Calculadora de Investimentos',
    desc: 'Simule juros compostos e visualize seu patrimônio em 5, 10 e 20 anos com diferentes cenários.',
    plan: 'Gratuita',
    href: 'https://wp.veloxhub.com.br/calculadora-investimentos/',
    available: true,
  },
  {
    id: 'gerador-seo',
    icon: '🔍',
    name: 'Gerador SEO',
    desc: 'Títulos, meta descriptions e estrutura de artigos otimizados para o Google.',
    plan: 'Pro+',
    href: '/ferramentas',
    available: false,
  },
  {
    id: 'gerador-posts',
    icon: '✍️',
    name: 'Gerador de Posts',
    desc: 'Crie posts completos para blog em segundos com IA generativa.',
    plan: 'Pro+',
    href: '/ferramentas',
    available: false,
  },
  {
    id: 'gerador-titulos',
    icon: '💡',
    name: 'Gerador de Títulos',
    desc: '10 variações de títulos com gatilhos mentais para máximo CTR.',
    plan: 'Pro+',
    href: '/ferramentas',
    available: false,
  },
]

export default function FerramentasPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">

      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Ferramentas</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Ferramentas VeloxHub
        </h1>
        <p className="text-text-secondary max-w-xl text-lg">
          Calculadoras, geradores e dashboards para empreendedores digitais. Acesso completo nos planos Starter e Pro.
        </p>
      </div>

      {/* Ferramenta gratuita */}
      <div className="mb-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Disponível para todos</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {TOOLS_FREE.map(tool => (
            <Link key={tool.name} href={tool.href}
              className="group flex items-start gap-4 bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all hover:-translate-y-0.5">
              <div className="text-3xl flex-shrink-0">{tool.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold group-hover:text-accent transition-colors">{tool.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tool.badgeColor}`}>{tool.badge}</span>
                </div>
                <p className="text-sm text-text-secondary mb-3">{tool.desc}</p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  {tool.cta} <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ferramentas para assinantes */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
            <Lock size={13} /> Exclusivo para assinantes
          </h2>
          <Link href="/planos" className="text-sm text-text-secondary hover:text-accent flex items-center gap-1 transition-colors">
            Ver planos <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_PAID.map(tool => tool.available ? (
            <a key={tool.name} id={tool.id} href={tool.href}
              className="group block bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all hover:-translate-y-0.5 scroll-mt-20">
              <div className="text-3xl mb-4">{tool.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold group-hover:text-accent transition-colors">{tool.name}</h3>
                <span className="text-xs bg-accent/10 border border-accent/20 text-accent px-2 py-0.5 rounded-full">
                  {tool.plan}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-4">{tool.desc}</p>
              <span className="text-accent text-sm font-semibold flex items-center gap-1">
                Acessar <ArrowRight size={13} />
              </span>
            </a>
          ) : (
            <div key={tool.name}
              className="block bg-card border border-border rounded-2xl p-6 opacity-40 cursor-not-allowed relative">
              <div className="absolute top-4 right-4 text-lg">🔒</div>
              <div className="text-3xl mb-4">{tool.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold">{tool.name}</h3>
                <span className="text-xs bg-white/5 border border-white/10 text-text-secondary px-2 py-0.5 rounded-full">
                  Em breve
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-4">{tool.desc}</p>
              <span className="text-text-secondary text-sm font-semibold">Em desenvolvimento</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Assinar */}
      <div className="mt-12 bg-accent/5 border border-accent/20 rounded-2xl p-8 text-center">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
          <Zap size={18} className="text-black" fill="black" />
        </div>
        <h3 className="text-2xl font-black mb-2">Acesse todas as ferramentas</h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          A partir de R$19/mês, tenha acesso completo às calculadoras e geradores exclusivos.
        </p>
        <Link href="/planos"
          className="inline-flex items-center gap-2 bg-accent text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors">
          Ver planos <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
