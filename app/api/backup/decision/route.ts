import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { action, proposalId } = await req.json()

    // Tenta notificar o backend Fly.io (endpoint será criado futuramente)
    try {
      await fetch('https://veloxhub.fly.dev/api/backup/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          proposalId,
          timestamp: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(3000),
      })
    } catch {
      // Backend pode não ter o endpoint ainda — ok
    }

    return NextResponse.json({ success: true, action })
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
