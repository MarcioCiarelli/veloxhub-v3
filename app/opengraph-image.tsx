import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'VeloxHub — Tecnologia, Automação e Inteligência Artificial'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050505 0%, #0D1117 50%, #050505 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', background: '#FFD400', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ fontSize: '48px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-1px' }}>
            VELOX<span style={{ color: '#FFD400' }}>HUB</span>
          </span>
        </div>
        <div style={{ fontSize: '24px', color: '#9CA3AF', textAlign: 'center', maxWidth: '700px', lineHeight: 1.5 }}>
          Tecnologia, Automação e Inteligência Artificial para acelerar sua evolução digital.
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
          {['⚡ Tecnologia & IA', '💰 Finanças', '🚀 Produtividade', '💼 Negócios'].map((cat) => (
            <div key={cat} style={{ background: 'rgba(255,212,0,0.08)', border: '1px solid rgba(255,212,0,0.2)', borderRadius: '8px', padding: '8px 16px', fontSize: '14px', color: '#FFD400' }}>
              {cat}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
