'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Zap, Rocket, Crown, Building2, Star, Shield, Lock, Check, ArrowRight, ArrowLeft, CreditCard, Clock, Sparkles } from 'lucide-react'

const WP_BASE = 'https://wp.veloxhub.com.br'

const PLAN_META: Record<string, {
  name: string; price: string; priceNum: number; period: string; desc: string
  color: string; bg: string; glow: string; iconBg: string; textColor: string
  icon: typeof Zap; cartId: number
  features: string[]
  extras: string[]
}> = {
  starter: {
    name: 'Starter', price: 'R$19', priceNum: 19, period: '/mês',
    desc: 'Ideal para quem quer ferramentas práticas no dia a dia.',
    color: 'border-accent/50', bg: 'bg-gradient-to-br from-accent/[0.08] to-accent/[0.02]',
    glow: 'shadow-[0_0_40px_rgba(255,212,0,0.12)]',
    iconBg: 'bg-accent', textColor: 'text-accent',
    icon: Rocket, cartId: 316,
    features: ['Calculadora de Macros', 'Dashboard do Motorista', 'Saúde & Carreira', 'Suporte por e-mail'],
    extras: ['Cancele quando quiser', 'Garantia de 7 dias', 'Acesso imediato'],
  },
  pro: {
    name: 'Pro', price: 'R$49', priceNum: 49, period: '/mês',
    desc: 'Para quem quer resultados sérios em finanças e investimentos.',
    color: 'border-purple-500/50', bg: 'bg-gradient-to-br from-purple-500/[0.08] to-purple-500/[0.02]',
    glow: 'shadow-[0_0_40px_rgba(168,85,247,0.12)]',
    iconBg: 'bg-purple-500', textColor: 'text-purple-400',
    icon: Crown, cartId: 317,
    features: ['Tudo do Starter', 'Finanças Pessoais', 'Calculadora de Investimentos', 'Contabilidade', 'Conteúdo exclusivo'],
    extras: ['Cancele quando quiser', 'Garantia de 7 dias', 'Acesso imediato'],
  },
  business: {
    name: 'Business', price: 'R$99', priceNum: 99, period: '/mês',
    desc: 'Acesso total para equipes e empresas.',
    color: 'border-emerald-500/50', bg: 'bg-gradient-to-br from-emerald-500/[0.08] to-emerald-500/[0.02]',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.12)]',
    iconBg: 'bg-emerald-500', textColor: 'text-emerald-400',
    icon: Building2, cartId: 318,
    features: ['Tudo do Pro', 'Até 5 usuários simultâneos', 'Suporte VIP WhatsApp', 'Recursos futuros inclusos'],
    extras: ['Cancele quando quiser', 'Garantia de 7 dias', 'Acesso imediato'],
  },
}

function CheckoutContent() {
  const params = useSearchParams()
  const plano = params.get('plano') ?? 'starter'
  const meta = PLAN_META[plano] ?? PLAN_META.starter
  const Icon = meta.icon

  const checkoutUrl = `${WP_BASE}/finalizar-compra/?add-to-cart=${meta.cartId}`

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/planos" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors">
            <ArrowLeft size={14} /> Voltar
          </Link>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Lock size={12} />
            <span>Checkout seguro</span>
          </div>
        </div>

        {/* Plan card premium */}
        <div className={`${meta.bg} border ${meta.color} ${meta.glow} rounded-2xl p-7 mb-6 relative overflow-hidden`}>
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-white/[0.03] blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-white/[0.02] blur-xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-14 h-14 ${meta.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Icon size={24} className="text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Star size={11} className="text-accent" fill="currentColor" />
                  <p className="text-[10px] text-accent uppercase tracking-[3px] font-bold">Assinatura</p>
                </div>
                <h1 className="text-2xl font-black tracking-tight">
                  VeloxHub {meta.name}
                </h1>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-5">{meta.desc}</p>

            <div className="space-y-2 mb-5">
              {meta.features.map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full ${meta.iconBg}/20 flex items-center justify-center flex-shrink-0`}>
                    <Check size={10} className={meta.textColor} />
                  </div>
                  <span className="text-sm text-text-primary">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-white/10">
              <span className="text-sm text-text-secondary">Total mensal</span>
              <span className="text-3xl font-black tracking-tight">
                {meta.price}<span className="text-base font-medium text-text-secondary">{meta.period}</span>
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={checkoutUrl}
          className="w-full flex items-center justify-center gap-3 bg-accent text-black font-bold py-4 rounded-xl hover:bg-accent-hover transition-all shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5 text-base mb-4 block text-center"
        >
          <CreditCard size={20} />
          Ir para pagamento seguro
          <ArrowRight size={16} />
        </a>

        <p className="text-center text-xs text-text-secondary/60 mb-8">
          Você será direcionado para preencher seus dados e concluir o pagamento
        </p>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {meta.extras.map((extra, i) => {
            const icons = [Shield, Clock, Sparkles]
            const colors = ['text-emerald-400', 'text-accent', 'text-purple-400']
            const BadgeIcon = icons[i]
            return (
              <div key={extra} className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-3.5 text-center">
                <BadgeIcon size={16} className={colors[i]} />
                <span className="text-[11px] text-text-secondary font-medium leading-tight">{extra}</span>
              </div>
            )
          })}
        </div>

        {/* FAQ mini */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Perguntas rápidas</p>
          <div>
            <p className="text-xs font-semibold mb-0.5">Como funciona o pagamento?</p>
            <p className="text-xs text-text-secondary">Cartão de crédito, boleto ou PIX via checkout seguro.</p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-0.5">Posso cancelar?</p>
            <p className="text-xs text-text-secondary">Sim, a qualquer momento, sem multa. Cancele na área de membros.</p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-0.5">Quando recebo o acesso?</p>
            <p className="text-xs text-text-secondary">Imediatamente após a confirmação do pagamento.</p>
          </div>
        </div>

        <p className="text-center text-[10px] text-text-secondary/40 mt-6">
          Processado por WooCommerce · Dados criptografados · PCI compliant
        </p>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
