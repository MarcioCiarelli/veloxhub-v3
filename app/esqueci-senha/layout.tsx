import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recuperar Senha — VeloxHub',
  description: 'Recupere o acesso à sua conta VeloxHub. Enviaremos um link de redefinição de senha para seu email.',
}

export default function EsqueciSenhaLayout({ children }: { children: React.ReactNode }) {
  return children
}
