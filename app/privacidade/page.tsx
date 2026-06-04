import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como o VeloxHub coleta, usa e protege seus dados pessoais.',
}

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Legal</p>
        <h1 className="text-4xl font-black tracking-tight mb-3">Política de Privacidade</h1>
        <p className="text-text-secondary">Última atualização: junho de 2026</p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-p:text-text-secondary prose-a:text-accent prose-strong:text-text-primary">
        <h2>1. Informações que coletamos</h2>
        <p>O VeloxHub coleta informações que você nos fornece diretamente, como nome e e-mail ao criar uma conta ou assinar nossa newsletter, além de dados de navegação coletados automaticamente.</p>

        <h2>2. Como usamos suas informações</h2>
        <p>Utilizamos suas informações para:</p>
        <ul>
          <li>Fornecer, operar e melhorar nossos serviços</li>
          <li>Processar pagamentos e gerenciar assinaturas</li>
          <li>Enviar comunicações relevantes (com seu consentimento)</li>
          <li>Personalizar sua experiência na plataforma</li>
          <li>Cumprir obrigações legais</li>
        </ul>

        <h2>3. Compartilhamento de dados</h2>
        <p>Não vendemos seus dados pessoais. Podemos compartilhá-los apenas com:</p>
        <ul>
          <li><strong>Processadores de pagamento</strong> (Mercado Pago) para processar transações</li>
          <li><strong>Provedores de serviço</strong> que nos ajudam a operar a plataforma</li>
          <li><strong>Autoridades legais</strong> quando exigido por lei</li>
        </ul>

        <h2>4. Cookies</h2>
        <p>Utilizamos cookies para melhorar sua experiência. Consulte nossa <a href="/cookies">Política de Cookies</a> para mais detalhes.</p>

        <h2>5. Seus direitos (LGPD)</h2>
        <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
        <ul>
          <li>Acessar seus dados pessoais</li>
          <li>Corrigir dados incompletos ou desatualizados</li>
          <li>Solicitar a exclusão dos seus dados</li>
          <li>Revogar consentimento a qualquer momento</li>
          <li>Portabilidade dos dados</li>
        </ul>

        <h2>6. Segurança</h2>
        <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.</p>

        <h2>7. Contato</h2>
        <p>Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato: <a href="mailto:contato@veloxhub.com.br">contato@veloxhub.com.br</a></p>
      </div>
    </div>
  )
}
