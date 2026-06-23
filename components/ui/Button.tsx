'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export function Button({ variant = 'primary', size = 'md', className, children, href, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

  const variants = {
    primary: 'bg-accent text-black hover:bg-accent-hover shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5',
    secondary: 'bg-card border border-border text-text-primary hover:border-accent/30 hover:-translate-y-0.5',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/5',
    outline: 'border border-border text-text-primary hover:border-accent/40 hover:bg-accent/5',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//')
    if (isExternal) {
      return <a href={href} className={classes}>{children}</a>
    }
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
