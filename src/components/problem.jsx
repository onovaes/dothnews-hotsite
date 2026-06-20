import { useState, useEffect, useRef } from 'react'
import { Reveal, Shell, Chip, Card, Icon } from './ui'

const SIGNALS = [
  { icon: 'schedule',        text: 'Cada nova funcionalidade vira um projeto.' },
  { icon: 'support_agent',   text: 'O suporte demora mais do que deveria.' },
  { icon: 'bolt',            text: 'Pequenas mudanças geram grandes esforços.' },
  { icon: 'monetization_on', text: 'A monetização encontra limitações técnicas.' },
  { icon: 'groups',          text: 'A equipe cria atalhos para contornar problemas.' },
  { icon: 'warning',         text: 'O crescimento começa a gerar preocupação.' },
]

const PAINS = [
  { icon: 'schedule',             text: 'Suporte que responde em horas quando o problema exige minutos.' },
  { icon: 'speed',                text: 'Instabilidade em momentos de pico: exatamente quando a cobertura não pode parar.' },
  { icon: 'search',               text: 'Lentidão que prejudica SEO e impacta a receita publicitária.' },
  { icon: 'grid_view',            text: 'Limitações técnicas que travam a evolução editorial.' },
  { icon: 'electrical_services',  text: 'Dependência de plugins que ninguém controla de verdade.' },
  { icon: 'layers',               text: 'Plataforma que cresceu junto com o portal, mas parou de acompanhar.' },
]

