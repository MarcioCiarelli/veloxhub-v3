import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await fetch('https://wp.veloxhub.com.br/wp-json/velox/v1/nonce', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VeloxHub/1.0)' },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    }).then(r => r.json())

    return NextResponse.json({
      nonce: data.login_nonce ?? '',
      registerNonce: data.register_nonce ?? '',
      referer: data.referer ?? '/minha-conta/',
    })
  } catch {
    return NextResponse.json({ nonce: '', registerNonce: '', referer: '/minha-conta/' })
  }
}
