import Link from 'next/link'
import { Zap } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre o VeloxHub', href: '/sobre' },
      { label: 'Artigos', href: '/blog' },
      { label: 'Contato', href: '/contato' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Área de Membros', href: '/membros' },
    ],
  },
  {
    title: 'Ferramentas',
    links: [
      { label: 'Hub de Ferramentas', href: '/ferramentas' },
      { label: 'Calculadora de Macros', href: '/ferramentas' },
      { label: 'Dashboard do Motorista', href: '/ferramentas' },
      { label: 'Calc. Investimentos', href: '/ferramentas' },
      { label: 'Skills para Claude', href: '/skills' },
      { label: 'Ver Planos', href: '/planos' },
    ],
  },
  {
    title: 'Categorias',
    links: [
      { label: '⚡ Tecnologia & IA', href: '/categoria/inteligencia-artificial' },
      { label: '💰 Finanças', href: '/categoria/financas' },
      { label: '💪 Saúde & Performance', href: '/categoria/saude' },
      { label: '🚀 Produtividade', href: '/categoria/produtividade' },
      { label: '💼 Negócios', href: '/categoria/negocios' },
    ],
  },
  {
    title: 'Planos',
    links: [
      { label: 'Ver todos os Planos', href: '/planos' },
      { label: 'Plano Free', href: '/planos' },
      { label: 'Plano Starter — R$19/mês', href: '/planos' },
      { label: 'Plano Pro — R$49/mês', href: '/planos' },
      { label: 'Minha Conta', href: '/minha-conta' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidade', href: '/privacidade' },
      { label: 'Termos de Uso', href: '/termos' },
      { label: 'Política de Cookies', href: '/cookies' },
    ],
  },
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/veloxhub.oficial', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )},
  { label: 'YouTube', href: 'https://www.youtube.com/@veloxhub.oficial', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )},
  { label: 'TikTok', href: 'https://tiktok.com/@veloxhub.oficial', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  )},
  { label: 'Threads', href: 'https://www.threads.net/@veloxhub.oficial', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.688-1.685-1.76-1.75-3.018-.065-1.33.47-2.47 1.514-3.212.999-.71 2.373-1.086 4.083-1.117.7-.012 1.377.004 2.032.048-.068-.806-.3-1.42-.69-1.83-.517-.55-1.358-.83-2.502-.837h-.026c-.88 0-2.032.237-2.8 1.154l-1.52-1.36C7.43 4.92 9.19 4.14 11.385 4.14c1.683.008 3.036.455 4.021 1.33 1.14 1.013 1.698 2.51 1.752 4.45h.038c1.01.365 1.882.93 2.585 1.674 1.139 1.213 1.71 2.79 1.636 4.55-.09 2.18-1.062 4.13-2.746 5.508-1.6 1.31-3.714 1.99-6.103 2.01h-.007l-.38-.012z"/>
    </svg>
  )},
]

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-black" fill="black" />
              </div>
              <span className="font-bold text-base tracking-tight">
                VELOX<span className="text-accent">HUB</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-[200px]">
              Tecnologia, IA e automação para acelerar sua evolução digital.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 text-center text-xs text-text-secondary/60">
          <span>© {new Date().getFullYear()} VeloxHub. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
