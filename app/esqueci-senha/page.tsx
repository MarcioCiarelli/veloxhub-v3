'use client'
import { useState } from 'react'
import { Zap, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    window.location.href = `https://wp.veloxhub.com.br/minha-conta/lost-password/?vx_nonce=1&reset_email=${encodeURIComponent(email)}`
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Zap size={28} className="text-black" fill="black" />
        </div>

        <h1 className="text-3xl font-black tracking-tight mb-3">Recuperar senha</h1>
        <p className="text-text-secondary mb-8">
          Informe seu email e enviaremos um link para redefinir sua senha.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Enviar link de recuperação
          </button>
        </form>

        <Link href="/entrar"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors">
          <ArrowLeft size={14} /> Voltar para login
        </Link>
      </div>
    </div>
  )
}
