import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { getPost, getPosts, getFeaturedImage, getPostCategory, getPostCategorySlug, formatDate, readingTime, stripHtml } from '@/lib/wordpress'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Artigo não encontrado' }
  const desc = stripHtml(post.excerpt?.rendered ?? '').slice(0, 160)
  return {
    title: stripHtml(post.title.rendered),
    description: desc,
    openGraph: {
      title: stripHtml(post.title.rendered),
      description: desc,
      images: [getFeaturedImage(post)],
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const img = getFeaturedImage(post)
  const category = getPostCategory(post)
  const categorySlug = getPostCategorySlug(post)
  const date = formatDate(post.date)
  const time = readingTime(post.content?.rendered ?? '')

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
        <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-text-primary transition-colors">Blog</Link>
        <span>/</span>
        <Link href={`/categoria/${categorySlug}`} className="text-accent hover:text-accent-hover transition-colors">{category}</Link>
      </nav>

      {/* Category badge */}
      <div className="mb-4">
        <Link href={`/categoria/${categorySlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
          <Tag size={10} />
          {category}
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-text-secondary mb-8 pb-8 border-b border-border">
        <span className="flex items-center gap-1.5"><Calendar size={13} />{date}</span>
        <span className="flex items-center gap-1.5"><Clock size={13} />{time} min de leitura</span>
      </div>

      {/* Featured image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10">
        <Image src={img} alt={stripHtml(post.title.rendered)} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      {/* Content */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-text-secondary prose-p:leading-relaxed
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-text-primary
          prose-ul:text-text-secondary prose-ol:text-text-secondary
          prose-li:mb-1
          prose-blockquote:border-accent prose-blockquote:text-text-secondary
          prose-code:bg-card prose-code:text-accent prose-code:px-1 prose-code:rounded"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* CTA */}
      <div className="mt-16 p-6 bg-card border border-border rounded-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Skills para Claude</p>
        <h3 className="text-xl font-black mb-2">Automatize seu conteúdo com IA</h3>
        <p className="text-text-secondary text-sm mb-4">20 skills prontas para publicar em 5 redes sociais automaticamente.</p>
        <Link href="/skills.html"
          className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-accent-hover transition-colors">
          Ver Skills — R$47
        </Link>
      </div>

      {/* Back link */}
      <div className="mt-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft size={14} /> Voltar para o Blog
        </Link>
      </div>
    </article>
  )
}
