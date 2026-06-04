import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'accent' | 'default' | 'green' | 'blue'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    accent: 'bg-accent/10 text-accent border-accent/20',
    default: 'bg-white/5 text-text-secondary border-white/10',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border tracking-wide',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
