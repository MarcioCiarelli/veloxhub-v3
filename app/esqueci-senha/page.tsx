'use client'
import { useState } from 'react'
import { Zap, Mail, ArrowLeft, Send } from 'lucide-react'
import Link from 'next/link'

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    window.location.href = `https://wp.veloxhub.com.br/minha-conta/lost-password/?vx_nonce=1&reset_email=${encodeURIComponent(email)}`
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-5">
            <Zap size={28} className="text-black" fill="black" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Recuperar senha</h1>
          <p className="text-text-secondary text-sm text-center">
            Informe seu email e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold tracking-widest text-text-secondary mb-2">
                E-MAIL
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 bg-bg border border-border rounded-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent text-black font-bold py-3.5 rounded-xl hover:bg-accent-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5"
            >
              <Send size={18} />
              {loading ? 'Enviando...' : 'Enviar link de recuperação'}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/entrar"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors">
            <ArrowLeft size={14} /> Voltar para login
          </Link>
        </div>
      </div>
    </div>
  )
}
