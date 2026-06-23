'use client'
import { useState } from 'react'
import { Bebas_Neue } from 'next/font/google'
import { ArrowRight, Check, Shield, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] })

const LINK_BASE = 'https://pay.cakto.com.br/m2uy3q7_913313'
const LINK_BUMP = 'https://pay.cakto.com.br/m2uy3q7_913355'

const SKILLS = [
  { num: '01', name: 'Social Media PRO', desc: 'Gera posts virais com hook, storytelling e CTA para Instagram, TikTok e LinkedIn.', tag: 'Marketing', tagCls: 'bg-accent/10 text-accent' },
  { num: '02', name: 'Email Vendas', desc: 'Sequências que convertem — boas-vindas, nurturing, oferta e recuperação.', tag: 'Negócios', tagCls: 'bg-purple-500/10 text-purple-400' },
  { num: '03', name: 'Criador de Curso', desc: 'Estrutura módulos, aulas, exercícios e materiais para infoprodutos completos.', tag: 'Produtividade', tagCls: 'bg-emerald-500/10 text-emerald-400' },
  { num: '04', name: 'Análise Financeira', desc: 'Interpreta DRE, fluxo de caixa e gera relatórios executivos em minutos.', tag: 'Negócios', tagCls: 'bg-purple-500/10 text-purple-400' },
  { num: '05', name: 'SEO Writer', desc: 'Artigos otimizados para Google com estrutura, keywords e meta tags prontos.', tag: 'Marketing', tagCls: 'bg-accent/10 text-accent' },
  { num: '06', name: 'Atendimento VIP', desc: 'Responde clientes com empatia e clareza, resolve objeções sem soar robótico.', tag: 'Negócios', tagCls: 'bg-purple-500/10 text-purple-400' },
  { num: '07', name: 'Roteirista de Vídeo', desc: 'Roteiros para YouTube, Reels e TikTok com gancho, desenvolvimento e CTA.', tag: 'Marketing', tagCls: 'bg-accent/10 text-accent' },
  { num: '08', name: 'Gestor de Projetos', desc: 'Planeja sprints, delega tarefas, gera cronogramas e acompanha entregas.', tag: 'Produtividade', tagCls: 'bg-emerald-500/10 text-emerald-400' },
  { num: '09', name: 'Copywriter de Vendas', desc: 'Landing pages, VSL e anúncios usando frameworks clássicos de conversão.', tag: 'Marketing', tagCls: 'bg-accent/10 text-accent' },
  { num: '10', name: 'Estrategista de IA', desc: 'Mapeia processos e propõe onde implementar IA para economizar tempo e dinheiro.', tag: 'Negócios', tagCls: 'bg-purple-500/10 text-purple-400' },
  { num: '11', name: 'Pitch de Vendas', desc: 'Elevator pitch, reunião consultiva e follow-up com scripts prontos.', tag: 'Negócios', tagCls: 'bg-purple-500/10 text-purple-400' },
  { num: '12', name: 'Pesquisa de Mercado', desc: 'Análise competitiva, persona detalhada e identificação de oportunidades.', tag: 'Negócios', tagCls: 'bg-purple-500/10 text-purple-400' },
  { num: '13', name: 'Mentor de Carreira', desc: 'Plano de 90 dias, currículo, LinkedIn e negociação salarial.', tag: 'Produtividade', tagCls: 'bg-emerald-500/10 text-emerald-400' },
  { num: '14', name: 'Tradutor Especializado', desc: 'PT-BR ↔ EN-US com adaptação cultural e glossário técnico.', tag: 'Produtividade', tagCls: 'bg-emerald-500/10 text-emerald-400' },
  { num: '15', name: 'Coach Fitness', desc: 'Treino, alimentação e calculadora de macros para rotinas ocupadas.', tag: 'Produtividade', tagCls: 'bg-emerald-500/10 text-emerald-400' },
  { num: '16', name: 'Tráfego Pago', desc: 'Facebook Ads e Google Ads — estratégia, criativos e análise de métricas.', tag: 'Marketing', tagCls: 'bg-accent/10 text-accent' },
  { num: '17', name: 'Jurídico Básico', desc: 'Contratos, termos de uso, política de privacidade e conformidade LGPD.', tag: 'Negócios', tagCls: 'bg-purple-500/10 text-purple-400' },
  { num: '18', name: 'Precificação', desc: 'Estratégias de preço, ancoragem, bundles e como aumentar ticket médio.', tag: 'Negócios', tagCls: 'bg-purple-500/10 text-purple-400' },
  { num: '19', name: 'Gerador de Ideias', desc: 'Brainstorming estruturado com SCAMPER, Blue Ocean e validação rápida.', tag: 'Produtividade', tagCls: 'bg-emerald-500/10 text-emerald-400' },
  { num: '20', name: 'Assistente Executivo', desc: 'Gestão de tempo, reuniões, emails e tomada de decisão — seu COO pessoal.', tag: 'Produtividade', tagCls: 'bg-emerald-500/10 text-emerald-400' },
]

