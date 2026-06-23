'use client'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Zap, LogIn, AlertCircle } from 'lucide-react'
import Link from 'next/link'

function EntrarContent() {
  const searchParams = useSearchParams()
  const erro = searchParams.get('erro')

  useEffect(() => {
    if (!erro) {
      const timer = setTimeout(() => {
        window.location.href = 'https://wp.veloxhub.com.br/minha-conta/?vx_nonce=1'
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [erro])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Zap size={28} className="text-black" fill="black" />
        </div>

        {erro ? (
          <>
            <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
              <AlertCircle size={18} />
              <span className="text-sm font-semibold">
                {erro === 'credenciais' ? 'Email ou senha incorretos.' : 'Erro ao criar conta. Tente novamente.'}
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-3">Entrar na sua conta</h1>
            <p className="text-text-secondary mb-8">Acesse o portal do assinante VeloxHub.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-black tracking-tight mb-3">Entrando...</h1>
            <p className="text-text-secondary mb-8">Redirecionando para o portal do assinante.</p>
          </>
        )}

        <div className="flex gap-3 justify-center">
          <a href="https://wp.veloxhub.com.br/minha-conta/?vx_nonce=1"
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
