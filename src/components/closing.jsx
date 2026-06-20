import { useState, useEffect, useRef } from 'react'
import { Reveal, Shell, Chip, Card, Icon, Button } from './ui'
import { MetricsGrid } from './solution'
import { FormInput } from './form/FormInput'
import { FormSelect } from './form/FormSelect'
import { FormTextarea } from './form/FormTextarea'

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico Inicial',
    text: 'Você compartilha os dados básicos da sua operação. Nossa equipe entende o cenário atual e identifica os primeiros pontos de atenção.',
  },
  {
    n: '02',
    title: 'Análise Estrutural',
    text: 'Avaliamos plataforma, audiência, operação, gargalos e oportunidades de evolução com base no que realmente existe.',
  },
  {
    n: '03',
    title: 'Recomendação Estratégica',
    text: 'Apresentamos o que encontramos com honestidade e, se fizer sentido para os dois lados, um caminho claro para os próximos passos.',
  },
]

const AUDIENCIA_OPTIONS = [
  { value: 'ate-100k', label: 'Até 100 mil pageviews/mês' },
  { value: '100k-300k', label: '100 mil a 300 mil pageviews/mês' },
  { value: '300k-1m', label: '300 mil a 1 milhão de pageviews/mês' },
  { value: '1m-5m', label: '1 milhão a 5 milhões de pageviews/mês' },
  { value: '5m+', label: 'Acima de 5 milhões de pageviews/mês' },
]

const PLATAFORMA_OPTIONS = [
  { value: 'wordpress', label: 'WordPress' },
  { value: 'cms-proprio', label: 'CMS próprio' },
  { value: 'plataforma-noticias', label: 'Plataforma especializada para notícias' },
  { value: 'outra', label: 'Outra plataforma' },
  { value: 'desconhecido', label: 'Não sei informar' },
]

const NEXT_STEP_FEATURES = [
  {
    icon: 'analytics',
    title: 'Diagnóstico consultivo',
    text: 'Analisamos sua estrutura, identificamos gargalos e oportunidades de evolução.',
  },
  {
    icon: 'verified_user',
    title: 'Sem compromisso',
    text: 'Entendemos seu cenário antes de recomendar qualquer caminho.',
  },
  {
    icon: 'schedule',
    title: 'Sem pressão comercial',
    text: 'Conversa inicial leve e estratégica para entender o momento do seu portal.',
  },
]

const FINAL_METRICS = [
  { value: '22+',   label: 'anos de história' },
  { value: '100+',  label: 'plataformas entregues' },
  { value: '40+',   label: 'portais ativos' },
  { value: '100M+', label: 'pageviews por mês' },
  { value: '99,9%', label: 'disponibilidade média' },
]

