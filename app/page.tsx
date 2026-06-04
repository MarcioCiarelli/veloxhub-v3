import { Suspense } from 'react'
import HeroSection from '@/components/home/HeroSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import FeaturedArticles from '@/components/home/FeaturedArticles'
import ToolsSection from '@/components/home/ToolsSection'
import SocialProof from '@/components/home/SocialProof'
import NewsletterSection from '@/components/home/NewsletterSection'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <CategoriesSection />
      <Suspense fallback={<div className="py-24 text-center text-text-secondary">Carregando artigos...</div>}>
        <FeaturedArticles />
      </Suspense>
      <ToolsSection />
      <NewsletterSection />
      <CTASection />
    </>
  )
}
