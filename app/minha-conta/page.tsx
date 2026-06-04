'use client'
import { useEffect } from 'react'
import { Zap, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function MinhaContaPage() {
  useEffect(() => {
    // Redireciona para o WP login após 1s se não estiver logado
    const timer = setTimeout(() => {
      window.location.href = 'https://wp.veloxhub.com.br/minha-conta/'
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Zap size={28} className="text-black" fill="black" />
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-3">Entrando na sua conta</h1>
        <p className="text-text-secondary mb-8">Redirecionando para o portal do assinante...</p>
        <div className="flex gap-3 justify-center">
          <a href="https://wp.veloxhub.com.br/minha-conta/"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors">
            <LogIn size={16} /> Acessar agora
          </a>
          <Link href="/planos"
            className="inline-flex items-center gap-2 border border-border text-text-secondary px-6 py-3 rounded-xl hover:border-accent/30 hover:text-text-primary transition-colors">
            Ver planos
          </Link>
        </div>
        <p className="text-xs text-text-secondary mt-6">
          Não tem conta? <Link href="/planos" className="text-accent hover:underline">Assine agora</Link>
        </p>
      </div>
    </div>
  )
}