// Máscara de telefone BR: (XX) XXXXX-XXXX (celular) ou (XX) XXXX-XXXX (fixo).
// Formata progressivamente conforme o usuário digita; ignora não-dígitos.
function formatPhoneBR(value) {
  const d = String(value ?? '').replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const EMPTY_FORM = {
  nome: '',
  email: '',
  portal: '',
  url: '',
  contato: '',
  audiencia: '',
  plataforma: '',
  dificuldade: '',
  observacoes: '',
  // Honeypot anti-spam: campo oculto que humanos não veem nem tabulam.
  // Se vier preenchido, o backend descarta silenciosamente (ver api/contact.js).
  empresa_site: '',
}

function DiagnosisForm({ onSuccess }) {
  const [data, setData] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const nomeRef = useRef(null)

  // Foco inicial no "Nome completo" ao abrir o formulário (só monta no modal).
  // Pequeno delay para garantir que o modal já está pintado antes de focar.
  useEffect(() => {
    const t = setTimeout(() => nomeRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [])

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))
  const valid = data.nome && data.email && data.portal && data.contato

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valid || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.rs === 'ok') {
        onSuccess(data.nome)
      } else {
        setError('Ocorreu um erro ao enviar. Tente novamente.')
      }
    } catch {
      setError('Não foi possível conectar ao servidor. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput name="nome" label="Nome completo" required autoComplete="name" inputRef={nomeRef} value={data.nome} onChange={set('nome')} />
        <FormInput name="email" label="E-mail" type="email" required autoComplete="email" value={data.email} onChange={set('email')} />
        <FormInput name="portal" label="Nome do portal" required value={data.portal} onChange={set('portal')} />
        <FormInput name="url" label="URL do portal" type="text" autoComplete="url" value={data.url}  onChange={(e) => {let url = e.target.value; if (url && !url.startsWith('http://') && !url.startsWith('https://')) {url = `https://${url}`;}set('url')({ target: { value: url } });}} />
        <FormInput name="contato" label="WhatsApp / Contato" required autoComplete="tel" inputMode="tel" maxLength={15} value={data.contato} onChange={(e) => set('contato')({ target: { value: formatPhoneBR(e.target.value) } })} />
        <FormSelect name="audiencia" label="Faixa de audiência mensal" value={data.audiencia} options={AUDIENCIA_OPTIONS} onChange={set('audiencia')} />
        <FormSelect name="plataforma" label="Plataforma atual" value={data.plataforma} options={PLATAFORMA_OPTIONS} onChange={set('plataforma')} />
      </div>
      <div className="mt-5 grid gap-5">
        <FormTextarea
          name="dificuldade"
          label="Principal dificuldade hoje"
          value={data.dificuldade}
          onChange={set('dificuldade')}
          rows={3}
          resize="none"
          helper="Conte, em poucas linhas, o que mais te incomoda na estrutura atual."
        />
        <FormTextarea
          name="observacoes"
          label="Observações"
          value={data.observacoes}
          onChange={set('observacoes')}
          rows={3}
          resize="none"
          helper="Inclua contexto adicional, como urgência, cenário de migração ou detalhes da operação."
        />
      </div>
      {/* Honeypot anti-spam — invisível e fora da navegação por teclado.
          Bots costumam preencher todos os campos; humanos nunca veem este. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="empresa_site">Não preencha este campo</label>
        <input
          id="empresa_site"
          name="empresa_site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.empresa_site}
          onChange={set('empresa_site')}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={loading ? null : 'arrow_outward'}
        disabled={loading}
        className="mt-7 w-full justify-center"
      >
        {loading ? 'Enviando…' : 'Solicitar diagnóstico'}
      </Button>
      {error && (
        <p role="alert" className="mt-3 text-center text-[13px] text-red-600">
          {error}
        </p>
      )}
      <p className="mt-4 text-center text-[12.5px] text-faint">
        Retornamos em até 48 horas úteis · Sem compromisso · Sem proposta na primeira conversa
      </p>
    </form>
  )
}

export function DiagnosisModal({ open, onClose }) {
  const [sent, setSent] = useState(false)
  const [firstName, setFirstName] = useState('')
  const closeRef = useRef(null)

  // Lock body scroll when open. O foco inicial é tratado pelo DiagnosisForm,
  // que foca o campo "Nome completo" ao montar.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on ESC
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Reset success state when modal closes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setSent(false), 300)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnosis-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line px-6 pt-6 pb-5 sm:px-8">
          <div>
            <h2 id="diagnosis-modal-title" className="headline text-[20px] font-bold text-ink">
              Diagnóstico gratuito
            </h2>
            <p className="mt-1 text-[14px] text-mute">
              Nossa equipe retorna em até 48 horas úteis.
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Fechar"
            className="ml-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-faint transition-colors hover:bg-tint hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        {/* Body */}
        {sent ? (
          <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon name="check_circle" className="text-[28px]" />
            </div>
            <h3 className="headline mt-6 text-[22px] font-bold text-ink">Solicitação recebida.</h3>
            <p className="pretty mt-3 max-w-sm text-[15px] leading-[1.6] text-mute">
              Obrigado, {firstName}. Nossa equipe retorna em até 48 horas úteis com os próximos passos do seu diagnóstico.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-7 text-[14px] font-semibold text-primary hover:underline"
            >
              Enviar outra solicitação
            </button>
          </div>
        ) : (
          <DiagnosisForm
            onSuccess={(nome) => {
              setFirstName(nome.split(' ')[0] || 'tudo certo')
              setSent(true)
            }}
          />
        )}
      </div>
    </div>
  )
}

