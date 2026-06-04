import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Newsletter — VeloxHub',
  description: 'Assine a newsletter do VeloxHub e receba toda semana o melhor de tecnologia, IA e automação.',
}

const BENEFICIOS = [
  'Resumo semanal das melhores ferramentas de IA',
  'Tutoriais e automações prontas para usar',
  'Tendências de tecnologia antes de todo mundo',
  'Conteúdo exclusivo para assinantes',
  'Zero spam — pode cancelar a qualquer momento',
]

export default function NewsletterPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
          <Zap size={24} className="text-accent" fill="currentColor" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Newsletter semanal</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          VeloxHub<br />
          <span className="text-gradient">na sua caixa</span>
        </h1>
        <p className="text-text-secondary text-lg">
          Todo domingo, o melhor de tecnologia, IA e automação — em menos de 5 minutos de leitura.
        </p>
      </div>

      {/* Benefícios */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h2 className="font-black text-base tracking-tight mb-4">O que você recebe</h2>
        <ul className="space-y-3">
          {BENEFICIOS.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-text-secondary">
              <CheckCircle size={15} className="text-accent flex-shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA para membros */}
      <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 text-center">
        <p className="font-bold mb-1">Newsletter inclusa em todos os planos</p>
        <p className="text-text-secondary text-sm mb-4">
          Crie uma conta gratuita e comece a receber agora.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/planos"
            className="inline-flex items-center justify-center gap-2 bg-accent text-black font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-accent-hover transition-colors">
            <Zap size={14} fill="currentColor" /> Ver Planos
          </Link>
          <Link href="/minha-conta"
            className="inline-flex items-center justify-center gap-2 border border-border text-text-secondary font-semibold px-6 py-2.5 rounded-xl text-sm hover:border-accent/30 hover:text-text-primary transition-all">
            Já tenho conta
          </Link>
        </div>
      </div>
    </div>
  )
}
