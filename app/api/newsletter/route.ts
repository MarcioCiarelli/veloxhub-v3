import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const apiKey = process.env.MAILERLITE_API_KEY
    const groupId = process.env.MAILERLITE_GROUP_ID

    if (!apiKey) {
      return NextResponse.json({ error: 'Newsletter não configurada' }, { status: 500 })
    }

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: groupId ? [groupId] : [],
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      if (res.status === 422) {
        return NextResponse.json({ ok: true, message: 'Já inscrito' })
      }
      return NextResponse.json({ error: data.message || 'Erro ao inscrever' }, { status: res.status })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