export function DiagnosisSection() {
  return (
    <section id="diagnostico" aria-labelledby="diagnostico-title" className="mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 rounded-2xl sm:rounded-[32px] overflow-hidden py-24 lg:py-[120px]">
      <Shell>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Chip className="justify-center">Diagnóstico</Chip>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="diagnostico-title" className="headline mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-ink sm:text-[42px]">
              Antes de indicar uma solução, entendemos a estrutura da sua operação.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="pretty mx-auto mt-6 max-w-2xl text-[17px] leading-[1.66] text-mute">
              Nosso processo começa com um diagnóstico consultivo.
              Entendemos o cenário atual do portal, identificamos gargalos e avaliamos oportunidades de evolução antes
              de recomendar qualquer caminho.
            </p>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <Card className="h-full">
                <span className="font-mono text-[14px] font-semibold text-primary">{s.n}</span>
                <h3 className="mt-4 text-[16px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.5] text-mute">{s.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[16px] leading-[1.6] text-subink">
            Não existe proposta padrão. Existe o entendimento da sua operação e uma recomendação baseada nisso.
          </p>
        </Reveal>
      </Shell>
    </section>
  )
}

export function FinalCta({ onOpenForm }) {
  return (
    <section className="mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 rounded-2xl sm:rounded-[32px] overflow-hidden bg-primary py-24 text-white lg:py-32">
      <Shell className="text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Chip className="justify-center" variant="dark">Próximo passo</Chip>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="headline mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] sm:text-[42px]">
              <span className="block">O crescimento já aconteceu.</span>
              <span className="block">Agora a estrutura precisa acompanhar.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="pretty mx-auto mt-6 max-w-2xl text-[17px] leading-[1.66] text-white/70">
              Descubra se a infraestrutura atual do seu portal está preparada para sustentar os próximos ciclos de crescimento, monetização e operação.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 grid gap-10 sm:grid-cols-3 border-t border-white/10 pt-10">
              {NEXT_STEP_FEATURES.map((f, i) => (
                <div key={i} className="flex flex-col gap-3 text-left">
                  <div className="text-white/80">
                    <Icon name={f.icon} className="text-[40px]" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-white">{f.title}</h3>
                  <p className="text-[14.5px] leading-[1.6] text-white/65">{f.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Button
                variant="white"
                size="lg"
                icon="arrow_outward"
                className="shadow-[0_22px_50px_-20px_rgba(0,0,0,0.5)]"
                onClick={onOpenForm}
              >
                Solicitar diagnóstico
              </Button>
              <span className="text-[13px] text-white/55">
                Conversa inicial de aproximadamente 30 minutos.
              </span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={320} className="mt-16">
          <div className="border-t border-white/10 pt-8">
            <MetricsGrid metrics={FINAL_METRICS} />
            <p className="mt-12 text-center leading-[1.15] tracking-[-0.02em]">
              <span className="block text-[26px] font-semibold text-white/50 sm:text-[36px] lg:text-[44px]">
                Você cuida da audiência.
              </span>
              <span className="block text-[26px] font-bold text-white sm:text-[36px] lg:text-[44px]">
                A infraestrutura cuida do resto.
              </span>
            </p>
          </div>
        </Reveal>
      </Shell>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 mb-3 sm:mb-4 rounded-2xl sm:rounded-[32px] overflow-hidden bg-white pb-12 pt-16 ">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <img src="/assets/logo-dothnews.svg" alt="DothNews" width="569" height="76" className="h-[25px] w-auto" />
            <p className="mt-5 max-w-md text-[13.5px] leading-[1.65] text-mute">
              A DothNews é desenvolvida pela{' '}
              <span className="font-medium text-subink">DothCom</span>, empresa com mais
              de 22 anos de experiência em tecnologia para operações editoriais digitais no Brasil.
            </p>
          </div>
          <div className="flex flex-col lg:items-end lg:justify-center">
            <p className="text-[15px] leading-[1.55] text-ink lg:text-right">
              Infraestrutura especializada para portais de notícias.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[12.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 DothNews · DothCom Tecnologia. Todos os direitos reservados.</span>
          <span className="flex items-center gap-2">
            infraestrutura editorial · desde 2004 · 
            <img src="/assets/logo-dothcom.svg" alt="DothCom" width="198" height="87" className="h-[48px] w-auto opacity-70" />
          </span>
        </div>
      </Shell>
    </footer>
  )
}
