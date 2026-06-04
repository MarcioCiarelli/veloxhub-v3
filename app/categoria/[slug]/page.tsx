import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { getPosts, getCategories, getFeaturedImage, getPostCategory, formatDate, readingTime, stripHtml } from '@/lib/wordpress'

interface Props {
  params: { slug: string }
}

const CATEGORY_META: Record<string, { emoji: string; desc: string; color: string }> = {
  'inteligencia-artificial': { emoji: '🤖', desc: 'ChatGPT, Gemini, Claude e as melhores ferramentas de IA generativa.', color: '#FFD400' },
  'tecnologia': { emoji: '⚡', desc: 'Reviews, tutoriais e dicas de ferramentas digitais.', color: '#60A5FA' },
  'financas': { emoji: '💰', desc: 'Investimentos, renda extra e controle financeiro.', color: '#34D399' },
  'produtividade': { emoji: '🚀', desc: 'Sistemas, hábitos e ferramentas para render mais.', color: '#A78BFA' },
  'marketing': { emoji: '📣', desc: 'Estratégias de conteúdo, tráfego pago e crescimento orgânico.', color: '#F472B6' },
  'negocios': { emoji: '💼', desc: 'Empreendedorismo, gestão e como escalar seu negócio.', color: '#FB923C' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories()
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) return { title: 'Categoria não encontrada' }
  const meta = CATEGORY_META[params.slug]
  return {
    title: `${cat.name} — VeloxHub`,
    description: meta?.desc ?? `Artigos sobre ${cat.name} no VeloxHub.`,
  }
}

export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export default async function CategoryPage({ params }: Props) {
  const categories = await getCategories()
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) notFound()

  const catPosts = await getPosts({ per_page: 20, categories: String(cat.id) }).catch(() => [])
  const meta = CATEGORY_META[params.slug] ?? { emoji: '📄', desc: cat.description, color: '#FFD400' }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

      {/* Category header */}
      <div className="mb-12 pb-12 border-b border-border">
        <div className="text-4xl mb-4">{meta.emoji}</div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3" style={{ color: meta.color }}>
          {cat.name}
        </h1>
        <p className="text-text-secondary text-lg max-w-xl">{meta.desc}</p>
        <p className="text-sm text-text-secondary mt-3">{cat.count} artigos publicados</p>
      </div>

      {/* Posts grid */}
      {catPosts.length === 0 ? (
        <div className="text-center py-20 text-text-secondary">
          <p className="text-lg">Nenhum artigo nesta categoria ainda.</p>
          <Link href="/blog" className="text-accent hover:underline mt-2 inline-block">Ver todos os artigos</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catPosts.map(post => {
            const img = getFeaturedImage(post)
            const postCat = getPostCategory(post)
            const date = formatDate(post.date)
            const time = readingTime(post.content?.rendered ?? post.excerpt?.rendered ?? '')
            const excerpt = stripHtml(post.excerpt?.rendered ?? '').slice(0, 120)

            return (
              <Link key={post.id} href={`/artigo/${post.slug}`}
                className="group block bg-card border border-border rounded-2xl overflow-hidden card-hover">
                <div className="relative h-48 overflow-hidden">
                  <Image src={img} alt={stripHtml(post.title.rendered)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: meta.color }}>{postCat}</span>
                  <h2 className="font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p className="text-xs text-text-secondary line-clamp-2 mb-4">{excerpt}...</p>
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar size={10} />{date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{time} min</span>
                    </div>
                    <span className="text-accent flex items-center gap-1 group-hover:gap-2 transition-all font-semibold">
                      Ler <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
