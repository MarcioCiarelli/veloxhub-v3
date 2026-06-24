'use client'
import { useState } from 'react'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Zap, LogIn, UserPlus, Eye, EyeOff, Shield } from 'lucide-react'
import Link from 'next/link'

function EntrarContent() {
  const searchParams = useSearchParams()
  const erro = searchParams.get('erro')
  const tab = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(tab === 'criar' ? 'register' : 'login')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [registerData, setRegisterData] = useState({ email: '', password: '' })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginData.username || !loginData.password) return
    setLoading(true)

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://wp.veloxhub.com.br/wp-login.php'
    form.style.display = 'none'

    const fields: Record<string, string> = {
      log: loginData.username,
      pwd: loginData.password,
      'wp-submit': 'Entrar',
      redirect_to: 'https://wp.veloxhub.com.br/minha-conta/',
    }
    if (rememberMe) fields.rememberme = 'forever'

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registerData.email || !registerData.password) return
    if (registerData.password.length < 8) {
      setRegisterError('A senha deve ter no mínimo 8 caracteres.')
      return
    }
    setLoading(true)
    setRegisterError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      })
      const data = await res.json()

      if (!res.ok) {
        setRegisterError(data.error || 'Erro ao criar conta. Tente novamente.')
        setLoading(false)
        return
      }

      setRegisterSuccess(true)
      setTimeout(() => {
        setLoginData({ username: registerData.email, password: registerData.password })
        setActiveTab('login')
        setRegisterSuccess(false)
      }, 2000)
    } catch {
      setRegisterError('Erro de conexão. Tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-5">
            <Zap size={28} className="text-black" fill="black" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            {activeTab === 'login' ? 'Entrar na sua conta' : 'Criar sua conta'}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-card border border-border rounded-xl p-1 mb-6">
          <button
            onClick={() => { setActiveTab('login'); setRegisterError('') }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'login'
                ? 'bg-accent text-black shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <LogIn size={16} />
            Entrar
          </button>
          <button
            onClick={() => { setActiveTab('register'); setRegisterError('') }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'register'
                ? 'bg-accent text-black shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <UserPlus size={16} />
            Criar conta
          </button>
        </div>

        {/* Error banner */}
        {erro && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 text-center">
            {erro === 'credenciais' ? 'Email ou senha incorretos.' : 'Erro ao processar. Tente novamente.'}
          </div>
        )}

        {/* Register success */}
        {registerSuccess && (
          <div className="mb-4 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-sm text-green-400 text-center">
            Conta criada com sucesso! Redirecionando para login...
          </div>
        )}

        {/* Form card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-text-secondary mb-2">
                  E-MAIL OU USUÁRIO
                </label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="seu@email.com"
                  required
                  autoComplete="username"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold tracking-widest text-text-secondary">
                    SENHA
                  </label>
                  <Link href="/esqueci-senha" className="text-xs text-text-secondary hover:text-accent transition-colors">
                    Esqueci a senha
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 bg-bg border border-border rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <button
                  type="button"
                  role="switch"
                  aria-checked={rememberMe}
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                    rememberMe ? 'bg-accent' : 'bg-border'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    rememberMe ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  Manter conectado
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-accent text-black font-bold py-3.5 rounded-xl hover:bg-accent-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5"
              >
                <LogIn size={18} />
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-text-secondary mb-2">
                  E-MAIL
                </label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-text-secondary mb-2">
                  SENHA
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 bg-bg border border-border rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Register error */}
              {registerError && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                  {registerError}
                </div>
              )}

              {/* Terms */}
              <div className="flex items-start gap-3 px-4 py-3 bg-accent/5 border border-accent/10 rounded-xl">
                <Shield size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  Ao criar sua conta você concorda com os{' '}
                  <Link href="/termos" className="text-accent hover:underline">Termos</Link>
                  {' '}e{' '}
                  <Link href="/privacidade" className="text-accent hover:underline">Política de Privacidade</Link>.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-accent text-black font-bold py-3.5 rounded-xl hover:bg-accent-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5"
              >
                <UserPlus size={18} />
                {loading ? 'Criando conta...' : 'Criar conta grátis'}
              </button>
            </form>
          )}
        </div>

        {/* Bottom link */}
        <p className="text-center text-sm text-text-secondary mt-6">
          {activeTab === 'login' ? (
            <>
              Não tem conta?{' '}
              <button onClick={() => setActiveTab('register')} className="text-accent font-semibold hover:underline">
                Criar conta grátis
              </button>
            </>
          ) : (
            <>
              Já tem conta?{' '}
              <button onClick={() => setActiveTab('login')} className="text-accent font-semibold hover:underline">
                Entrar
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default function EntrarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-text-secondary">Carregando...</div>
      </div>
    }>
      <EntrarContent />
    </Suspense>
  )
}
