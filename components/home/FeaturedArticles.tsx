import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { getPosts, getFeaturedImage, getPostCategory, formatDate, readingTime, stripHtml } from '@/lib/wordpress'
import type { WPPost } from '@/types'

function ArticleCard({ post, featured = false }: { post: WPPost; featured?: boolean }) {
  const img = getFeaturedImage(post)
  const category = getPostCategory(post)
  const date = formatDate(post.date)
  const time = readingTime(post.content?.rendered ?? post.excerpt?.rendered ?? '')
  const excerpt = stripHtml(post.excerpt?.rendered ?? '').slice(0, featured ? 180 : 120)

  if (featured) {
    return (
      <Link href={`/artigo/${post.slug}`}
        className="group block bg-card border border-border rounded-2xl overflow-hidden card-hover">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <Image src={img} alt={stripHtml(post.title.rendered)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 60vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute top-4 left-4 bg-accent text-black text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {category}
          </span>
        </div>
        <div className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <p className="text-text-secondary text-sm leading-relaxed mb-4">{excerpt}...</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{time} min</span>
            </div>
            <span className="text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Ler <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/artigo/${post.slug}`}
      className="group flex gap-4 p-4 rounded-xl border border-border/50 hover:border-border bg-card/50 hover:bg-card transition-all duration-200">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image src={img} alt={stripHtml(post.title.rendered)} fill className="object-cover" sizes="80px" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">{category}</span>
        <h3 className="text-sm font-semibold mt-1 mb-1 group-hover:text-accent transition-colors line-clamp-2 leading-snug"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <span className="flex items-center gap-1"><Clock size={10} />{time} min</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  )
}

export default async function FeaturedArticles() {
  let posts: WPPost[] = []
  try {
    posts = await getPosts({ per_page: 5 })
  } catch {
    return null
  }

  if (!posts.length) return null
  const [featured, ...rest] = posts

  return (
    <section className="py-24 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Conteúdo</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Artigos em destaque</h2>
          </div>
          <Link href="/blog" className="text-sm text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors">
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-6">
          <ArticleCard post={featured} featured />
          <div className="flex flex-col gap-3">
            {rest.map((post) => <ArticleCard key={post.id} post={post} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
