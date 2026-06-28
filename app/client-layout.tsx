'use client'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Rotas que NÃO devem ter header/footer do site
const NO_LAYOUT_PATHS = ['/app', '/backup']

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isNoLayout = NO_LAYOUT_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )

  return (
    <>
      {!isNoLayout && <Header />}
      <main className={isNoLayout ? '' : undefined}>{children}</main>
      {!isNoLayout && <Footer />}
    </>
  )
}
