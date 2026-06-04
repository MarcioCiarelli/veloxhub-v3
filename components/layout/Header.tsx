'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Artigos', href: '/blog' },
  {
    label: 'Categorias',
    href: '#',
    dropdown: [
      { label: '⚡ IA & Automação', href: '/categoria/ia' },
      { label: '📈 Marketing', href: '/categoria/marketing' },
      { label: '🔍 SEO', href: '/categoria/seo' },
      { label: '🚀 Produtividade', href: '/categoria/produtividade' },
      { label: '💰 Monetização', href: '/categoria/monetizacao' },
      { label: '💼 Negócios', href: '/categoria/negocios' },
    ],
  },
  { label: 'Ferramentas', href: '/ferramentas' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Comunidade', href: '/comunidade' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/95 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-black" fill="black" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                VELOX<span className="text-accent">HUB</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  {item.dropdown ? (
                    <button className="flex items-center gap-1 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5">
                      {item.label}
                      <ChevronDown size={13} className={cn('transition-transform', activeDropdown === item.label && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link href={item.href}
                      className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5 block">
                      {item.label}
                    </Link>
                  )}

                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-xl shadow-black/40 p-1.5 animate-fade-in">
                      {item.dropdown.map((sub) => (
                        <Link key={sub.href} href={sub.href}
                          className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="sm" href="https://wp.veloxhub.com.br/minha-conta/">
                Entrar
              </Button>
              <Button variant="primary" size="sm" href="/planos">
                Assinar Agora
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link href={item.dropdown ? '#' : item.href}
                    className="block px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => !item.dropdown && setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 flex flex-col gap-0.5 mb-1">
                      {item.dropdown.map((sub) => (
                        <Link key={sub.href} href={sub.href}
                          className="block px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                          onClick={() => setMobileOpen(false)}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2 pt-3 border-t border-border mt-2">
                <Button variant="outline" size="sm" href="https://wp.veloxhub.com.br/minha-conta/" className="flex-1">
                  Entrar
                </Button>
                <Button variant="primary" size="sm" href="/planos" className="flex-1">
                  Assinar
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
