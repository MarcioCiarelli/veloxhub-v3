'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Zap, Eye, EyeOff, LogIn, UserPlus, Loader2, Shield, AlertCircle } from 'lucide-react'

const WP_LOGIN    = 'https://wp.veloxhub.com.br/minha-conta/'
const WP_DASHBOARD = 'https://wp.veloxhub.com.br/minha-conta/'
const AUTH_SYNC   = 'https://www.veloxhub.com.br/auth-sync'

function EntrarContent() {
  const params = useSearchParams()
  const erro = params.get('erro')
  const initialTab = params.get('tab') === 'register' || erro === 'registro' ? 'register' : 'login'
  const [tab, setTab] = useState<'login' | 'register'>(initialTab as 'login' | 'register')

  const [showPwd, setShowPwd] = useState(false)
  const [showRegPwd, setShowRegPwd] = useState(false)
  const [nonce, setNonce] = useState('')
  const [registerNonce, setRegisterNonce] = useState('')
  const [referer, setReferer] = useState('/minha-conta/')
  const [loading, setLoading] = useState(false)
  const [fetchingNonce, setFetchingNonce] = useState(true)

  useEffect(() => {
    fetch('/api/wp-nonce')
      .then(r => r.json())
      .then(({ nonce, registerNonce, referer }) => {
        setNonce(nonce)
        setRegisterNonce(registerNonce)
        setReferer(referer)
      })
      .catch(() => {})
      .finally(() => setFetchingNonce(false))
  }, [])

  const redirectParam = params.get('redirect') ?? ''

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo + título */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap size={24} className="text-black" fill="black" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            {tab === 'login' ? 'Entrar na sua conta' : 'Criar sua conta'}
          </h1>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-card border border-border rounded-xl p-1 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === 'login'
                ? 'bg-accent text-black'
                : 'text-text-secondary hover:text-text-primary'
            }`}>
            <LogIn size={15} /> Entrar
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === 'register'
                ? 'bg-accent text-black'
                : 'text-text-secondary hover:text-text-primary'
            }`}>
            <UserPlus size={15} /> Criar conta
          </button>
        </div>

        {/* ── LOGIN ── */}
        {tab === 'login' && (
          <form
            action={WP_LOGIN}
            method="POST"
            onSubmit={() => setLoading(true)}
            className="bg-card border border-border rounded-2xl p-8 space-y-5">

            <input type="hidden" name="woocommerce-login-nonce" value={nonce} />
            <input type="hidden" name="_wp_http_referer" value={referer} />
            <input type="hidden" name="login" value="Login" />
            <input type="hidden" name="redirect" value={redirectParam || `${AUTH_SYNC}?dest=${encodeURIComponent(WP_DASHBOARD)}`} />

            {erro === 'credenciais' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
                E-mail ou usuário
              </label>
              <input
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="seu@email.com"
                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm
                           placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50
                           focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  Senha
                </label>
                <Link href="/esqueci-senha"
                  className="text-xs text-text-secondary hover:text-accent transition-colors">
                  Esqueci a senha
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
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

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" name="rememberme" value="forever" className="sr-only peer" />
                <div className="w-10 h-6 bg-white/5 border border-border rounded-full transition-all
                                peer-checked:bg-accent peer-checked:border-accent" />
                <div className="absolute top-1 left-1 w-4 h-4 bg-white/40 rounded-full transition-all
                                peer-checked:translate-x-4 peer-checked:bg-black" />
              </div>
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                Manter conectado
              </span>
            </label>

            <button
              type="submit"
              disabled={fetchingNonce || loading}
              className="w-full bg-accent text-black font-bold py-3.5 rounded-xl hover:bg-yellow-300
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 text-sm">
              {loading || fetchingNonce
                ? <><Loader2 size={16} className="animate-spin" /> Aguarde...</>
                : <><LogIn size={16} /> Entrar</>}
            </button>
          </form>
        )}

        {/* ── REGISTRO ── */}
        {tab === 'register' && (
          <form
            action={WP_LOGIN}
            method="POST"
            onSubmit={() => setLoading(true)}
            className="bg-card border border-border rounded-2xl p-8 space-y-5">

            <input type="hidden" name="woocommerce-register-nonce" value={registerNonce} />
            <input type="hidden" name="_wp_http_referer" value={referer} />
            <input type="hidden" name="register" value="Register" />
            <input type="hidden" name="redirect" value={redirectParam || `${AUTH_SYNC}?dest=${encodeURIComponent(WP_DASHBOARD)}`} />

            {erro === 'registro' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>Não foi possível criar a conta. O e-mail pode já estar cadastrado.</span>
              </div>
            )}

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
                  type={showRegPwd ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm
                             placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50
                             focus:ring-1 focus:ring-accent/20 transition-all pr-11"
                />
                <button type="button" onClick={() => setShowRegPwd(!showRegPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors p-1">
                  {showRegPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-text-secondary bg-white/[0.02] border border-border rounded-xl p-3">
              <Shield size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Ao criar sua conta você concorda com os{' '}
                <Link href="/termos" className="text-accent hover:underline">Termos</Link>
                {' '}e{' '}
                <Link href="/privacidade" className="text-accent hover:underline">Política de Privacidade</Link>.
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
                : <><UserPlus size={16} /> Criar conta grátis</>}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-text-secondary/50 mt-6">
          {tab === 'login'
            ? <>Não tem conta? <button onClick={() => setTab('register')} className="text-accent hover:underline font-semibold">Criar conta grátis</button></>
            : <>Já tem conta? <button onClick={() => setTab('login')} className="text-accent hover:underline font-semibold">Entrar</button></>}
        </p>

      </div>
    </div>
  )
}

export default function EntrarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <EntrarContent />
    </Suspense>
  )
}
