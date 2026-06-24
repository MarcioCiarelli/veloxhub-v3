'use client'
import Link from 'next/link'
import { Zap, Lock, ArrowRight, LayoutDashboard, DollarSign, Car, Heart, TrendingUp, Briefcase, Calculator, Settings, Crown, LogOut } from 'lucide-react'

const SECTIONS = [
  { name: 'Dashboard', desc: 'Visão geral com KPIs e resumo de todas as seções.', icon: LayoutDashboard, color: 'text-accent' },
  { name: 'Finanças Pessoais', desc: 'Receitas, despesas, orçamento e financiamento completo.', icon: DollarSign, color: 'text-yellow-400' },
  { name: 'Motorista App', desc: 'Ganhos, gastos com combustível e lucro real por corrida.', icon: Car, color: 'text-blue-400' },
  { name: 'Saúde & Esportes', desc: 'Peso, treinos, nutrição e calculadora de macros.', icon: Heart, color: 'text-green-400' },
  { name: 'Investimentos', desc: 'Ações, FIIs, cripto e simulador de juros compostos.', icon: TrendingUp, color: 'text-emerald-400' },
  { name: 'Carreira', desc: 'Objetivos profissionais, habilidades e plano de crescimento.', icon: Briefcase, color: 'text-blue-300' },
  { name: 'Contabilidade', desc: 'INSS, IRPF, DAS MEI e controle tributário.', icon: Calculator, color: 'text-orange-400' },
  { name: 'Upgrade', desc: 'Compare planos e faça upgrade para desbloquear mais.', icon: Crown, color: 'text-purple-400' },
  { name: 'Configurações', desc: 'Perfil, senha, endereço e preferências da conta.', icon: Settings, color: 'text-text-secondary' },
]

export default function MembrosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Zap size={24} className="text-black" fill="black" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-3">Área de Membros</h1>
        <p className="text-text-secondary max-w-lg mx-auto">
          Acesse o painel completo do VeloxHub com todas as ferramentas, dashboards e controles da sua conta.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={18} className="text-accent" />
          <h2 className="font-bold">Módulos disponíveis para assinantes</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map(section => {
            const Icon = section.icon
            return (
              <div key={section.name} className="bg-bg border border-border/50 rounded-xl p-4 hover:border-accent/20 transition-colors">
                <div className={`mb-3 ${section.color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-sm mb-1">{section.name}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{section.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-center">
        <p className="text-text-secondary mb-4">Faça login para acessar sua área de membros</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/entrar"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-xl hover:bg-accent-hover transition-all shadow-accent hover:-translate-y-0.5">
            Fazer login <ArrowRight size={14} />
          </Link>
          <Link href="/planos"
            className="inline-flex items-center gap-2 border border-border text-text-secondary px-6 py-3 rounded-xl hover:border-accent/30 hover:text-text-primary transition-colors">
            Ver planos
          </Link>
        </div>
        <p className="text-xs text-text-secondary mt-4">
          Não tem conta? <Link href="/entrar?tab=criar" className="text-accent hover:underline">Criar conta grátis</Link>
        </p>
      </div>
    </div>
  )
}
