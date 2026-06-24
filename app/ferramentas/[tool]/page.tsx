import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ToolEmbed from './ToolEmbed'

interface Props {
  params: { tool: string }
}

const TOOLS: Record<string, {
  name: string
  desc: string
  icon: string
  plan: 'free' | 'starter' | 'pro'
}> = {
  'calculadora-macros': {
    name: 'Calculadora de Macros',
    desc: 'Descubra exatamente quanto de proteína, carbo e gordura você precisa por dia para atingir seu objetivo.',
    icon: '💪',
    plan: 'starter',
  },
  'dashboard-motorista': {
    name: 'Dashboard do Motorista',
    desc: 'Acompanhe ganhos, gastos com combustível e lucro real por corrida em tempo real.',
    icon: '🚗',
    plan: 'starter',
  },
  'calculadora-investimentos': {
    name: 'Calculadora de Investimentos',
    desc: 'Simule juros compostos e visualize seu patrimônio em 5, 10 e 20 anos com diferentes cenários.',
    icon: '📊',
    plan: 'pro',
  },
  'calculadora-fire': {
    name: 'Calculadora FIRE',
    desc: 'Descubra quando você pode atingir independência financeira e se aposentar mais cedo.',
    icon: '🔥',
    plan: 'free',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = TOOLS[params.tool]
  if (!tool) return { title: 'Ferramenta não encontrada' }
  return {
    title: `${tool.name} — VeloxHub`,
    description: tool.desc,
  }
}

export function generateStaticParams() {
  return Object.keys(TOOLS).map(tool => ({ tool }))
}

export const dynamicParams = false

export default function ToolPage({ params }: Props) {
  const tool = TOOLS[params.tool]
  if (!tool) notFound()

  const wpUrl = `https://wp.veloxhub.com.br/ferramentas/${params.tool}?velox_embed=1`

  const planLabel = {
    free: { text: 'Grátis', cls: 'bg-green-500/10 text-green-400 border-green-500/20' },
    starter: { text: 'Starter+', cls: 'bg-accent/10 text-accent border-accent/20' },
    pro: { text: 'Pro+', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  }[tool.plan]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-6 flex-wrap">
        <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span className="text-border">/</span>
        <Link href="/ferramentas" className="hover:text-text-primary transition-colors">Ferramentas</Link>
        <span className="text-border">/</span>
        <span className="text-text-primary">{tool.name}</span>
      </nav>

      {/* Header — mesma estrutura das páginas de categoria */}
      <div className="mb-8 pb-8 border-b border-border">
        <div className="text-4xl mb-4">{tool.icon}</div>
        <div className="flex items-start gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{tool.name}</h1>
              <span className={`text-xs border px-2.5 py-1 rounded-full font-bold uppercase ${planLabel.cls}`}>
                {planLabel.text}
              </span>
            </div>
            <p className="text-text-secondary text-lg max-w-xl">{tool.desc}</p>
          </div>
        </div>
      </div>

      {/* Tool embed */}
      <ToolEmbed url={wpUrl} toolName={tool.name} />

      {/* Bottom nav — mesma estrutura das páginas de categoria */}
      <div className="mt-10 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
        <Link href="/ferramentas"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft size={14} /> Ver todas as ferramentas
        </Link>
        {tool.plan !== 'free' && (
          <Link href="/planos"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors font-semibold">
            Assinar para acessar <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}
