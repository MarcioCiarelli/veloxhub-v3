export interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  link: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>
  }
  yoast_head_json?: { reading_time?: number }
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
  description: string
}

export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: string
  href: string
  badge?: string
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  rating: number
  students: number
  image: string
  href: string
  badge?: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
  href: string
}
