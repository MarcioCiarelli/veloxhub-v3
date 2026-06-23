import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planos VeloxHub — Free, Starter, Pro e Business',
  description: 'Escolha o plano ideal para você. Ferramentas premium, calculadoras, dashboards e suporte. A partir de R$19/mês.',
  openGraph: {
    title: 'Planos VeloxHub — Ferramentas premium de IA',
    description: 'Calculadora de Macros, Dashboard do Motorista, Investimentos e mais. A partir de R$19/mês.',
  },
}

export default function PlanosLayout({ children }: { children: React.ReactNode }) {
  return children
}
