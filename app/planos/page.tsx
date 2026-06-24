'use client'
import { useState } from 'react'
import { Check, Zap, X, Shield, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const WP_BASE = 'https://wp.veloxhub.com.br'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    desc: 'Para começar a explorar',
    monthlyPrice: 0,
    annualPrice: 0,
    annualTotal: 0,
    checkoutMonthly: '/cadastro?plano=free',
    checkoutAnnual: '/cadastro?plano=free',
    cta: 'Criar conta grátis',
    featured: false,
    features: [
      { text: 'Acesso ilimitado ao blog', included: true },
      { text: 'Newsletter semanal', included: true },
      { text: 'Artigos gratuitos', included: true },
      { text: 'Ferramentas premium', included: false },
      { text: 'Calculadora de Macros', included: false },
      { text: 'Dashboard do Motorista', included: false },
      { text: 'Calculadora de Investimentos', included: false },
      { text: 'Suporte por e-mail', included: false },
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    desc: 'Para quem quer mais ferramentas',
    monthlyPrice: 19,
    annualPrice: 15,
    annualTotal: 180,
    checkoutMonthly: '/cadastro?plano=starter',
    checkoutAnnual: '/cadastro?plano=starter',
    cta: 'Assinar Starter',
    badge: 'Mais popular',
    featured: true,
    features: [
      { text: 'Acesso ilimitado ao blog', included: true },
      { text: 'Newsletter semanal', included: true },
      { text: 'Artigos gratuitos', included: true },
      { text: 'Todas as ferramentas básicas', included: true },
      { text: 'Calculadora de Macros', included: true },
      { text: 'Dashboard do Motorista', included: true },
      { text: 'Calculadora de Investimentos', included: false },
      { text: 'Suporte por e-mail', included: true },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'Para quem quer resultados sérios',
    monthlyPrice: 49,
    annualPrice: 39,
    annualTotal: 468,
    checkoutMonthly: '/cadastro?plano=pro',
    checkoutAnnual: '/cadastro?plano=pro',
    cta: 'Assinar Pro',
    featured: false,
    features: [
      { text: 'Acesso ilimitado ao blog', included: true },
      { text: 'Newsletter semanal', included: true },
      { text: 'Artigos gratuitos', included: true },
      { text: 'Todas as ferramentas básicas', included: true },
      { text: 'Calculadora de Macros', included: true },
      { text: 'Dashboard do Motorista', included: true },
      { text: 'Calculadora de Investimentos', included: true },
      { text: 'Suporte por e-mail prioritário', included: true },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    desc: 'Para equipes e empresas',
    monthlyPrice: 99,
    annualPrice: 79,
    annualTotal: 948,
    checkoutMonthly: '/cadastro?plano=business',
    checkoutAnnual: '/cadastro?plano=business',
    cta: 'Assinar Business',
    featured: false,
    features: [
      { text: 'Acesso ilimitado ao blog', included: true },
      { text: 'Newsletter semanal', included: true },
      { text: 'Artigos gratuitos', included: true },
      { text: 'Todas as ferramentas básicas', included: true },
      { text: 'Calculadora de Macros', included: true },
      { text: 'Dashboard do Motorista', included: true },
      { text: 'Calculadora de Investimentos', included: true },
      { text: 'Até 5 usuários simultâneos', included: true },
      { text: 'Suporte VIP via WhatsApp', included: true },
    ],
  },
]

const COMPARISON_ROWS = [
  { label: 'Acesso ao blog', free: true, starter: true, pro: true, business: true },
  { label: 'Newsletter semanal', free: true, starter: true, pro: true, business: true },
  { label: 'Calculadora de Macros', free: false, starter: true, pro: true, business: true },
  { label: 'Dashboard do Motorista', free: false, starter: true, pro: true, business: true },
  { label: 'Calculadora de Investimentos', free: false, starter: false, pro: true, business: true },
  { label: 'Conteúdo exclusivo de membros', free: false, starter: false, pro: true, business: true },
  { label: 'Até 5 usuários', free: false, starter: false, pro: false, business: true },
  { label: 'Suporte VIP WhatsApp', free: false, starter: false, pro: false, business: true },
]

export default function PlanosPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12">
        <Badge variant="accent" className="mb-4">
          <Zap size={11} />
          Planos VeloxHub
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Simples. Sem surpresas.
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
          Escolha o plano certo para o seu momento. Cancele quando quiser, sem multa.
        </p>

        {/* Toggle mensal/anual */}
        <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full p-1">
          <button
            onClick={() => setAnnual(false)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-semibold transition-all',
              !annual ? 'bg-accent text-black' : 'text-text-secondary hover:text-text-primary'
            )}>
            Mensal
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2',
              annual ? 'bg-accent text-black' : 'text-text-secondary hover:text-text-primary'
            )}>
            Anual
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded-full font-bold',
              annual ? 'bg-black/20 text-black' : 'bg-emerald-500/20 text-emerald-400'
            )}>
              -20%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {PLANS.map((plan, i) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice
          const checkout = annual ? plan.checkoutAnnual : plan.checkoutMonthly
          const savings = plan.monthlyPrice > 0
            ? (plan.monthlyPrice * 12) - plan.annualTotal
            : 0

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                'relative rounded-2xl border p-6 flex flex-col',
                plan.featured
                  ? 'bg-accent/5 border-accent/40 shadow-accent'
                  : 'bg-card border-border'
              )}>

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-black text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold mb-1">{plan.name}</h2>
                <p className="text-xs text-text-secondary">{plan.desc}</p>
              </div>

              <div className="mb-6">
                {price === 0 ? (
                  <div className="text-4xl font-black">Grátis</div>
                ) : (
                  <>
                    <div className="flex items-end gap-1">
                      <span className="text-sm text-text-secondary">R$</span>
                      <span className="text-4xl font-black">{price}</span>
                      <span className="text-sm text-text-secondary mb-1">/mês</span>
                    </div>
                    {annual && savings > 0 && (
                      <p className="text-xs text-emerald-400 mt-1">
                        Economia de R${savings}/ano
                      </p>
                    )}
                    {annual && (
                      <p className="text-xs text-text-secondary mt-0.5">
                        Cobrado R${plan.annualTotal}/ano
                      </p>
                    )}
                  </>
                )}
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className={cn(
                    'flex items-start gap-2 text-xs',
                    f.included ? 'text-text-primary' : 'text-text-secondary/40 line-through'
                  )}>
                    {f.included
                      ? <Check size={13} className="text-accent flex-shrink-0 mt-0.5" />
                      : <X size={13} className="flex-shrink-0 mt-0.5" />}
                    {f.text}
                  </li>
                ))}
              </ul>

              <Link
                href={checkout}
                className={cn(
                  'w-full text-center py-2.5 rounded-xl text-sm font-bold transition-all block',
                  plan.featured
                    ? 'bg-accent text-black hover:bg-accent-hover shadow-accent'
                    : 'bg-white/5 border border-border hover:border-accent/30 hover:bg-accent/5 text-text-primary'
                )}>
                {plan.cta}
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Garantia */}
      <div className="flex items-center justify-center gap-3 text-sm text-text-secondary mb-16 p-4 bg-card border border-border rounded-2xl max-w-md mx-auto">
        <Shield size={18} className="text-emerald-400 flex-shrink-0" />
        <span>Garantia de <strong className="text-text-primary">7 dias</strong> — reembolso total, sem perguntas.</span>
      </div>

      {/* Tabela comparativa */}
      <div>
        <h2 className="text-2xl font-black text-center mb-8 tracking-tight">Comparativo completo</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="text-left py-4 px-5 text-text-secondary font-semibold">Recurso</th>
                {PLANS.map(p => (
                  <th key={p.id} className={cn(
                    'py-4 px-4 text-center font-bold',
                    p.featured ? 'text-accent' : 'text-text-primary'
                  )}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.label} className={cn(
                  'border-b border-border/50',
                  i % 2 === 0 ? '' : 'bg-white/[0.02]'
                )}>
                  <td className="py-3 px-5 text-text-secondary">{row.label}</td>
                  {(['free', 'starter', 'pro', 'business'] as const).map(planId => (
                    <td key={planId} className="py-3 px-4 text-center">
                      {row[planId]
                        ? <Check size={15} className="text-accent mx-auto" />
                        : <X size={15} className="text-text-secondary/30 mx-auto" />}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-4 px-5" />
                {PLANS.map(plan => (
                  <td key={plan.id} className="py-4 px-4 text-center">
                    <Link href={annual ? plan.checkoutAnnual : plan.checkoutMonthly}
                      className={cn(
                        'inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all',
                        plan.featured
                          ? 'bg-accent text-black hover:bg-accent-hover'
                          : 'border border-border hover:border-accent/30 text-text-secondary hover:text-text-primary'
                      )}>
                      {plan.id === 'free' ? 'Grátis' : 'Assinar'} <ArrowRight size={11} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ mínimo */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-8 tracking-tight">Perguntas frequentes</h2>
        <div className="flex flex-col gap-4">
          {[
            { q: 'Posso cancelar a qualquer momento?', a: 'Sim. Sem multa, sem burocracia. Cancele quando quiser diretamente na área de membros.' },
            { q: 'Qual é a forma de pagamento?', a: 'Aceitamos cartão de crédito, boleto e PIX via Mercado Pago.' },
            { q: 'Tenho garantia?', a: 'Sim. 7 dias de garantia total. Se não gostar, devolvemos 100% do valor.' },
            { q: 'Posso mudar de plano?', a: 'Sim, a qualquer momento. O valor é ajustado proporcionalmente.' },
          ].map(({ q, a }) => (
            <div key={q} className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold mb-2 text-sm">{q}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
