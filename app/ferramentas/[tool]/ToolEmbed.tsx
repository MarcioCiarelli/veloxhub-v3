'use client'
import { useState, useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'

interface Props {
  url: string
  toolName: string
}

export default function ToolEmbed({ url, toolName }: Props) {
  const [height, setHeight] = useState(700)
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://wp.veloxhub.com.br') return
      if (e.data?.type === 'velox_resize' && typeof e.data.height === 'number') {
        setHeight(Math.max(500, e.data.height + 48))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-[#050505]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-10 min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-text-secondary">
            <Loader2 size={28} className="animate-spin text-accent" />
            <span className="text-sm">Carregando {toolName}...</span>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={url}
        width="100%"
        height={height}
        onLoad={() => setLoaded(true)}
        title={toolName}
        style={{ border: 'none', background: '#050505', display: 'block' }}
      />
    </div>
  )
}
