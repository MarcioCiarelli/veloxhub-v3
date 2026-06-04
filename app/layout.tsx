import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'VeloxHub — Tecnologia, Automação e Inteligência Artificial',
    template: '%s | VeloxHub',
  },
  description: 'Aprenda, automatize e monetize usando as melhores ferramentas de IA. Conteúdo premium, ferramentas SaaS e marketplace digital.',
  metadataBase: new URL('https://veloxhub.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'VeloxHub',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@veloxhuboficial',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-bg text-text-primary antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9696608579412271"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
