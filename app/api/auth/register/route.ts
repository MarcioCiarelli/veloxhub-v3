import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'A senha deve ter no mínimo 8 caracteres.' }, { status: 400 })
    }

    const wpUrl = process.env.WP_URL || 'https://wp.veloxhub.com.br'
    const wpUser = process.env.WP_API_USER
    const wpAppPassword = process.env.WP_API_APP_PASSWORD

    if (!wpUser || !wpAppPassword) {
      return NextResponse.json({ error: 'Configuração do servidor incompleta.' }, { status: 500 })
    }

    const credentials = Buffer.from(`${wpUser}:${wpAppPassword}`).toString('base64')

    const res = await fetch(`${wpUrl}/wp-json/wp/v2/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify({
        username: email.split('@')[0],
        email,
        password,
        roles: ['customer'],
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      if (data.code === 'existing_user_login' || data.code === 'existing_user_email') {
        return NextResponse.json({ error: 'Este email já possui uma conta. Faça login.' }, { status: 409 })
      }
      return NextResponse.json({ error: data.message || 'Erro ao criar conta.' }, { status: res.status })
    }

    return NextResponse.json({ ok: true, message: 'Conta criada com sucesso.' })
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
