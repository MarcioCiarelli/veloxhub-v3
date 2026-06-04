import type { WPPost, WPCategory } from '@/types'

const WP_API = 'https://wp.veloxhub.com.br/wp-json/wp/v2'

async function fetchWP<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${WP_API}${endpoint}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  const res = await fetch(url.toString(), {
    next: { revalidate: 300 },
    headers: { 'Accept': 'application/json' },
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout))
  if (!res.ok) throw new Error(`WP API error: ${res.status} ${endpoint}`)
  return res.json()
}

export async function getPosts(params: Record<string, string | number> = {}): Promise<WPPost[]> {
  return fetchWP<WPPost[]>('/posts', { _embed: 1, per_page: 10, ...params })
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const posts = await fetchWP<WPPost[]>('/posts', { slug, _embed: 1 })
  return posts[0] ?? null
}

export async function getCategories(): Promise<WPCategory[]> {
  return fetchWP<WPCategory[]>('/categories', { per_page: 20, hide_empty: 1 })
}

export function getFeaturedImage(post: WPPost): string {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url
    ?? 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800'
}

export function getPostCategory(post: WPPost): string {
  return post._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Tecnologia'
}

export function getPostCategorySlug(post: WPPost): string {
  return post._embedded?.['wp:term']?.[0]?.[0]?.slug ?? 'tecnologia'
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export function readingTime(content: string): number {
  const words = stripHtml(content).split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