const TICKER_ITEMS = [
  'Social Media PRO', 'Email Vendas', 'SEO Writer', 'Análise Financeira',
  'Copywriter de Vendas', 'Criador de Curso', 'Roteirista de Vídeo',
  'Gestor de Projetos', 'Tráfego Pago', 'Atendimento VIP',
]

const FLOAT_CARDS = [
  { icon: '⚡', label: 'Skill ativa', title: 'Social Media PRO — gerando post para Instagram com hook e CTA...', meta: 'Executando em tempo real' },
  { icon: '📈', label: 'Skill ativa', title: 'Análise Financeira — interpretando DRE e gerando relatório executivo...', meta: 'Resultado em segundos' },
  { icon: '✍️', label: 'Skill ativa', title: 'Copywriter de Vendas — estruturando landing page com framework AIDA...', meta: 'Pronto para publicar' },
]

const FAQ_ITEMS = [
  { q: 'Preciso ter o Claude pago para usar?', a: 'Não obrigatoriamente, mas o Claude Pro (R$20/mês) multiplica o resultado. As Skills funcionam na versão gratuita também — você instala uma vez e usa para sempre.' },
  { q: 'Como instalo uma Skill no Claude?', a: 'Você recebe um guia completo. O processo leva menos de 60 segundos: copia o texto da Skill, cola nas configurações do Claude (Project Instructions) e pronto. Funciona em qualquer dispositivo.' },
  { q: 'As Skills funcionam para qualquer nicho?', a: 'Sim. Cada Skill é construída para se adaptar ao seu contexto. O curso (order bump) ensina a personalizar e criar Skills específicas para o seu nicho em menos de 30 minutos.' },
  { q: 'Recebo atualizações futuras?', a: 'Sim. Comprando hoje você recebe todas as Skills que lançarmos nos próximos 12 meses sem custo adicional. O objetivo é chegar a 50 Skills no pack.' },
  { q: 'E se eu não gostar?', a: 'Garantia incondicional de 7 dias. Não gostou por qualquer motivo — manda um email para contato@veloxhub.com.br e devolvemos 100%. Sem burocracia.' },
]

const STATS = [
  { num: '20', label: 'Skills no pack' },
  { num: '60s', label: 'Para instalar' },
  { num: '∞', label: 'Usos por dia' },
  { num: '7d', label: 'Garantia total' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-accent text-[11px] font-bold uppercase tracking-[3px] mb-4">
      {children}
    </div>
  )
}

