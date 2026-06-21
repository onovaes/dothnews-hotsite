import { useState } from 'react'
import { Reveal, Shell, Chip, Card, Icon } from './ui'

const EVO_CARDS = [
  {
    icon: 'auto_awesome',
    title: 'IA Editorial',
    text: 'Automação que amplia a capacidade da equipe sem substituir o jornalismo.',
    highlight: true,
  },
  {
    icon: 'search',
    title: 'SEO Técnico',
    text: 'Estrutura otimizada para tráfego orgânico em escala.',
  },
  {
    icon: 'speed',
    title: 'Performance',
    text: 'Velocidade e estabilidade que audiência e anunciantes exigem.',
    img: '/assets/monitoramento/webp/nginx-768.webp',
  },
  {
    icon: 'layers',
    title: 'Escalabilidade',
    text: 'Infraestrutura que cresce junto com a operação.',
  },
  {
    icon: 'autorenew',
    title: 'Atualizações Contínuas',
    text: 'Novas versões incluídas, sem custo adicional.',
  },
  {
    icon: 'monitor',
    title: 'Monitoramento Ativo',
    text: 'Visibilidade total da operação, em tempo real.',
    img: '/assets/monitoramento/webp/overview-768.webp',
  },
]

function EvoCard({ c }) {
  const hl = c.highlight
  return (
    <Card highlight={hl} className="relative h-full overflow-hidden">
      {c.img && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img src={c.img} alt="" loading="lazy" fetchpriority="low" width="768" height="480" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent"></div>
        </div>
      )}
      <div className={'relative inline-flex ' + (hl ? 'rounded-lg bg-white/15 p-2 text-white' : c.img ? 'rounded-lg bg-white/30 p-2 text-white' : 'text-primary')}>
        <Icon name={c.icon} className="text-[32px]" />
      </div>
      <div className="relative mt-6">
        <h3 className={'text-[18px] font-semibold ' + (hl ? 'text-white': c.img ? 'text-white' : 'text-ink')}>{c.title}</h3>
        <p className={'mt-2 text-[14.5px] leading-[1.5] ' + (hl ? 'text-white/80': c.img ? 'text-white' : 'text-mute')}>{c.text}</p>
        {c.img && (
          <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-white">
            // infra monitorada 24/7
          </span>
        )}
      </div>
    </Card>
  )
}

export function EvolutionSection() {
  return (
    <section id="evolucao" aria-labelledby="evolucao-title" className="mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 rounded-2xl sm:rounded-[32px] overflow-hidden py-24 lg:py-[120px]">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <Reveal>
            <Chip>Evolução</Chip>
            <h2 id="evolucao-title" className="headline mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-ink sm:text-[42px]">
              Crescimento sustentável exige evolução contínua da estrutura.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="pretty text-[17px] leading-[1.66] text-mute">
              A operação evolui.<br />
              O comportamento da audiência muda.<br />
              Novas formas de monetização surgem.<br />
              A tecnologia também precisa acompanhar.<br />
              Por isso a DothNews evolui continuamente sua infraestrutura, seus recursos e sua capacidade operacional.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVO_CARDS.slice(0, 3).map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <EvoCard c={c} />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVO_CARDS.slice(3).map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <EvoCard c={c} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <figure className="mx-auto mt-14 max-w-3xl rounded-2xl border border-line bg-surface px-8 py-12">
            <span aria-hidden="true" className="block font-serif text-[52px] leading-none text-center  text-primary/30">"</span>
            <blockquote className="headline -mt-5 text-[25px] font-semibold justify-center text-center leading-[1.34] text-ink sm:text-[31px]">
              Você foca na redação. A infraestrutura, a gente cuida.
            </blockquote>
          </figure>
        </Reveal>
      </Shell>
    </section>
  )
}

const FAQS = [
  {
    q: 'Como funciona a migração?',
    a: 'O processo começa com um diagnóstico estrutural da sua operação. Mapeamos conteúdo, URLs, configurações e dependências antes de qualquer movimento. A migração acontece em etapas planejadas, com validações em cada fase. Você não vai descobrir um problema depois que já aconteceu.',
  },
  {
    q: 'Eu perco conteúdo?',
    a: 'Não. Todo o conteúdo é migrado: publicações, categorias, autores, imagens, histórico editorial. Parte do diagnóstico é justamente mapear o que existe e garantir que nada fique para trás. Portais com anos de produção migram sem perda.',
  },
  {
    q: 'Meu portal sai do ar durante a migração?',
    a: 'Não. A migração acontece em etapas, com o portal operando normalmente durante todo o processo. Cada transição tem janelas controladas e plano de rollback disponível. Para uma operação editorial, downtime não é aceitável. O processo é construído com essa premissa.',
  },
  {
    q: 'Quanto tempo leva a implantação?',
    a: 'Depende do tamanho e da complexidade da operação. Portais menores podem ser migrados em poucas semanas. Operações maiores, com múltiplos veículos ou alto volume de conteúdo, exigem um cronograma mais detalhado. O diagnóstico é onde isso fica claro.',
  },
  {
    q: 'É possível migrar de outra plataforma?',
    a: 'Sim. Já migramos portais de WordPress, CMSs proprietários e outras plataformas. O processo de migração foi desenvolvido para absorver diferentes estruturas de dados e configurações. O diagnóstico identifica o que precisa de atenção específica antes do início.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'É uma equipe que conhece a sua operação e o que está em jogo, não um sistema de tickets. O objetivo é que você nunca precise lembrar que tem suporte. As coisas simplesmente funcionam.',
  },
]

function FaqItem({ item, open, onToggle, index }) {
  return (
    <div className="border-b border-line">
      <button onClick={onToggle} className="group flex w-full items-center gap-5 py-6 text-left">
        <span className="w-6 font-mono text-[12px] text-faint">{String(index + 1).padStart(2, '0')}</span>
        <span className="flex-1 text-[18px] font-semibold leading-[1.4] text-ink transition-colors group-hover:text-primary sm:text-[19px]">
          {item.q}
        </span>
        <span className={
          'flex h-9 w-9 flex-none items-center justify-center rounded-[10px] border transition-all duration-300 ' +
          (open
            ? 'border-primary bg-primary text-white'
            : 'border-line bg-white text-ink group-hover:border-primary/40')
        }>
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            {open ? 'remove' : 'add'}
          </span>
        </span>
      </button>
      <div
        className={'grid faq-answer transition-all duration-300 ease-out' + (open ? ' is-open' : '')}
      >
        <div className="overflow-hidden">
          <p className="pretty max-w-3xl pb-7 pl-11 pr-12 text-[16px] leading-[1.66] text-mute">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 rounded-2xl sm:rounded-[32px] overflow-hidden bg-neutral-50 py-24 lg:py-[120px]">
      <Shell className="max-w-4xl">
        <Reveal className="text-center">
          <Chip className="justify-center">Dúvidas</Chip>
          <h2 id="duvidas-title" className="headline mx-auto mt-5 max-w-2xl text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-ink sm:text-[42px]">
            As perguntas que você provavelmente está fazendo.
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-12 border-t border-line">
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </Shell>
    </section>
  )
}
