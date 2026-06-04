'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1000))
    setStatus('success')
  }

  return (
    <section className="py-24 border-t border-border/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 border border-accent/20 rounded-2xl mb-6">
            <Mail size={20} className="text-accent" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Receba novas automações<br />
            <span className="text-gradient">toda semana.</span>
          </h2>

          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Tutoriais, prompts prontos e ferramentas de IA direto no seu email. Sem spam, cancele quando quiser.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle size={18} />
              Inscrição confirmada! Obrigado.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent/40 transition-colors"
              />
              <Button variant="primary" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Enviando...' : <>Assinar <ArrowRight size={14} /></>}
              </Button>
            </form>
          )}

          <p className="text-xs text-text-secondary mt-4 opacity-60">
            Mais de 10.000 leitores já assinaram. Gratuito para sempre.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
