'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { Zap, Lock, ArrowRight } from 'lucide-react'

const TOOLS = [
  { name: 'Saúde & Hábitos', desc: 'Peso, sono, água, IMC e % BF com gráficos de evolução.', icon: '❤️', plan: 'Starter' },
  { name: 'Carreira & Metas', desc: 'Registre objetivos, conquistas e evolução profissional.', icon: '🚀', plan: 'Starter' },
  { name: 'Finanças Pessoais', desc: 'Controle receitas, despesas, contas fixas e saldo bancário.', icon: '💰', plan: 'Pro' },
  { name: 'Motorista App', desc: 'Ganho líquido, R$/hora, km rodados e custo por km.', icon: '🚗', plan: 'Pro' },
  { name: 'Investimentos', desc: 'Portfólio com cotações ao vivo B3 + EUA e alocação por classe.', icon: '📈', plan: 'Pro' },
  { name: 'Contabilidade', desc: 'DRE, faturamento e gestão empresarial para MEI e CNPJ.', icon: '📋', plan: 'Business' },
]

export default function MembrosPage() {
  useEffect(() => {
    window.location.href = 'https://wp.veloxhub.com.br/minha-conta/'
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Zap size={24} className="text-black" fill="black" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-3">Área de Membros</h1>
        <p className="text-text-secondary">Redirecionando para o portal do assinante...</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={18} className="text-accent" />
          <h2 className="font-bold">Ferramentas exclusivas para assinantes</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map(tool => (
            <div key={tool.name} className="bg-bg border border-border/50 rounded-xl p-4">
              <div className="text-2xl mb-3">{tool.icon}</div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-sm">{tool.name}</h3>
                <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded font-semibold">{tool.plan}+</span>
              </div>
              <p className="text-xs text-text-secondary">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-text-secondary mb-4">Para acessar, faça login na sua conta</p>
        <div className="flex gap-3 justify-center">
          <a href="https://wp.veloxhub.com.br/minha-conta/"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors">
            Fazer login <ArrowRight size={14} />
          </a>
          <Link href="/planos"
            className="inline-flex items-center gap-2 border border-border text-text-secondary px-6 py-3 rounded-xl hover:border-accent/30 hover:text-text-primary transition-colors">
            Ver planos
          </Link>
        </div>
      </div>
    </div>
  )
}
