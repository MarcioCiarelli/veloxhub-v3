import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos e condições de uso da plataforma VeloxHub.',
}

export default function TermosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Legal</p>
        <h1 className="text-4xl font-black tracking-tight mb-3">Termos de Uso</h1>
        <p className="text-text-secondary">Última atualização: junho de 2026</p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-p:text-text-secondary prose-a:text-accent prose-strong:text-text-primary">
        <h2>1. Aceitação dos termos</h2>
        <p>Ao acessar e usar o VeloxHub, você concorda com estes Termos de Uso. Se não concordar, não utilize nossos serviços.</p>

        <h2>2. Descrição dos serviços</h2>
        <p>O VeloxHub oferece conteúdo sobre tecnologia, IA, finanças e produtividade, além de ferramentas digitais, skills para IA e planos de assinatura com recursos exclusivos.</p>

        <h2>3. Assinaturas e pagamentos</h2>
        <ul>
          <li>Os planos são cobrados mensalmente ou anualmente conforme escolhido</li>
          <li>O cancelamento pode ser feito a qualquer momento, sem multa</li>
          <li>Oferecemos garantia de 7 dias para reembolso total</li>
          <li>Pagamentos processados com segurança pelo Mercado Pago</li>
        </ul>

        <h2>4. Uso permitido</h2>
        <p>Você pode usar nosso conteúdo e ferramentas para fins pessoais e profissionais legítimos. É proibido:</p>
        <ul>
          <li>Reproduzir ou redistribuir nosso conteúdo sem autorização</li>
          <li>Usar nossos serviços para fins ilegais</li>
          <li>Tentar acessar áreas restritas sem autorização</li>
          <li>Compartilhar credenciais de acesso com terceiros</li>
        </ul>

        <h2>5. Propriedade intelectual</h2>
        <p>Todo o conteúdo do VeloxHub — textos, imagens, ferramentas e código — é de nossa propriedade ou licenciado a nós. Ao adquirir nossos produtos, você recebe uma licença de uso pessoal, não exclusiva e intransferível.</p>

        <h2>6. Limitação de responsabilidade</h2>
        <p>O VeloxHub fornece informações educacionais e ferramentas de produtividade. Não nos responsabilizamos por decisões financeiras, de negócios ou outros resultados baseados em nosso conteúdo.</p>

        <h2>7. Alterações nos termos</h2>
        <p>Podemos atualizar estes termos periodicamente. Notificaremos usuários ativos sobre mudanças significativas por e-mail.</p>

        <h2>8. Contato</h2>
        <p>Dúvidas sobre estes termos: <a href="mailto:contato@veloxhub.com.br">contato@veloxhub.com.br</a></p>
      </div>
    </div>
  )
}
