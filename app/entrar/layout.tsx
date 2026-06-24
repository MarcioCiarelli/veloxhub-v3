import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar ou Criar Conta — VeloxHub',
  description: 'Faça login ou crie sua conta gratuita no VeloxHub. Acesse ferramentas premium, dashboards e conteúdo exclusivo.',
}

export default function EntrarLayout({ children }: { children: React.ReactNode }) {
  return children
}
