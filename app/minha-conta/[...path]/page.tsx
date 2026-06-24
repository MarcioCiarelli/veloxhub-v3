'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  params: { path?: string[] }
}

export default function MinhaContaPathPage({ params }: Props) {
  const router = useRouter()
  useEffect(() => {
    const sub = params.path?.join('/') ?? ''
    // Keep lost-password working — forward to WP
    if (sub === 'lost-password') {
      window.location.href = 'https://wp.veloxhub.com.br/minha-conta/lost-password/'
      return
    }
    // Everything else → membros (if logged in) or /entrar
    try {
      const raw = localStorage.getItem('vhd_logged')
      if (raw) {
        const { ts } = JSON.parse(raw)
        if (Date.now() - ts < 7 * 24 * 3600 * 1000) {
          window.location.href = 'https://wp.veloxhub.com.br/membros'
          return
        }
      }
    } catch {}
    router.replace('/entrar')
  }, [params.path, router])

  return null
}
