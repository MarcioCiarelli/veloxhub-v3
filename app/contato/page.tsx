import type { Metadata } from 'next'
import { Mail, Instagram, Youtube, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contato — VeloxHub',
  description: 'Entre em contato com o VeloxHub. Estamos prontos para responder dúvidas, parcerias e suporte.',
}

const CHANNELS = [
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contato@veloxhub.com.br',
    href: 'mailto:contato@veloxhub.com.br',
    desc: 'Respondemos em até 24h úteis',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@veloxhub.oficial',
    href: 'https://instagram.com/veloxhub.oficial',
    desc: 'DMs abertas para parcerias e dúvidas rápidas',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    value: '@veloxhub.oficial',
    href: 'https://www.youtube.com/@veloxhub.oficial',
    desc: 'Tutoriais, reviews e conteúdo em vídeo',
  },
  {
    icon: MessageCircle,
    label: 'Threads',
    value: '@veloxhub.oficial',
    href: 'https://www.threads.net/@veloxhub.oficial',
    desc: 'Atualizações e conversas em tempo real',
  },
]

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Fale conosco</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Contato</h1>
        <p className="text-text-secondary text-lg max-w-xl">
          Dúvidas, parcerias, suporte ou só um oi — escolha o canal que preferir.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-14">
        {CHANNELS.map(({ icon: Icon, label, value, href, desc }) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="group flex gap-4 bg-card border border-border rounded-2xl p-5
                       hover:border-accent/30 hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Icon size={18} className="text-accent" />
            </div>
            <div>
              <div className="text-xs text-text-secondary uppercase tracking-widest font-semibold mb-0.5">{label}</div>
              <div className="font-bold text-sm mb-1">{value}</div>
              <div className="text-xs text-text-secondary">{desc}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-black text-lg tracking-tight mb-2">Assuntos frequentes</h2>
        <ul className="text-text-secondary text-sm space-y-2 mt-3">
          <li className="flex gap-2"><span className="text-accent">→</span> Suporte a assinantes: <a href="mailto:contato@veloxhub.com.br" className="text-accent hover:underline">contato@veloxhub.com.br</a></li>
          <li className="flex gap-2"><span className="text-accent">→</span> Parcerias e publicidade: <a href="mailto:contato@veloxhub.com.br" className="text-accent hover:underline">contato@veloxhub.com.br</a></li>
          <li className="flex gap-2"><span className="text-accent">→</span> Imprensa: <a href="mailto:contato@veloxhub.com.br" className="text-accent hover:underline">contato@veloxhub.com.br</a></li>
          <li className="flex gap-2"><span className="text-accent">→</span> Cancelamento de plano: acesse <a href="/minha-conta" className="text-accent hover:underline">/minha-conta</a></li>
        </ul>
      </div>
    </div>
  )
}
