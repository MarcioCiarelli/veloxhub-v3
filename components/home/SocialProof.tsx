'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { target: 10000, suffix: '+', label: 'Leitores mensais' },
  { target: 500, suffix: '+', label: 'Artigos publicados' },
  { target: 100, suffix: '+', label: 'Ferramentas disponíveis' },
  { target: 50, suffix: '+', label: 'Templates prontos' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(ease * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  )
}

export default function SocialProof() {
  return (
    <section className="py-20 border-t border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center px-6 py-4">
              <div className="text-4xl sm:text-5xl font-black text-gradient mb-2">
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
