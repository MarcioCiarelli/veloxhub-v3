import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar — Acesse sua conta VeloxHub',
  description: 'Faça login na sua conta VeloxHub para acessar ferramentas premium, dashboards e conteúdo exclusivo.',
}

export default function EntrarLayout({ children }: { children: React.ReactNode }) {
  return children
}
