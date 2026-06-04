import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Como o VeloxHub utiliza cookies e tecnologias similares.',
}

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Legal</p>
        <h1 className="text-4xl font-black tracking-tight mb-3">Política de Cookies</h1>
        <p className="text-text-secondary">Última atualização: junho de 2026</p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-p:text-text-secondary prose-a:text-accent prose-strong:text-text-primary">
        <h2>O que são cookies?</h2>
        <p>Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles nos ajudam a lembrar suas preferências e melhorar sua experiência.</p>

        <h2>Tipos de cookies que usamos</h2>

        <h2>Cookies essenciais</h2>
        <p>Necessários para o funcionamento básico do site. Incluem cookies de sessão e autenticação. Não podem ser desativados.</p>

        <h2>Cookies de desempenho</h2>
        <p>Nos ajudam a entender como os visitantes interagem com o site através de análises anônimas (Google Analytics). Você pode optar por não participar.</p>

        <h2>Cookies de funcionalidade</h2>
        <p>Lembram suas preferências como tema (claro/escuro) e configurações de conta para personalizar sua experiência.</p>

        <h2>Cookies de publicidade</h2>
        <p>Usados para exibir anúncios relevantes via Google AdSense. Você pode gerenciar suas preferências em <a href="https://adssettings.google.com" target="_blank" rel="noopener">adssettings.google.com</a>.</p>

        <h2>Como controlar cookies</h2>
        <p>Você pode controlar e/ou excluir cookies nas configurações do seu navegador. Note que desabilitar alguns cookies pode afetar funcionalidades do site.</p>

        <h2>Contato</h2>
        <p>Dúvidas sobre nossa política de cookies: <a href="mailto:contato@veloxhub.com.br">contato@veloxhub.com.br</a></p>
      </div>
    </div>
  )
}
