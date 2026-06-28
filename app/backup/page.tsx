'use client'
import { useState, useEffect } from 'react'

interface Proposal {
  id: string
  title: string
  description: string
  type: 'nextjs' | 'wordpress' | 'design'
  target: string
  previewUrl?: string
  code?: string
  createdAt: string
}

export default function BackupPage() {
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [hasProposal, setHasProposal] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading_action' | 'done'>('idle')
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/backup-proposals.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => {
        setHasProposal(data.hasProposal)
        setProposal(data.proposal)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleDecision = async (action: 'approve' | 'reject') => {
    setStatus('loading_action')
    try {
      await fetch('/api/backup/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, proposalId: proposal?.id }),
      })
    } catch {
      // sem backend ainda — tudo bem
    }
    setDecision(action === 'approve' ? 'approved' : 'rejected')
    setStatus('done')
  }

  return (
    <>
      <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">

        {/* Topbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-[#0f0f0f]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#f0c000] rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-white/50 tracking-tight">VeloxHub</span>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-[13px] font-semibold text-white">Preview de Mudanças</span>
          </div>
          {hasProposal && !decision && (
            <span className="text-[11px] bg-amber-500/15 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/25 font-medium">
              ● aguardando aprovação
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 flex items-center justify-center p-6">
          {loading ? (
            <div className="text-white/20 text-sm animate-pulse">carregando...</div>

          ) : status === 'done' ? (
            /* Pós-decisão */
            <div className="text-center max-w-xs">
              {decision === 'approved' ? (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-5 text-3xl">✅</div>
                  <h2 className="text-lg font-bold text-white mb-2">Mudança aprovada</h2>
                  <p className="text-white/40 text-sm leading-relaxed">Claude foi notificado e implementará na próxima sessão.</p>
                  <p className="text-white/20 text-xs mt-5">Página limpa — aguardando próxima proposta.</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/25 flex items-center justify-center mx-auto mb-5 text-3xl">❌</div>
                  <h2 className="text-lg font-bold text-white mb-2">Proposta rejeitada</h2>
                  <p className="text-white/40 text-sm leading-relaxed">Claude ajustará e apresentará uma nova versão.</p>
                  <p className="text-white/20 text-xs mt-5">Página limpa — aguardando próxima proposta.</p>
                </>
              )}
            </div>

          ) : !hasProposal || !proposal ? (
            /* Estado vazio */
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-5 text-3xl">🤖</div>
              <h2 className="text-base font-bold text-white mb-2">Nenhuma proposta pendente</h2>
              <p className="text-white/35 text-sm leading-relaxed">
                Quando o Claude preparar uma mudança para revisão, ela aparecerá aqui para você aprovar ou rejeitar.
              </p>
              <p className="text-white/20 text-xs mt-5">veloxhub.com.br/backup</p>
            </div>

          ) : (
            /* Proposta ativa */
            <div className="w-full max-w-xl">
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] overflow-hidden">

                {/* Header do card */}
                <div className="px-5 py-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${
                      proposal.type === 'nextjs'
                        ? 'bg-blue-500/15 text-blue-400 border-blue-500/25'
                        : proposal.type === 'wordpress'
                        ? 'bg-purple-500/15 text-purple-400 border-purple-500/25'
                        : 'bg-orange-500/15 text-orange-400 border-orange-500/25'
                    }`}>
                      {proposal.type === 'nextjs' ? '⚡ Next.js' : proposal.type === 'wordpress' ? '🔵 WordPress' : '🎨 Design'}
                    </span>
                    <span className="text-[11px] text-white/25">{proposal.createdAt}</span>
                  </div>
                  <h2 className="text-[15px] font-bold text-white leading-snug">{proposal.title}</h2>
                </div>

                {/* Descrição */}
                <div className="px-5 py-4">
                  <p className="text-sm text-white/55 leading-relaxed whitespace-pre-line">{proposal.description}</p>
                  {proposal.target && (
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/25">
                      <span>📁</span>
                      <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-white/40 font-mono">{proposal.target}</code>
                    </div>
                  )}
                </div>

                {/* Preview iframe */}
                {proposal.previewUrl && (
                  <div className="border-t border-white/[0.08] px-5 py-4">
                    <p className="text-[11px] text-white/30 uppercase tracking-widest mb-2">Preview</p>
                    <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-black/30">
                      <iframe
                        src={proposal.previewUrl}
                        className="w-full h-52 md:h-72"
                        title="Preview"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  </div>
                )}

                {/* Código */}
                {proposal.code && (
                  <div className="border-t border-white/[0.08] px-5 py-4">
                    <p className="text-[11px] text-white/30 uppercase tracking-widest mb-2">Código proposto</p>
                    <pre className="bg-black/50 border border-white/[0.08] rounded-xl p-3 text-[11px] text-green-400/75 overflow-auto max-h-44 font-mono leading-relaxed">
                      {proposal.code}
                    </pre>
                  </div>
                )}

                {/* Botões */}
                <div className="px-5 py-4 border-t border-white/[0.08] flex gap-3">
                  <button
                    onClick={() => handleDecision('approve')}
                    disabled={status === 'loading_action'}
                    className="flex-1 bg-[#f0c000] hover:bg-[#f0c000]/90 active:scale-[0.98] text-black font-bold py-3 rounded-xl transition-all disabled:opacity-40 text-sm"
                  >
                    {status === 'loading_action' ? '...' : '✅ Aprovar'}
                  </button>
                  <button
                    onClick={() => handleDecision('reject')}
                    disabled={status === 'loading_action'}
                    className="flex-1 bg-white/[0.05] hover:bg-white/[0.09] active:scale-[0.98] text-white/60 font-medium py-3 rounded-xl border border-white/[0.1] transition-all disabled:opacity-40 text-sm"
                  >
                    {status === 'loading_action' ? '...' : '↩ Rejeitar'}
                  </button>
                </div>
              </div>

              <p className="text-center text-[11px] text-white/15 mt-4">
                veloxhub.com.br/backup · sem login necessário
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
