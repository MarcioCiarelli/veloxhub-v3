'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Zap, Eye, EyeOff, UserPlus, Loader2, Shield, Check, LogIn, Rocket, Crown, Building2, Star } from 'lucide-react'

const WP_LOGIN = 'https://wp.veloxhub.com.br/minha-conta/'

const AUTH_SYNC = 'https://www.veloxhub.com.br/auth-sync'
const WP_DASHBOARD = 'https://wp.veloxhub.com.br/minha-conta/'

function authSyncUrl(dest: string) {
  return `${AUTH_SYNC}?dest=${encodeURIComponent(dest)}`
}

const PLAN_META: Record<string, {
  name: string; price: string; desc: string
  color: string; bg: string; glow: string; iconBg: string
  icon: typeof Zap; checkoutUrl: string
}> = {
  free:     { name: 'Free',     price: 'Grátis',   desc: 'Blog, newsletter e ferramentas básicas.',             color: 'border-border',          bg: 'bg-card',                    glow: '',                                          iconBg: 'bg-white/10',           icon: Zap,        checkoutUrl: authSyncUrl(WP_DASHBOARD) },
  starter:  { name: 'Starter',  price: 'R$19/mês', desc: 'Calculadoras, Dashboard Saúde & Carreira.',           color: 'border-accent/50',       bg: 'bg-accent/[0.06]',           glow: 'shadow-[0_0_24px_rgba(255,212,0,0.12)]',    iconBg: 'bg-accent',             icon: Rocket,     checkoutUrl: authSyncUrl('https://www.veloxhub.com.br/checkout?plano=starter') },
  pro:      { name: 'Pro',      price: 'R$49/mês', desc: 'Tudo do Starter + Finanças, Investimentos e IA.',     color: 'border-purple-500/50',   bg: 'bg-purple-500/[0.06]',       glow: 'shadow-[0_0_24px_rgba(168,85,247,0.12)]',   iconBg: 'bg-purple-500',         icon: Crown,      checkoutUrl: authSyncUrl('https://www.veloxhub.com.br/checkout?plano=pro') },
  business: { name: 'Business', price: 'R$99/mês', desc: 'Acesso total a todos os recursos atuais e futuros.',  color: 'border-emerald-500/50',  bg: 'bg-emerald-500/[0.06]',      glow: 'shadow-[0_0_24px_rgba(16,185,129,0.12)]',   iconBg: 'bg-emerald-500',        icon: Building2,  checkoutUrl: authSyncUrl('https://www.veloxhub.com.br/checkout?plano=business') },
}

function CadastroContent() {
  const params = useSearchParams()
  const plano = params.get('plano') ?? 'free'
  const meta = PLAN_META[plano] ?? PLAN_META.free
  const isFree = plano === 'free'

  const [showPwd, setShowPwd] = useState(false)
  const [nonce, setNonce] = useState('')
  const [registerNonce, setRegisterNonce] = useState('')
  const [referer, setReferer] = useState('/minha-conta/')
  const [loading, setLoading] = useState(false)
  const [fetchingNonce, setFetchingNonce] = useState(true)

  useEffect(() => {
    fetch('/api/wp-nonce')
      .then(r => r.json())
      .then(({ nonce, registerNonce, referer }) => {
        setNonce(nonce ?? '')
        setRegisterNonce(registerNonce ?? '')
        setReferer(referer ?? '/minha-conta/')
      })
      .catch(() => {})
      .finally(() => setFetchingNonce(false))
  }, [])

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap size={24} className="text-black" fill="black" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Criar sua conta</h1>
          <p className="text-text-secondary text-sm">
            {isFree ? 'Acesso gratuito para sempre.' : `Plano ${meta.name} — ${meta.price}`}
          </p>
        </div>

        {/* Plan badge */}
        {(() => {
          const Icon = meta.icon
          return (
            <div className={`${meta.bg} border ${meta.color} ${meta.glow} rounded-2xl p-5 mb-6 relative overflow-hidden`}>
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${meta.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className="text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Star size={10} className="text-accent" fill="currentColor" />
                    <p className="text-[10px] text-accent uppercase tracking-[3px] font-bold">Plano selecionado</p>
                  </div>
                  <p className="font-black text-lg leading-tight tracking-tight">
                    {meta.name}
                    <span className="ml-2 text-accent text-base">{meta.price}</span>
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">{meta.desc}</p>
                </div>
              </div>
              <Link href="/planos" className="absolute top-4 right-4 text-[10px] text-text-secondary hover:text-accent transition-colors underline underline-offset-2 decoration-dotted">
                Trocar plano
              </Link>
            </div>
          )
        })()}

        {/* Registration form */}
        <form
          action={WP_LOGIN}
          method="POST"
          onSubmit={() => setLoading(true)}
          className="bg-card border border-border rounded-2xl p-8 space-y-5">

          <input type="hidden" name="woocommerce-register-nonce" value={registerNonce} />
          <input type="hidden" name="_wp_http_referer" value={referer} />
          <input type="hidden" name="register" value="Register" />
          <input type="hidden" name="redirect" value={meta.checkoutUrl} />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="seu@email.com"
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm
                         placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50
                         focus:ring-1 focus:ring-accent/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPwd ? 'text' : 'password'}
                autoComplete="new-password"
                required
                placeholder="Mínimo 8 caracteres"
                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm
                           placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50
                           focus:ring-1 focus:ring-accent/20 transition-all pr-11"
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors p-1">
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isFree && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-3">
              <Check size={13} className="flex-shrink-0" />
              <span>Após criar a conta você será direcionado ao checkout seguro.</span>
            </div>
          )}

          <div className="flex items-start gap-2 text-xs text-text-secondary bg-white/[0.02] border border-border rounded-xl p-3">
            <Shield size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Ao criar sua conta você concorda com os{' '}
              <Link href="/termos" className="text-accent hover:underline">Termos</Link>
              {' '}e{' '}
              <Link href="/privacidade" className="text-accent hover:underline">Privacidade</Link>.
              {!isFree && ' Garantia de 7 dias.'}
            </span>
          </div>

          <button
            type="submit"
            disabled={fetchingNonce || loading}
            className="w-full bg-accent text-black font-bold py-3.5 rounded-xl hover:bg-yellow-300
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 text-sm">
            {loading || fetchingNonce
              ? <><Loader2 size={16} className="animate-spin" /> Aguarde...</>
              : <><UserPlus size={16} /> {isFree ? 'Criar conta grátis' : `Criar conta e ir ao checkout`}</>}
          </button>
        </form>

        <p className="text-center text-xs text-text-secondary/50 mt-4">
          Já tem uma conta?{' '}
          <Link
            href={isFree ? '/entrar' : `/entrar?tab=login&redirect=${encodeURIComponent(meta.checkoutUrl)}`}
            className="text-accent hover:underline font-semibold flex-inline items-center gap-1">
            <LogIn size={11} className="inline" /> Entrar
          </Link>
        </p>

      </div>
    </div>
  )
}

export default function CadastroPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CadastroContent />
    </Suspense>
  )
}
