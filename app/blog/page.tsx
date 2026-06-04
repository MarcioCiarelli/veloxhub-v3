import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { getPosts, getFeaturedImage, getPostCategory, getPostCategorySlug, formatDate, readingTime, stripHtml } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Blog — Tecnologia, IA e Automação',
  description: 'Artigos sobre inteligência artificial, automação, finanças e produtividade para empreendedores digitais.',
}

const CAT_COLORS: Record<string, string> = {
  'inteligencia-artificial': '#FFD400',
  'tecnologia': '#60A5FA',
  'financas': '#34D399',
  'produtividade': '#A78BFA',
  'marketing': '#F472B6',
  'negocios': '#FB923C',
}

export default async function BlogPage() {
  const posts = await getPosts({ per_page: 18 }).catch(() => [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Blog</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Todos os artigos</h1>
        <p className="text-text-secondary max-w-xl">Conteúdo sobre IA, automação, finanças e produtividade para empreendedores digitais.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => {
          const img = getFeaturedImage(post)
          const cat = getPostCategory(post)
          const catSlug = getPostCategorySlug(post)
          const color = CAT_COLORS[catSlug] ?? '#FFD400'
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
                <Link href={`/categoria/${catSlug}`}
                  className="text-xs font-bold uppercase tracking-widest mb-2 block hover:opacity-80 transition-opacity"
                  style={{ color }}>
                  {cat}
                </Link>
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
    </div>
  )
}
