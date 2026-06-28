'use client'
import { useState, useEffect, useCallback } from 'react'

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface AuthState {
  token: string   // base64("username:appPassword")
  username: string
  displayName: string
}

interface Registro {
  id: number
  data: string
  horas: number
  km: number
  valor_uber: number
  valor_99: number
  valor_total: number
  gastos_combustivel?: number
  notas?: string
}

type Tab = 'registrar' | 'historico' | 'resumo'

const WP_API = 'https://wp.veloxhub.com.br/wp-json'
const FLY_API = 'https://veloxhub.fly.dev/api'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
function fmtDate(d: string) {
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

// ─── Componente raiz ─────────────────────────────────────────────────────────
export default function MotoristApp() {
  const [auth, setAuth] = useState<AuthState | null>(null)
  const [tab, setTab] = useState<Tab>('registrar')
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('mot_auth')
    if (saved) {
      try { setAuth(JSON.parse(saved)) } catch { /* ignore */ }
    }
    setBooting(false)
  }, [])

  const handleLogin = (a: AuthState) => {
    localStorage.setItem('mot_auth', JSON.stringify(a))
    setAuth(a)
  }
  const handleLogout = () => {
    localStorage.removeItem('mot_auth')
    setAuth(null)
  }

  if (booting) return <FullScreen><p className="text-white/30 text-sm animate-pulse">carregando...</p></FullScreen>
  if (!auth)   return <LoginScreen onLogin={handleLogin} />

  return (
    <div className="flex flex-col min-h-screen bg-[#080808] text-white">
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#0f0f0f]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#f0c000] rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight">VeloxHub <span className="text-white/40 font-normal">Motorista</span></span>
        </div>
        <button onClick={handleLogout} className="text-[11px] text-white/30 hover:text-white/60 transition-colors px-2 py-1">
          sair
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto">
        {tab === 'registrar' && <TabRegistrar auth={auth} />}
        {tab === 'historico' && <TabHistorico auth={auth} />}
        {tab === 'resumo'    && <TabResumo auth={auth} />}
      </div>

      {/* Bottom Navigation */}
      <nav className="flex border-t border-white/[0.08] bg-[#0f0f0f] safe-area-inset-bottom">
        {([
          { key: 'registrar', icon: '✏️', label: 'Registrar' },
          { key: 'historico', icon: '📋', label: 'Histórico' },
          { key: 'resumo',    icon: '📊', label: 'Resumo'    },
        ] as { key: Tab; icon: string; label: string }[]).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-[11px] font-medium transition-colors ${
              tab === t.key ? 'text-[#f0c000]' : 'text-white/35 hover:text-white/60'
            }`}
          >
            <span className="text-lg leading-none">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

// ─── Login ───────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (a: AuthState) => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const token = btoa(`${user.trim()}:${pass.trim()}`)
    try {
      const res = await fetch(`${WP_API}/wp/v2/users/me`, {
        headers: { Authorization: `Basic ${token}` },
      })
      if (!res.ok) throw new Error('Credenciais inválidas')
      const data = await res.json()
      onLogin({ token, username: user.trim(), displayName: data.name || user.trim() })
    } catch {
      setError('Usuário ou senha de aplicativo inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FullScreen>
      <div className="w-full max-w-sm px-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#f0c000] rounded-xl flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight">VeloxHub <span className="text-white/40 font-normal">Motorista</span></span>
        </div>

        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="block text-xs text-white/50 mb-1.5 font-medium">Usuário WordPress</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="marciociarelli"
              autoComplete="username"
              required
              className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#f0c000]/50 focus:bg-white/[0.08] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5 font-medium">Senha de Aplicativo</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
              autoComplete="current-password"
              required
              className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#f0c000]/50 focus:bg-white/[0.08] transition-all"
            />
            <p className="text-[11px] text-white/25 mt-1.5">Use a Senha de Aplicativo do WP, não a senha de login.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-xs text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f0c000] hover:bg-[#f0c000]/90 text-black font-bold py-3.5 rounded-xl text-sm transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </FullScreen>
  )
}

// ─── Tab Registrar ────────────────────────────────────────────────────────────
function TabRegistrar({ auth }: { auth: AuthState }) {
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    data: today,
    horas: '',
    km: '',
    valor_uber: '',
    valor_99: '',
    gastos_combustivel: '',
    notas: '',
  })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        data: form.data,
        horas: parseFloat(form.horas) || 0,
        km: parseFloat(form.km) || 0,
        valor_uber: parseFloat(form.valor_uber) || 0,
        valor_99: parseFloat(form.valor_99) || 0,
        valor_total: (parseFloat(form.valor_uber) || 0) + (parseFloat(form.valor_99) || 0),
        gastos_combustivel: parseFloat(form.gastos_combustivel) || 0,
        notas: form.notas,
      }
      const res = await fetch(`${FLY_API}/data/motorista`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth.token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      setForm({ data: today, horas: '', km: '', valor_uber: '', valor_99: '', gastos_combustivel: '', notas: '' })
      showToast('Registro salvo com sucesso! ✓', true)
    } catch {
      showToast('Erro ao salvar. Tente novamente.', false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="px-4 py-5 pb-6 max-w-md mx-auto">
      <h2 className="text-base font-bold text-white mb-4">✏️ Registrar Dia</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Data">
          <input type="date" value={form.data} onChange={e => setForm(f => ({ ...f, data: e.target.value }))}
            className={inputClass} required />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Horas trabalhadas">
            <input type="number" step="0.5" min="0" placeholder="8.5" value={form.horas}
              onChange={e => setForm(f => ({ ...f, horas: e.target.value }))} className={inputClass} required />
          </Field>
          <Field label="Quilômetros">
            <input type="number" step="1" min="0" placeholder="120" value={form.km}
              onChange={e => setForm(f => ({ ...f, km: e.target.value }))} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="💛 Uber (R$)">
            <input type="number" step="0.01" min="0" placeholder="0.00" value={form.valor_uber}
              onChange={e => setForm(f => ({ ...f, valor_uber: e.target.value }))} className={inputClass} />
          </Field>
          <Field label="🔷 99 (R$)">
            <input type="number" step="0.01" min="0" placeholder="0.00" value={form.valor_99}
              onChange={e => setForm(f => ({ ...f, valor_99: e.target.value }))} className={inputClass} />
          </Field>
        </div>

        <Field label="⛽ Combustível (R$)">
          <input type="number" step="0.01" min="0" placeholder="0.00" value={form.gastos_combustivel}
            onChange={e => setForm(f => ({ ...f, gastos_combustivel: e.target.value }))} className={inputClass} />
        </Field>

        <Field label="Notas (opcional)">
          <textarea value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
            placeholder="Observações do dia..." rows={2}
            className={inputClass + ' resize-none'} />
        </Field>

        {/* Total preview */}
        {(form.valor_uber || form.valor_99) && (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-xs text-white/50">Total do dia</span>
            <span className="text-base font-bold text-[#f0c000]">
              {fmt((parseFloat(form.valor_uber) || 0) + (parseFloat(form.valor_99) || 0))}
            </span>
          </div>
        )}

        <button type="submit" disabled={saving}
          className="w-full bg-[#f0c000] hover:bg-[#f0c000]/90 text-black font-bold py-3.5 rounded-xl text-sm transition-all disabled:opacity-50 active:scale-[0.98] mt-2">
          {saving ? 'Salvando...' : 'Salvar registro'}
        </button>
      </form>

      {toast && (
        <div className={`fixed bottom-20 left-4 right-4 rounded-xl px-4 py-3 text-sm font-medium text-center animate-fade-in z-50 ${
          toast.ok ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'
        }`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}

// ─── Tab Histórico ────────────────────────────────────────────────────────────
function TabHistorico({ auth }: { auth: AuthState }) {
  const [registros, setRegistros] = useState<Registro[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'ok'>('loading')
  const [errMsg, setErrMsg] = useState('')

  const load = useCallback(async () => {
    setStatus('loading')
    try {
      const res = await fetch(`${FLY_API}/data/motorista`, {
        headers: { Authorization: `Basic ${auth.token}` },
      })
      if (res.status === 401 || res.status === 403) {
        setErrMsg('Sessão expirada. Saia e entre novamente.')
        setStatus('error')
        return
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Registro[] = await res.json()
      const sorted = [...data].sort((a, b) => b.data.localeCompare(a.data))
      setRegistros(sorted)
      setStatus(sorted.length === 0 ? 'empty' : 'ok')
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : 'Erro de rede. Verifique sua conexão.')
      setStatus('error')
    }
  }, [auth.token])

  useEffect(() => { load() }, [load])

  return (
    <div className="px-4 py-5 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white">📋 Histórico</h2>
        <button onClick={load} className="text-xs text-white/40 hover:text-white/70 transition-colors">↻ atualizar</button>
      </div>

      {status === 'loading' && (
        <div className="flex items-center justify-center py-16">
          <p className="text-white/30 text-sm animate-pulse">carregando registros...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-4 text-center">
          <p className="text-red-400 text-sm mb-3">{errMsg}</p>
          <button onClick={load} className="text-xs text-red-400/70 border border-red-400/30 rounded-lg px-3 py-1.5 hover:bg-red-400/10 transition-colors">
            Tentar novamente
          </button>
        </div>
      )}

      {status === 'empty' && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-4xl mb-3">🚗</span>
          <p className="text-white/40 text-sm">Nenhum registro ainda.</p>
          <p className="text-white/25 text-xs mt-1">Registre seu primeiro dia na aba Registrar.</p>
        </div>
      )}

      {status === 'ok' && (
        <div className="space-y-3">
          {registros.map((r) => (
            <div key={r.id} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50 font-medium">{fmtDate(r.data)}</span>
                <span className="text-sm font-bold text-[#f0c000]">{fmt(r.valor_total)}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-white/35">
                {r.horas > 0 && <span>⏱ {r.horas}h</span>}
                {r.km > 0 && <span>📍 {r.km} km</span>}
                {r.valor_uber > 0 && <span>💛 {fmt(r.valor_uber)}</span>}
                {r.valor_99 > 0 && <span>🔷 {fmt(r.valor_99)}</span>}
                {(r.gastos_combustivel ?? 0) > 0 && <span>⛽ -{fmt(r.gastos_combustivel ?? 0)}</span>}
              </div>
              {r.notas && <p className="text-[11px] text-white/30 mt-1.5 italic">{r.notas}</p>}
            </div>
          ))}
          <p className="text-center text-[11px] text-white/20 pt-2">{registros.length} registro(s)</p>
        </div>
      )}
    </div>
  )
}

// ─── Tab Resumo ───────────────────────────────────────────────────────────────
function TabResumo({ auth }: { auth: AuthState }) {
  const [registros, setRegistros] = useState<Registro[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${FLY_API}/data/motorista`, {
      headers: { Authorization: `Basic ${auth.token}` },
    })
      .then(r => r.json())
      .then((data: Registro[]) => { setRegistros(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [auth.token])

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <p className="text-white/30 text-sm animate-pulse">carregando...</p>
    </div>
  )

  const total = registros.reduce((s, r) => s + r.valor_total, 0)
  const horas = registros.reduce((s, r) => s + (r.horas || 0), 0)
  const km = registros.reduce((s, r) => s + (r.km || 0), 0)
  const combustivel = registros.reduce((s, r) => s + (r.gastos_combustivel || 0), 0)
  const liquido = total - combustivel
  const rphMedia = horas > 0 ? liquido / horas : 0
  const diasCount = registros.length

  // Mês atual
  const now = new Date()
  const mesAtual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const regMes = registros.filter(r => r.data.startsWith(mesAtual))
  const totalMes = regMes.reduce((s, r) => s + r.valor_total, 0)
  const horasMes = regMes.reduce((s, r) => s + (r.horas || 0), 0)

  return (
    <div className="px-4 py-5 pb-6">
      <h2 className="text-base font-bold text-white mb-4">📊 Resumo</h2>

      {/* Mês atual */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 mb-4">
        <p className="text-[11px] text-white/40 uppercase tracking-wider mb-3">
          {now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Faturamento" value={fmt(totalMes)} accent />
          <Stat label="Dias rodados" value={`${regMes.length} dias`} />
          <Stat label="Horas" value={`${horasMes.toFixed(1)}h`} />
          <Stat label="Média/dia" value={regMes.length > 0 ? fmt(totalMes / regMes.length) : '-'} />
        </div>
      </div>

      {/* Total geral */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 mb-4">
        <p className="text-[11px] text-white/40 uppercase tracking-wider mb-3">Total geral</p>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Bruto total" value={fmt(total)} />
          <Stat label="Combustível" value={`-${fmt(combustivel)}`} />
          <Stat label="Líquido total" value={fmt(liquido)} accent />
          <Stat label="R$/hora" value={rphMedia > 0 ? `${fmt(rphMedia)}/h` : '-'} />
          <Stat label="Dias rodados" value={`${diasCount}`} />
          <Stat label="KM total" value={`${km.toLocaleString('pt-BR')} km`} />
        </div>
      </div>

      {diasCount === 0 && (
        <div className="text-center py-6">
          <p className="text-white/30 text-sm">Nenhum dado disponível ainda.</p>
        </div>
      )}
    </div>
  )
}

// ─── Utilitários ─────────────────────────────────────────────────────────────
function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5 font-medium">{label}</label>
      {children}
    </div>
  )
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-white/[0.03] rounded-xl px-3 py-2.5">
      <p className="text-[10px] text-white/35 mb-0.5">{label}</p>
      <p className={`text-sm font-bold ${accent ? 'text-[#f0c000]' : 'text-white'}`}>{value}</p>
    </div>
  )
}

const inputClass = 'w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#f0c000]/50 focus:bg-white/[0.08] transition-all'
