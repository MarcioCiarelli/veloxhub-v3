import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills para Claude — 20 Automações Prontas',
  description: 'Instale 20 Skills no Claude e transforme-o em um especialista sênior. Social Media, SEO, Copywriting, Finanças e mais. R$47 apenas.',
  openGraph: {
    title: 'VeloxHub Skills — Pack de 20 Skills para o Claude',
    description: 'Instala em segundos. Usa para sempre. O Claude vira um funcionário que não dorme.',
  },
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children
}
