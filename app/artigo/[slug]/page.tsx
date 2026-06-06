import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight, Zap } from 'lucide-react'
import {
  getPost, getPosts, getFeaturedImage, getPostCategory,
  getPostCategorySlug, formatDate, readingTime, stripHtml
} from '@/lib/wordpress'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Artigo não encontrado' }

  const title = stripHtml(post.title.rendered)
  const desc  = stripHtml(post.excerpt?.rendered ?? '').slice(0, 160)
  const img   = getFeaturedImage(post)
  const cat   = getPostCategory(post)

  return {
    title,
    description: desc,
    keywords: `${cat}, inteligência artificial, VeloxHub, ${title.split(' ').slice(0, 4).join(', ')}`,
    alternates: { canonical: `https://veloxhub.com.br/artigo/${params.slug}` },
    openGraph: {
      title,
      description: desc,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
      type: 'article',
      publishedTime: post.date,
      siteName: 'VeloxHub',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [img],
    },
  }
}

export const dynamicParams = true
export async function generateStaticParams() { return [] }

export default async function ArticlePage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const img          = getFeaturedImage(post)
  const category     = getPostCategory(post)
  const categorySlug = getPostCategorySlug(post)
  const date         = formatDate(post.date)
  const mins         = readingTime(post.content?.rendered ?? '')

  // Artigos relacionados da mesma categoria
  const related = await getPosts({ per_page: 3, categories: String(post.categories?.[0] ?? '') })
    .then(posts => posts.filter(p => p.slug !== params.slug).slice(0, 3))
    .catch(() => [])

  return (
    <>
      {/* Schema.org Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: stripHtml(post.title.rendered),
            description: stripHtml(post.excerpt?.rendered ?? '').slice(0, 160),
            image: img,
            datePublished: post.date,
            dateModified: post.modified ?? post.date,
            author: { '@type': 'Organization', name: 'VeloxHub' },
            publisher: {
              '@type': 'Organization',
              name: 'VeloxHub',
              logo: { '@type': 'ImageObject', url: 'https://veloxhub.com.br/logo.png' },
            },
            mainEntityOfPage: `https://veloxhub.com.br/artigo/${params.slug}`,
          }),
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-6 flex-wrap">
          <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
          <span className="text-border">/</span>
          <Link href="/blog" className="hover:text-text-primary transition-colors">Blog</Link>
          <span className="text-border">/</span>
          <Link href={`/categoria/${categorySlug}`} className="text-accent hover:text-accent-hover transition-colors">
            {category}
          </Link>
        </nav>

        {/* Category badge */}
        <div className="flex justify-center mb-5">
          <Link href={`/categoria/${categorySlug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest
                       text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full
                       hover:bg-accent/20 transition-colors">
            <Tag size={10} />
            {category}
          </Link>
        </div>

        {/* Title — centralizado */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight
                       text-center mb-5"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        {/* Meta — centralizado */}
        <div className="flex items-center justify-center gap-4 text-sm text-text-secondary
                        mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-1.5"><Calendar size={13} />{date}</span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1.5"><Clock size={13} />{mins} min de leitura</span>
        </div>

        {/* Featured image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-accent">
          <Image
            src={img}
            alt={stripHtml(post.title.rendered)}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 768px"
          />
        </div>

        {/* Content — tipografia otimizada para leitura */}
        <div
          className="
            prose prose-invert prose-base sm:prose-lg max-w-none

            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-text-primary
            prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
            prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h2:border-l-4 prose-h2:border-accent prose-h2:pl-4
            prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3

            prose-p:text-text-secondary prose-p:leading-8 prose-p:text-[15px] sm:prose-p:text-base

            prose-a:text-accent prose-a:font-semibold prose-a:no-underline
            hover:prose-a:underline hover:prose-a:text-accent-hover

            prose-strong:text-text-primary prose-strong:font-bold

            prose-ul:text-text-secondary prose-ol:text-text-secondary
            prose-li:mb-2 prose-li:leading-relaxed

            prose-blockquote:border-l-4 prose-blockquote:border-accent
            prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-xl
            prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic
            prose-blockquote:text-text-secondary

            prose-code:bg-card prose-code:text-accent prose-code:px-1.5 prose-code:py-0.5
            prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-code:before:content-none prose-code:after:content-none

            prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl

            prose-img:rounded-xl prose-img:shadow-card

            prose-hr:border-border
          "
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* CTA Skills */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-br from-accent/10 to-accent/5
                        border border-accent/25 rounded-2xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl
                          bg-accent/20 border border-accent/30 mb-4">
            <Zap size={20} className="text-accent" fill="currentColor" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
            Skills para Claude
          </p>
          <h3 className="text-xl sm:text-2xl font-black mb-3">
            Automatize tudo isso com IA
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-5 max-w-md mx-auto">
            20 skills prontas para instalar no Claude e começar a usar em 60 segundos.
            Marketing, finanças, produtividade, vendas e mais.
          </p>
          <Link href="/skills"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold
                       px-6 py-3 rounded-xl text-sm hover:bg-accent-hover transition-all
                       hover:-translate-y-0.5 hover:shadow-accent">
            Ver Skills — R$47 <ArrowRight size={14} />
          </Link>
          <p className="text-text-secondary text-xs mt-3">
            Pagamento único · Acesso vitalício · Garantia 7 dias
          </p>
        </div>

        {/* Artigos relacionados */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-black tracking-tight mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-accent rounded-full" />
              Continue lendo
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(rel => {
                const relImg  = getFeaturedImage(rel)
                const relDate = formatDate(rel.date)
                return (
                  <Link key={rel.id} href={`/artigo/${rel.slug}`}
                    className="group block bg-card border border-border rounded-xl overflow-hidden
                               hover:border-accent/30 hover:-translate-y-0.5 transition-all">
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={relImg}
                        alt={stripHtml(rel.title.rendered)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-text-secondary mb-1">{relDate}</p>
                      <h3 className="text-xs font-bold leading-snug line-clamp-2
                                     group-hover:text-accent transition-colors"
                        dangerouslySetInnerHTML={{ __html: rel.title.rendered }} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Navegação */}
        <div className="mt-10 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary
                       hover:text-text-primary transition-colors">
            <ArrowLeft size={14} /> Voltar para o Blog
          </Link>
          <Link href={`/categoria/${categorySlug}`}
            className="inline-flex items-center gap-2 text-sm text-accent
                       hover:text-accent-hover transition-colors font-semibold">
            Ver mais em {category} <ArrowRight size={14} />
          </Link>
        </div>

      </article>
    </>
  )
}
