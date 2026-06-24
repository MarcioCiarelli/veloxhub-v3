'use client'
import { useEffect } from 'react'
import { Zap, Loader2 } from 'lucide-react'

const WP_LOGOUT = 'https://wp.veloxhub.com.br/?velox_logout=1'

export default function LogoutPage() {
  useEffect(() => {
    try { localStorage.removeItem('vhd_logged') } catch {}
    window.location.replace(WP_LOGOUT)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Zap size={20} className="text-black" fill="black" />
        </div>
        <Loader2 size={20} className="animate-spin text-accent mx-auto" />
        <p className="text-text-secondary text-sm mt-3">Saindo...</p>
      </div>
    </div>
  )
}
