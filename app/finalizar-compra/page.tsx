'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Zap, Loader2 } from 'lucide-react'

function FinalizarContent() {
  const params = useSearchParams()

  useEffect(() => {
    const qs = params.toString()
    const wpUrl = `https://wp.veloxhub.com.br/finalizar-compra/${qs ? '?' + qs : ''}`
    window.location.replace(wpUrl)
  }, [params])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Zap size={20} className="text-black" fill="black" />
        </div>
        <Loader2 size={20} className="animate-spin text-accent mx-auto" />
        <p className="text-text-secondary text-sm mt-3">Redirecionando para o pagamento...</p>
      </div>
    </div>
  )
}

export default function FinalizarCompraPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <FinalizarContent />
    </Suspense>
  )
}
