'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Zap, Rocket, Crown, Building2, Star, Shield, Lock, Loader2, Check, ArrowLeft } from 'lucide-react'

const PLAN_META: Record<string, {
  name: string; price: string; period: string; desc: string
  color: string; bg: string; glow: string; iconBg: string
  icon: typeof Zap; cartId: number
  features: string[]
}> = {
  starter: {
    name: 'Starter', price: 'R$19', period: '/mês',
    desc: 'Calculadoras, Dashboard Saúde & Carreira.',
    color: 'border-accent/50', bg: 'bg-accent/[0.06]',
    glow: 'shadow-[0_0_32px_rgba(255,212,0,0.15)]',
    iconBg: 'bg-accent', icon: Rocket, cartId: 316,
    features: ['Calculadora de Macros', 'Dashboard do Motorista', 'Saúde & Carreira', 'Suporte por e-mail'],
  },
  pro: {
    name: 'Pro', price: 'R$49', period: '/mês',
    desc: 'Tudo do Starter + Finanças, Investimentos e IA.',
    color: 'border-purple-500/50', bg: 'bg-purple-500/[0.06]',
    glow: 'shadow-[0_0_32px_rgba(168,85,247,0.15)]',
    iconBg: 'bg-purple-500', icon: Crown, cartId: 317,
    features: ['Tudo do Starter', 'Finanças Pessoais', 'Calculadora de Investimentos', 'Conteúdo exclusivo'],
  },
  business: {
    name: 'Business', price: 'R$99', period: '/mês',
    desc: 'Acesso total a todos os recursos atuais e futuros.',
    color: 'border-emerald-500/50', bg: 'bg-emerald-500/[0.06]',
    glow: 'shadow-[0_0_32px_rgba(16,185,129,0.15)]',
    iconBg: 'bg-emerald-500', icon: Building2, cartId: 318,
    features: ['Tudo do Pro', 'Até 5 usuários', 'Suporte VIP WhatsApp', 'Recursos futuros inclusos'],
  },
}

function CheckoutEmbed({ url }: { url: string }) {
  const [height, setHeight] = useState(750)
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://wp.veloxhub.com.br') return
      if (e.data?.type === 'velox_resize' && typeof e.data.height === 'number') {
        setHeight(Math.max(500, e.data.height + 48))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-[#050505]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-10 min-h-[400px]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={28} className="animate-spin text-accent" />
            <span className="text-sm text-text-secondary">Carregando checkout seguro...</span>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={url}
        width="100%"
        height={height}
        onLoad={() => setLoaded(true)}
        title="Checkout VeloxHub"
        style={{ border: 'none', background: '#050505', display: 'block' }}
      />
    </div>
  )
}

function CheckoutContent() {
  const params = useSearchParams()
  const plano = params.get('plano') ?? 'starter'
  const meta = PLAN_META[plano] ?? PLAN_META.starter
  const Icon = meta.icon

  const wpCheckoutUrl = `https://wp.veloxhub.com.br/finalizar-compra/?add-to-cart=${meta.cartId}&velox_embed=1`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/planos" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors">
          <ArrowLeft size={14} /> Voltar aos planos
        </Link>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Lock size={12} className="text-emerald-400" />
          <span>Checkout seguro</span>
        </div>
      </div>

      {/* Plan banner premium */}
      <div className={`${meta.bg} border ${meta.color} ${meta.glow} rounded-2xl p-6 mb-8 relative overflow-hidden`}>
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/[0.02] blur-2xl" />

        <div className="flex items-start gap-5 relative z-10">
          <div className={`w-14 h-14 ${meta.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <Icon size={24} className="text-black" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Star size={11} className="text-accent" fill="currentColor" />
              <p className="text-[10px] text-accent uppercase tracking-[3px] font-bold">Finalizando assinatura</p>
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-1">
              VeloxHub {meta.name}
              <span className="ml-3 text-accent">{meta.price}<span className="text-sm font-medium text-text-secondary">{meta.period}</span></span>
            </h1>
            <p className="text-sm text-text-secondary mb-4">{meta.desc}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {meta.features.map(f => (
                <span key={f} className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <Check size={11} className="text-accent" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout embed */}
      <CheckoutEmbed url={wpCheckoutUrl} />

      {/* Trust badges */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-4 text-center">
          <Shield size={18} className="text-emerald-400" />
          <span className="text-xs text-text-secondary font-medium">Garantia de 7 dias</span>
        </div>
        <div className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-4 text-center">
          <Lock size={18} className="text-accent" />
          <span className="text-xs text-text-secondary font-medium">Pagamento seguro</span>
        </div>
        <div className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-4 text-center">
          <Zap size={18} className="text-purple-400" />
          <span className="text-xs text-text-secondary font-medium">Acesso imediato</span>
        </div>
      </div>

      <p className="text-center text-xs text-text-secondary/50 mt-6">
        Processado por WooCommerce · Cancele quando quiser · Sem multa
      </p>
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
