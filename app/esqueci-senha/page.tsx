'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Zap, Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const WP_BASE = 'https://wp.veloxhub.com.br'

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch(`${WP_BASE}/wp-login.php?action=lostpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `user_login=${encodeURIComponent(email)}&redirect_to=&wp-submit=Redefinir+senha`,
      })
      if (res.ok || res.status === 302) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg('Erro ao enviar. Verifique o e-mail digitado.')
      }
    } catch {
      setStatus('success')
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap size={24} className="text-black" fill="black" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            Recuperar senha
          </h1>
          <p className="text-sm text-text-secondary">
            Digite seu e-mail para receber o link de recuperacao
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">

          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-emerald-400" />
              </div>
              <h2 className="text-lg font-bold mb-2">E-mail enviado!</h2>
              <p className="text-sm text-text-secondary mb-6">
                Se o e-mail estiver cadastrado, voce recebera um link para redefinir sua senha.
                Verifique tambem a pasta de spam.
              </p>
              <Link
                href="/entrar"
                className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-xl text-sm hover:bg-yellow-300 transition-all">
                <ArrowLeft size={14} /> Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400 flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
                  E-mail ou usuario
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="seu@email.com"
                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm
                               placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50
                               focus:ring-1 focus:ring-accent/20 transition-all pl-11"
                  />
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-accent text-black font-bold py-3.5 rounded-xl hover:bg-yellow-300
                           transition-all disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2 text-sm">
                {status === 'loading'
                  ? <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                  : 'Enviar link de recuperacao'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-text-secondary/50 mt-6">
          Lembrou a senha?{' '}
          <Link href="/entrar" className="text-accent hover:underline font-semibold">
            Voltar para o login
          </Link>
        </p>

      </div>
    </div>
  )
}
