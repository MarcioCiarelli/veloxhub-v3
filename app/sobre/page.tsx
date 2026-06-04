import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre o VeloxHub',
  description: 'Conheça o VeloxHub — plataforma de tecnologia, IA e automação para acelerar sua evolução digital.',
}

const NUMEROS = [
  { val: '10.000+', label: 'Leitores mensais' },
  { val: '500+',    label: 'Artigos publicados' },
  { val: '5',       label: 'Redes sociais' },
  { val: '2026',    label: 'Fundado em' },
]

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-black" fill="black" />
          </div>
          <span className="font-black text-lg tracking-tight">VELOX<span className="text-accent">HUB</span></span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Quem somos</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">Sobre o VeloxHub</h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          O VeloxHub nasceu com uma missão simples: tornar tecnologia, inteligência artificial
          e automação acessíveis para quem quer crescer no mundo digital.
        </p>
      </div>

      {/* Números */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {NUMEROS.map(({ val, label }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-5 text-center">
            <div className="text-2xl font-black text-accent mb-1">{val}</div>
            <div className="text-xs text-text-secondary">{label}</div>
          </div>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="prose prose-invert prose-lg max-w-none
                      prose-headings:font-black prose-headings:tracking-tight
                      prose-h2:text-2xl prose-h2:mt-10
                      prose-p:text-text-secondary
                      prose-a:text-accent prose-strong:text-text-primary">
        <h2>O que fazemos</h2>
        <p>
          Produzimos conteúdo editorial sobre <strong>tecnologia, IA, finanças e produtividade</strong>,
          além de ferramentas SaaS e um marketplace de Skills para o Claude — o assistente de IA da Anthropic.
        </p>

        <h2>Nossa missão</h2>
        <p>
          Ajudar empreendedores, profissionais e curiosos a usarem as melhores ferramentas digitais
          para ganhar tempo, escalar resultados e se manter à frente das tendências.
        </p>

        <h2>Contato</h2>
        <p>
          Parcerias, imprensa ou suporte:{' '}
          <a href="mailto:contato@veloxhub.com.br">contato@veloxhub.com.br</a>
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mt-10">
        <Link href="/blog"
          className="inline-flex items-center gap-2 bg-accent text-black font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-accent-hover transition-colors">
          Ver artigos <ArrowRight size={14} />
        </Link>
        <Link href="/contato"
          className="inline-flex items-center gap-2 border border-border text-text-secondary font-semibold px-5 py-2.5 rounded-xl text-sm hover:border-accent/30 hover:text-text-primary transition-all">
          Falar com a equipe
        </Link>
      </div>
    </div>
  )
}