function CtaButton({ href, size = 'md', children }: { href: string; size?: 'md' | 'lg'; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-3 bg-accent text-black font-bold rounded-lg transition-all
        hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-accent
        ${size === 'lg' ? 'text-lg px-10 py-5' : 'text-[15px] px-8 py-4'}`}>
      {children}
    </a>
  )
}

export default function SkillsPage() {
  const [bumpOn, setBumpOn] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const link = bumpOn ? LINK_BUMP : LINK_BASE

  return (
    <div className="bg-bg text-text-primary overflow-x-hidden">
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker-scroll 30s linear infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center px-4 sm:px-6 md:px-12 pt-16 pb-8 overflow-hidden">
        {/* Matrix rain effect */}
        <canvas id="matrix-rain" className="absolute inset-0 pointer-events-none opacity-[0.12]" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var c=document.getElementById('matrix-rain');if(!c)return;
            var ctx=c.getContext('2d');
            function resize(){c.width=c.offsetWidth;c.height=c.offsetHeight;}
            resize();window.addEventListener('resize',resize);
            var chars='01アイウエオカキクケコサシスセソVELOXHUBskills{}()=>/**/'.split('');
            var cols=Math.floor(c.width/14);
            var drops=Array(cols).fill(1);
            function draw(){
              ctx.fillStyle='rgba(5,5,5,0.05)';
              ctx.fillRect(0,0,c.width,c.height);
              ctx.fillStyle='#FFD400';
              ctx.font='12px monospace';
              for(var i=0;i<drops.length;i++){
                var t=chars[Math.floor(Math.random()*chars.length)];
                ctx.fillText(t,i*14,drops[i]*14);
                if(drops[i]*14>c.height&&Math.random()>0.975)drops[i]=0;
                drops[i]++;
              }
            }
            setInterval(draw,45);
          })();
        `}} />
        {/* grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,212,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,212,0,0.04) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center,black 30%,transparent 80%)',
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-accent/6 blur-3xl pointer-events-none" />

        {/* content */}
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5 text-accent text-sm font-medium mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-accent animate-pulse-slow" />
            20 Skills prontas para instalar agora
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${bebas.className} text-[clamp(40px,7vw,80px)] leading-[.92] tracking-wider mb-5`}>
            O CLAUDE<br />
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>SOZINHO</span><br />
            <span className="text-gradient">VALE POUCO.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-lg leading-relaxed font-light mb-5">
            Com as <strong className="text-text-primary font-semibold">Skills certas instaladas</strong>, ele para
            de responder de forma genérica e começa a executar como um especialista sênior — no seu tom, no seu
            formato, com a sua profundidade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-baseline gap-4 mb-5">
            <span className="text-text-secondary text-lg line-through">R$197</span>
            <span className={`${bebas.className} text-6xl text-accent leading-none tracking-wide`}>R$47</span>
            <span className="text-text-secondary text-sm leading-snug">pagamento único<br />acesso vitalício</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            <CtaButton href={link}>
              Quero as 20 Skills agora <ArrowRight size={16} />
            </CtaButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-text-secondary text-xs mt-4 font-mono tracking-widest">
            // Pagamento seguro · Acesso imediato · Garantia de 7 dias
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex gap-9 mt-7 pt-6 border-t border-white/5">
            {STATS.map(({ num, label }) => (
              <div key={label}>
                <div className={`${bebas.className} text-3xl text-accent tracking-wider`}>{num}</div>
                <div className="text-text-secondary text-sm mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* float cards desktop */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-10">
          {FLOAT_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="bg-card border border-white/5 rounded-xl p-5 w-72 hover:border-accent/20 hover:-translate-x-1.5 transition-all cursor-default">
              <div className="text-text-secondary text-[11px] uppercase tracking-widest mb-2">
                {card.icon} {card.label}
              </div>
              <div className="text-sm leading-relaxed">{card.title}</div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5 text-text-secondary text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-accent" />
                {card.meta}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-accent/[0.08] border-y border-accent/15 py-3 overflow-hidden whitespace-nowrap select-none">
        <div className="ticker-track inline-flex">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center text-accent font-semibold text-sm tracking-widest px-7 gap-7">
              {item}
              <span className="text-accent/30">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PROBLEMA ── */}
      <section className="py-14 px-6 md:px-12 bg-card border-y border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <SectionLabel>O problema real</SectionLabel>
            <h2 className={`${bebas.className} text-[clamp(36px,5vw,52px)] tracking-wider leading-none mb-6`}>
              VOCÊ PAGA R$20/MÊS.<br />
              <span className="text-accent">USA 5% DO POTENCIAL.</span>
            </h2>
            <p className="text-text-secondary text-[15px] mb-5 leading-relaxed">
              A maioria das pessoas usa o Claude como um Google mais inteligente. Faz pergunta genérica,
              recebe resposta genérica. Resultado: mediano.
            </p>
            <p className="text-text-secondary text-[15px] mb-5 leading-relaxed">
              Skills são <strong className="text-text-primary">instruções de fábrica</strong> que você instala
              no Claude. Ele para de adivinhar o que você quer e começa a executar com o tom, formato e
              profundidade certos.
            </p>
            <p className="text-text-secondary text-[15px] leading-relaxed">
              É a diferença entre pedir algo para um estagiário e para um especialista sênior que já sabe
              exatamente o que fazer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-3">
            {/* sem skill */}
            <div className="bg-bg border border-white/5 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="text-text-secondary text-[11px] mx-auto tracking-wider">claude — sem skill</span>
              </div>
              <div className="p-5 text-[13px] font-mono leading-loose">
                <div><span className="text-accent">você → </span>escreve um post para instagram</div>
                <div className="text-text-secondary">Claude: Claro! Aqui está um post...</div>
                <div className="text-text-secondary">"✨ Nunca pare de aprender! Cada</div>
                <div className="text-text-secondary">dia é uma nova oportunidade!"</div>
                <div className="text-red-400 mt-1">// genérico. descartável. zero resultado.</div>
              </div>
            </div>
            {/* com skill */}
            <div className="bg-bg border border-white/5 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="text-text-secondary text-[11px] mx-auto tracking-wider">claude — skill Social Media PRO instalada</span>
              </div>
              <div className="p-5 text-[13px] font-mono leading-loose">
                <div><span className="text-accent">você → </span>escreve um post para instagram</div>
                <div className="text-text-secondary">Claude: [Skill ativa] Analisando nicho,</div>
                <div className="text-text-secondary">aplicando hook + storytelling + CTA +</div>
                <div className="text-text-secondary">hashtags calibrados para seu público.</div>
                <div className="text-emerald-400 mt-1">// publicável. converte. diferente.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS GRID ── */}
      <section className="py-14 px-6 md:px-12 bg-bg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-8">
          <SectionLabel>O que você recebe</SectionLabel>
          <h2 className={`${bebas.className} text-[clamp(36px,5vw,54px)] tracking-wider leading-none mb-4`}>
            20 SKILLS PRONTAS.<br />
            <span className="text-accent">INSTALA EM 60 SEGUNDOS.</span>
          </h2>
          <p className="text-text-secondary text-[15px]">
            Cada Skill é uma instrução especializada que transforma o Claude em um expert na área —
            do zero, sem configuração técnica.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08 }}
              className="group relative bg-card border border-white/5 rounded-2xl p-6 overflow-hidden
                hover:border-accent/20 hover:-translate-y-1 hover:bg-[#111827] transition-all cursor-default">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-text-secondary text-[11px] tracking-[2px] uppercase mb-2.5">SKILL {skill.num}</div>
              <div className="font-black text-xl tracking-tight mb-2">{skill.name}</div>
              <div className="text-text-secondary text-[13px] leading-relaxed">{skill.desc}</div>
              <div className="flex justify-between items-center mt-4 pt-3.5 border-t border-white/5">
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${skill.tagCls}`}>
                  {skill.tag}
                </span>
                <a href={link} className="text-accent text-lg leading-none opacity-0 group-hover:opacity-100 transition-opacity">→</a>
              </div>
            </motion.div>
          ))}

          {/* BONUS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative bg-accent/5 border border-accent/25 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-accent to-accent/40" />
            <div className="text-accent text-[11px] tracking-[2px] uppercase mb-2.5 font-bold">BÔNUS</div>
            <div className="font-black text-xl tracking-tight mb-2 text-accent">Skills Novas Todo Mês</div>
            <div className="text-text-secondary text-[13px] leading-relaxed">
              Comprando hoje você recebe todas as Skills lançadas nos próximos 12 meses. Meta: 50 Skills no pack.
            </div>
            <div className="flex justify-between items-center mt-4 pt-3.5 border-t border-white/5">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent">Vitalício</span>
              <span className="text-accent text-lg">→</span>
            </div>
          </motion.div>
        </div>

        {/* ── ORDER BUMP ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => setBumpOn(!bumpOn)}
          className={`max-w-3xl mx-auto mt-8 relative border rounded-xl p-8 cursor-pointer transition-all
            ${bumpOn ? 'border-accent/70 bg-accent/[0.08]' : 'border-dashed border-accent/40 bg-accent/[0.04] hover:border-accent/60'}`}>
          <div className="absolute -top-3 left-6">
            <span className="bg-purple-500 text-white text-[11px] font-bold tracking-widest uppercase px-3.5 py-1 rounded">
              Oferta especial — adicione ao pedido
            </span>
          </div>
          <div className="flex gap-5 items-start">
            <div className={`w-6 h-6 rounded-md border-2 flex-shrink-0 mt-1 flex items-center justify-center transition-all
              ${bumpOn ? 'bg-accent border-accent' : 'border-accent/50 hover:border-accent'}`}>
              {bumpOn && <Check size={14} strokeWidth={3} className="text-black" />}
            </div>
            <div>
              <div className="font-black text-xl tracking-tight mb-2">Curso: Crie e Venda Suas Próprias Skills</div>
              <div className="text-text-secondary text-sm leading-relaxed mb-4">
                Aprenda a criar Skills do zero, montar seu marketplace, configurar checkout na Cakto
                e rodar tráfego para escalar. O mesmo método que gerou{' '}
                <strong className="text-purple-400">R$60k em 30 dias</strong> para quem já aplicou.
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-text-secondary text-sm line-through">R$197</span>
                <span className="font-black text-2xl text-purple-400">+ R$97</span>
                <span className="text-text-secondary text-sm">adicionando agora</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-14 px-6 md:px-12 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(255,212,0,0.06) 0%,transparent 70%)' }}
        />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <SectionLabel>Resumo do pedido</SectionLabel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex flex-col items-center gap-1 bg-card border border-white/5 rounded-xl px-14 py-6 mb-8">
            <span className="text-text-secondary text-[11px] font-semibold tracking-[2px] uppercase">Total hoje</span>
            <span className={`${bebas.className} text-6xl text-accent tracking-wider leading-none`}>
              {bumpOn ? 'R$144' : 'R$47'}
            </span>
            <span className="text-text-secondary text-sm">
              {bumpOn ? 'Pack 20 Skills + Curso Completo' : 'Pack 20 Skills — acesso vitalício'}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-3">
            <CtaButton href={link} size="lg">
              Garantir meu acesso agora <ArrowRight size={18} />
            </CtaButton>
            <p className="text-text-secondary text-xs font-mono tracking-widest">
              // PIX e Cartão · Processado pela Cakto · Acesso em minutos
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-lg mx-auto mt-8 border border-emerald-500/15 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">🛡️</div>
            <div className="font-black text-lg text-emerald-400 tracking-tight mb-3">Garantia de 7 Dias</div>
            <div className="text-text-secondary text-sm leading-relaxed">
              Se em 7 dias você não achar que valeu cada centavo, devolvemos 100% do valor.
              Sem perguntas, sem burocracia. Risco zero.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 px-6 md:px-12 bg-card border-t border-white/5">
        <div className="text-center mb-8">
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2 className={`${bebas.className} text-4xl tracking-wider`}>FAQ</h2>
        </div>
        <div className="max-w-2xl mx-auto divide-y divide-white/5">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="py-5 cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="flex justify-between items-center gap-4">
                <span className="font-semibold text-[15px]">{item.q}</span>
                <Plus
                  size={20}
                  className={`text-accent flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}
                />
              </div>
              {openFaq === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-text-secondary text-sm leading-relaxed mt-3">
                  {item.a}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