export function GrowthSection() {
  return (
    <section id="estrutura" aria-labelledby="estrutura-title" className="mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 rounded-2xl sm:rounded-[32px] overflow-hidden bg-white py-24 lg:py-[120px]">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
          <Reveal>
            <Chip>Operação</Chip>
            <h2 id="estrutura-title" className="headline mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-ink sm:text-[42px]">
              Soluções simples funcionam.<br />
              <span className="text-faint">Até o crescimento começar.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="pretty text-[17px] leading-[1.66] text-mute">
              Quando audiência, monetização e operação evoluem, as limitações da estrutura começam a aparecer.
              O que antes parecia suficiente passa a consumir tempo, gerar dependência técnica e limitar novas
              oportunidades.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <Card className="h-full">
                <div className="text-primary">
                  <Icon name={p.icon} className="text-[32px]" />
                </div>
                <p className="mt-6 text-[15.5px] leading-[1.5] text-subink">{p.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  )
}

// J-curve: flat start → sharp exponential rise
const GROWTH_PATH = 'M 15 228 C 82 228 152 224 205 215 C 255 206 282 182 312 150 C 342 118 370 70 405 25'
// Nearly flat: barely rises over the same span
const STRUCT_PATH  = 'M 15 228 C 95 226 175 221 242 215 C 294 210 350 200 405 186'

function GrowthChart({ animated }) {
  const structRef = useRef(null)
  const [yah, setYah] = useState(null)

  useEffect(() => {
    const s = structRef.current
    if (!s) return
    const pt = s.getPointAtLength(0.58 * s.getTotalLength())
    setYah({ x: pt.x, y: pt.y })
  }, [])

  // All glow layers share the same dash animation so the halo follows the line as it draws
  const anim = (delay) => ({
    strokeDasharray: '1100',
    strokeDashoffset: animated ? 0 : 1100,
    style: { transition: `stroke-dashoffset 1.9s cubic-bezier(.4,0,.2,1) ${delay}s` },
  })

  return (
    <svg viewBox="0 0 420 300" fill="none" className="w-full select-none" aria-hidden="true">
      <defs>
        <linearGradient id="rf-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.07" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {[62, 112, 162, 212].map(y => (
        <line key={y} x1="12" y1={y} x2="408" y2={y}
          stroke="white" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
      ))}

      {/* Area fill beneath growth line */}
      <path
        d={`${GROWTH_PATH} L 405 235 L 15 235 Z`}
        fill="url(#rf-area)"
        opacity={animated ? 1 : 0}
        style={{ transition: 'opacity 1.2s ease 1.8s' }}
      />

      {/* Structure */}
      <path ref={structRef} d={STRUCT_PATH} stroke="#FB923C" strokeWidth="6"
        strokeLinecap="round" strokeLinejoin="round" {...anim(0.3)} />

      {/* Growth */}
      <path d={GROWTH_PATH} stroke="rgba(255,255,255,0.95)" strokeWidth="6"
        strokeLinecap="round" strokeLinejoin="round" {...anim(0)} />

      {/* "Você está aqui" — anchored to 58% of structure path */}
      {yah && (
        <>
          <line x1={yah.x} y1={yah.y + 5} x2={yah.x} y2={yah.y + 30}
            stroke="#FB923C" strokeWidth="1.5" strokeDasharray="3 3"
            opacity={animated ? 1 : 0}
            style={{ transition: 'opacity 0.4s ease 2.5s' }} />
          <rect x={yah.x - 58} y={yah.y + 31} width="116" height="24" rx="12" fill="#FB923C"
            opacity={animated ? 1 : 0}
            style={{ transition: 'opacity 0.4s ease 2.5s' }} />
          <text x={yah.x} y={yah.y + 48} textAnchor="middle"
            fill="white" fontSize="10.5" fontWeight="600"
            opacity={animated ? 1 : 0}
            style={{ transition: 'opacity 0.4s ease 2.5s' }}>
            Você está aqui
          </text>
        </>
      )}
    </svg>
  )
}

export function ReflectionSection() {
  const [animated, setAnimated] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    const el = chartRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); io.disconnect() } },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section aria-labelledby="reflexao-title" className="mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 rounded-2xl sm:rounded-[32px] overflow-hidden bg-primary py-24 lg:py-[120px]">
      <Shell>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-16">

          <div>
            <Reveal>
              <Chip variant="dark">Reflexão</Chip>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="reflexao-title" className="headline mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-white sm:text-[42px]">
                O problema nem sempre é o crescimento do portal.{' '}
                <span className="text-primary-200">Às vezes é a estrutura que ficou para trás.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="pretty mt-6 text-[17px] leading-[1.66] text-white/85">
                Seu portal cresce.<br />
                A audiência cresce.<br />
                A operação cresce.<br />
                Mas a <strong className="font-semibold text-white">estrutura</strong> nem sempre acompanha.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div ref={chartRef} className="rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-6 sm:px-6 sm:py-7">
              <GrowthChart animated={animated} />
              {/* Legend */}
              <div className="mt-3 flex items-center justify-center gap-7">
                <div className="flex items-center gap-2">
                  <svg width="26" height="6" viewBox="0 0 26 6" fill="none" aria-hidden="true">
                    <rect x="0" y="1" width="26" height="4" rx="2" fill="rgba(255,255,255,0.88)" />
                  </svg>
                  <span className="text-[12px] text-white/70">Crescimento do portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="26" height="6" viewBox="0 0 26 6" fill="none" aria-hidden="true">
                    <rect x="0" y="1" width="26" height="4" rx="2" fill="#FB923C" />
                  </svg>
                  <span className="text-[12px] text-white/70">Estrutura</span>
                </div>
              </div>
            </div>
          </Reveal>

        </div>

        <Reveal delay={100} className="mt-14 lg:mt-16">
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-8 py-10 lg:px-10 lg:py-12 backdrop-blur-sm">
            <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white/65">
              Sinais de que sua estrutura começou a limitar sua operação
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SIGNALS.map((s, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="flex-none rounded-lg bg-white/10 p-1.5">
                    <Icon name={s.icon} className="text-[18px] text-white/70" />
                  </div>
                  <span className="text-[14.5px] leading-[1.55] text-white/90">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </Shell>
    </section>
  )
}
