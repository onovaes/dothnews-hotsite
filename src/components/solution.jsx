import { useState, useEffect, useRef } from 'react'
import { Reveal, Shell, Chip, Card, Icon } from './ui'


function BlobPurple({ fill1 = '#2600FF', fill2 = '#00FFE1' }) {
  return (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: 'block' }} viewBox="0 0 1411.11 324.151" fill="none">
      <path fill={fill1} d="M91.7767 7.13611H0V317.581C12.4788 317.581 89.0921 317.581 91.7767 317.581C159.553 317.581 214.618 245.622 214.618 162.366C214.618 77.3126 159.081 7.13611 91.7767 7.13611ZM91.7767 251.556H52.2442V73.1437H91.7767C130.371 73.1437 162.374 114.187 162.374 162.358C162.374 211.118 129.899 251.556 91.7767 251.556ZM283.75 0.596669C220.211 -1.78206 165.618 74.3371 166.556 162.358C165.612 249.774 220.211 325.902 283.75 324.12C347.289 325.902 401.882 249.774 400.944 162.358C401.882 74.3453 347.289 -1.78206 283.75 0.596669ZM327.992 233.131C316.225 252.758 301.165 262.273 283.75 262.273C266.335 262.273 251.748 252.758 239.508 233.131C227.741 213.505 221.621 190.314 221.621 162.366C221.621 107.656 249.386 62.4517 283.75 62.4517C301.165 62.4517 315.753 72.5551 327.992 92.1817C340.231 111.808 346.345 134.999 346.345 162.366C346.345 190.306 340.231 213.497 327.992 233.131ZM334.687 7.13611H564.837V73.1437H475.888V317.572H423.644V73.1437H334.694L334.687 7.13611ZM717.756 7.13611V317.581H665.046V195.064H560.57V317.572H508.326V7.13611H560.57V129.056H665.046V7.13611H717.756Z" />
      <path fill={fill2} d="M842.784 7.13617H895.494V317.58H853.606L738.289 132.032V317.58H686.051V7.13617H727.938L842.771 193.282V7.13617H842.784ZM810.071 317.278H966.797V251.262H862.308V194.769H966.797V128.762H862.308V72.8495H966.797V6.8419H810.071V317.278ZM1145.26 195.064L1077.48 7.13617H1021.49L1055.37 97.5359L1020.07 195.072L951.829 7.14435H895.82L1014.42 324.128H1025.25L1082.67 170.688L1140.09 324.128H1150.44L1269.51 7.14435H1213.52L1145.26 195.064ZM1391.35 170.68C1378.18 158.197 1362.64 148.086 1344.29 140.95C1326.4 133.814 1308.52 126.081 1290.17 118.34C1271.81 110.018 1262.87 101.1 1262.87 90.9883C1262.87 71.9585 1276.99 60.6534 1305.69 60.6534C1329.23 60.6534 1361.23 74.3372 1385.71 89.7866L1404.07 40.4301C1370.65 13.6756 1334.41 0 1298.16 0C1244.98 0 1202.63 42.8171 1202.63 93.9637C1202.63 117.162 1209.21 135.596 1222.39 149.271C1235.57 162.366 1251.1 172.47 1268.99 180.195C1287.34 187.331 1305.23 195.064 1323.58 202.805C1341.94 210.529 1351.35 219.456 1351.35 230.156C1351.35 253.943 1330.16 263.458 1305.22 263.458C1279.81 263.458 1249.69 253.355 1214.39 232.535L1206.86 287.245C1236.98 311.629 1270.87 324.128 1308.98 324.128C1363.11 324.128 1411.11 286.657 1411.11 223.02C1411.12 201.015 1404.53 183.17 1391.35 170.68Z" />
    </svg>
  )
}

function BlobBlue({ fill1 = '#1500FF', fill2 = '#394AF7' }) {
  return (
    <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: 'block' }} viewBox="0 0 1419.99 404.092" fill="none">
      <path fill={fill1} d="M63.2068 8.89593H0V395.902C8.5942 395.902 61.3579 395.902 63.2068 395.902C109.885 395.902 147.808 306.196 147.808 202.408C147.808 96.3791 109.559 8.89593 63.2068 8.89593ZM63.2068 313.594H35.9807V91.1821H63.2068C89.7869 91.1821 111.827 142.347 111.827 202.398C111.827 263.183 89.4617 313.594 63.2068 313.594ZM245.209 0.743751C201.449 -2.22161 163.851 92.6698 164.497 202.398C163.847 311.373 201.449 406.274 245.209 404.054C288.968 406.274 326.566 311.373 325.92 202.398C326.566 92.68 288.968 -2.22161 245.209 0.743751ZM275.678 290.625C267.574 315.092 257.202 326.954 245.209 326.954C233.215 326.954 223.169 315.092 214.739 290.625C206.635 266.159 202.42 237.249 202.42 202.408C202.42 134.205 221.542 77.8532 245.209 77.8532C257.202 77.8532 267.249 90.4484 275.678 114.915C284.108 139.382 288.318 168.292 288.318 202.408C288.318 237.239 284.108 266.148 275.678 290.625ZM339.041 8.89593H497.546V91.1821H436.286V395.89H400.305V91.1821H339.046L339.041 8.89593ZM672.567 8.89593V395.902H636.265V243.169H564.313V395.89H528.332V8.89593H564.313V160.883H636.265V8.89593H672.567Z" />
      <path fill={fill2} d="M809.512 8.89607H845.814V395.901H816.966L737.547 164.593V395.901H701.57V8.89607H730.418L809.504 240.948V8.89607H809.512ZM876.604 395.524H984.542V313.227H912.581V242.803H984.542V160.517H912.581V90.8154H984.542V8.52922H876.604V395.524ZM1187.11 243.17L1140.44 8.89607H1101.87L1125.21 121.59L1100.9 243.18L1053.9 8.90627H1015.32L1097.01 404.063H1104.46L1144 212.782L1183.55 404.063H1190.68L1272.69 8.90627H1234.12L1187.11 243.17ZM1406.39 212.772C1397.31 197.212 1386.62 184.606 1373.98 175.71C1361.65 166.814 1349.34 157.174 1336.7 147.524C1324.06 137.15 1317.9 126.033 1317.9 113.428C1317.9 89.7046 1327.62 75.6115 1347.39 75.6115C1363.6 75.6115 1385.64 92.67 1402.5 111.93L1415.14 50.4009C1392.13 17.0483 1367.17 0 1342.21 0C1305.58 0 1276.41 53.3765 1276.41 117.137C1276.41 146.057 1280.95 169.036 1290.02 186.084C1299.1 202.409 1309.79 215.004 1322.11 224.634C1334.76 233.53 1347.07 243.17 1359.71 252.82C1372.35 262.449 1378.84 273.577 1378.84 286.916C1378.84 316.57 1364.25 328.431 1347.07 328.431C1329.57 328.431 1308.82 315.836 1284.51 289.882L1279.32 358.085C1300.07 388.482 1323.41 404.063 1349.66 404.063C1386.94 404.063 1419.99 357.351 1419.99 278.02C1420 250.588 1415.46 228.343 1406.39 212.772Z" />
    </svg>
  )
}

const PILLARS = [
  {
    icon: 'code',
    title: 'Tecnologia Própria',
    text: 'Controle total da evolução da plataforma.',
  },
  {
    icon: 'article',
    title: 'Operação Editorial',
    text: 'Fluxos pensados para redações reais.',
    highlight: true,
  },
  {
    icon: 'speed',
    title: 'Performance',
    text: 'Estrutura preparada para alto volume de audiência.',
  },
  {
    icon: 'headset_mic',
    title: 'Suporte Especializado',
    text: 'Equipe que vive diariamente as operações editoriais.',
  },
]

// WebP gerados por `npm run images` em /assets/area-administrativa/webp/.
// Larguras devem casar com CAROUSEL_WIDTHS em scripts/optimize-images.mjs.
const ADMIN_WEBP = '/assets/area-administrativa/webp'
const CAROUSEL_WIDTHS = [480, 768, 1142, 1846]
const adminSrcSet = (name) => CAROUSEL_WIDTHS.map((w) => `${ADMIN_WEBP}/${name}-${w}.webp ${w}w`).join(', ')

const SGI_SLIDES = [
  {
    src: `${ADMIN_WEBP}/dashboard-1142.webp`,
    srcSet: adminSrcSet('dashboard'),
    alt: 'Painel principal com visão geral da operação editorial',
    label: '// painel editorial',
    text: 'Visão geral consolidada da operação: publicações recentes, métricas de conteúdo e atividade da redação em um único painel.',
    imgW: 1846, imgH: 928,
  },
  {
    src: `${ADMIN_WEBP}/criar-post-1142.webp`,
    srcSet: adminSrcSet('criar-post'),
    alt: 'Editor de criação de post',
    label: '// editor de post',
    text: 'O mesmo editor que centenas de jornalistas usam todos os dias. Pensado para o fluxo de uma redação, não adaptado de um CMS genérico.',
    imgW: 1846, imgH: 928,
  },
  {
    src: `${ADMIN_WEBP}/posts-1142.webp`,
    srcSet: adminSrcSet('posts'),
    alt: 'Listagem e gestão de publicações no painel editorial',
    label: '// gestão de publicações',
    text: 'Listagem, filtros e controle de todo o conteúdo publicado. Fluxo editorial pensado para agilidade sem perder rastreabilidade.',
    imgW: 1846, imgH: 928,
  },
  {
    src: `${ADMIN_WEBP}/app-token-1142.webp`,
    srcSet: adminSrcSet('app-token'),
    alt: 'Tela de App Token da plataforma editorial',
    label: '// app token',
    // TODO(copy): revisar a descrição do recurso App Token.
    text: 'Geração e controle de tokens de acesso para integrações e automações com a plataforma, com permissões por aplicação.',
    imgW: 1846, imgH: 928,
  },
  {
    src: `${ADMIN_WEBP}/dispositivos-conectados-1142.webp`,
    srcSet: adminSrcSet('dispositivos-conectados'),
    alt: 'Tela de dispositivos conectados da plataforma editorial',
    label: '// dispositivos conectados',
    // TODO(copy): revisar a descrição do recurso Dispositivos conectados.
    text: 'Visibilidade dos dispositivos e sessões conectados à operação, com controle de acesso e encerramento remoto.',
    imgW: 1846, imgH: 928,
  },
  {
    src: `${ADMIN_WEBP}/search-console-missing-urls-1142.webp`,
    srcSet: adminSrcSet('search-console-missing-urls'),
    alt: 'Detecção de URLs 404 com criação de redirecionamento',
    label: '// recuperação de 404',
    text: 'Detecta automaticamente as URLs que retornam 404 e permite criar o redirecionamento na hora — nenhum acesso (nem SEO) é perdido por link quebrado.',
    imgW: 1846, imgH: 928,
  },
  {
    src: `${ADMIN_WEBP}/desempenho-1142.webp`,
    srcSet: adminSrcSet('desempenho'),
    alt: 'Painel de desempenho do site: tráfego, audiência e melhor hora para publicar',
    label: '// desempenho do site',
    text: 'Audiência em tempo real: fontes de tráfego, cidades, dispositivos e novos vs. recorrentes — e, principalmente, o melhor dia e horário para publicar, com base nos dados reais da operação.',
    imgW: 1846, imgH: 928,
  },
]

// WebP gerados por `npm run images` em /assets/monitoramento/webp/.
const MON_WEBP = '/assets/monitoramento/webp'
const monSrcSet = (name) => CAROUSEL_WIDTHS.map((w) => `${MON_WEBP}/${name}-${w}.webp ${w}w`).join(', ')

const MONITORING_SLIDES = [
  {
    src: `${MON_WEBP}/overview-1142.webp`,
    srcSet: monSrcSet('overview'),
    alt: 'Visão geral do ambiente de monitoramento no Grafana',
    label: '// visão geral do ambiente',
    text: 'O mesmo painel que a nossa equipe acompanha internamente: o estado de toda a infraestrutura — CPU, memória, disco e rede de cada servidor em um único lugar.',
    imgW: 1917, imgH: 908,
  },
  {
    src: `${MON_WEBP}/mysql-1142.webp`,
    srcSet: monSrcSet('mysql'),
    alt: 'Dashboard MySQL com QPS, conexões e buffer pool em tempo real',
    label: '// banco de dados em operação real',
    text: 'QPS, conexões e buffer pool que o nosso time acompanha a todo momento. Infraestrutura que não esconde o que está acontecendo.',
    imgW: 1897, imgH: 910,
  },
  {
    src: `${MON_WEBP}/nginx-1142.webp`,
    srcSet: monSrcSet('nginx'),
    alt: 'Dashboard de monitoramento do Nginx com requisições e latência',
    label: '// camada web em tempo real',
    text: 'Requisições, tempo de resposta e status HTTP que a nossa equipe monitora no Nginx — anomalias detectadas antes de virarem incidente.',
    imgW: 1900, imgH: 904,
  },
]

function PillarCard({ p }) {
  const hl = p.highlight
  return (
    <Card highlight={hl} className="h-full">
      <div className={hl ? 'inline-flex rounded-lg bg-white/15 p-2 text-white' : 'text-primary'}>
        <Icon name={p.icon} className="text-[32px]" />
      </div>
      <h3 className={'mt-6 text-[18px] font-semibold ' + (hl ? 'text-white' : 'text-ink')}>{p.title}</h3>
      <p className={'mt-2.5 text-[14.5px] leading-[1.55] ' + (hl ? 'text-white/80' : 'text-mute')}>{p.text}</p>
    </Card>
  )
}

function ScreenCarousel({ slides, imageRight = true }) {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const [dir, setDir] = useState(1)
  const timerRef = useRef(null)
  const hasAnimated = useRef(false)
  const total = slides.length
  const showNav = total > 1

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const go = (newIndex, direction) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    hasAnimated.current = true
    setPrevIndex(index)
    setDir(direction)
    setIndex(newIndex)
    timerRef.current = setTimeout(() => setPrevIndex(null), 400)
  }

  const goNext = () => go((index + 1) % total, 1)
  const goPrev = () => go((index - 1 + total) % total, -1)

  const slide = slides[index]
  const prevSlide = prevIndex !== null ? slides[prevIndex] : null

  // dir=1 (próximo): entra pela direita, sai pela esquerda
  // dir=-1 (anterior): entra pela esquerda, sai pela direita
  const enterClass = hasAnimated.current ? (dir > 0 ? 'sc-img-enter-right' : 'sc-img-enter-left') : ''
  const exitClass  = dir > 0 ? 'sc-img-exit-left' : 'sc-img-exit-right'

  const borderClass = imageRight
    ? 'lg:border-l'
    : 'lg:border-r'

  const imageBlock = (
    <div className={`relative overflow-hidden min-h-[260px] ${borderClass}`}>
      {prevSlide && (
        <img
          key={`prev-${prevIndex}`}
          src={prevSlide.src}
          srcSet={prevSlide.srcSet}
          sizes="(min-width: 1024px) 680px, 100vw"
          alt={prevSlide.alt}
          width={prevSlide.imgW}
          height={prevSlide.imgH}
          className={`absolute inset-0 h-full w-full object-cover object-left-top ${exitClass}`}
        />
      )}
      <img
        key={`curr-${index}`}
        src={slide.src}
        srcSet={slide.srcSet}
        sizes="(min-width: 1024px) 680px, 100vw"
        alt={slide.alt}
        width={slide.imgW}
        height={slide.imgH}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover object-left-top ${enterClass}`}
      />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center p-8 lg:p-12">
      <div key={index} className={hasAnimated.current ? 'sc-text-enter' : ''}>
        <span className="text-[11px] uppercase tracking-[0.14em] text-faint">
          {slide.label}
        </span>
        <p className="pretty mt-4 text-[19px] leading-[1.5] text-subink">
          {slide.text}
        </p>
      </div>
      {showNav && (
        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={goPrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface"
            aria-label="Tela anterior"
          >
            <Icon name="chevron_left" className="text-[20px]" />
          </button>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={'h-1.5 rounded-full transition-all ' + (i === index ? 'w-4 bg-primary' : 'w-1.5 bg-line hover:bg-primary/40')}
                aria-label={`Ir para tela ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface"
            aria-label="Próxima tela"
          >
            <Icon name="chevron_right" className="text-[20px]" />
          </button>
          <span className="ml-1 text-[12px] tabular-nums text-faint">
            {index + 1} / {total}
          </span>
        </div>
      )}
    </div>
  )

  const cols = imageRight
    ? 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]'
    : 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'

  return (
    <div className={'grid items-stretch overflow-hidden rounded-2xl border border-line bg-white ' + cols}>
      {imageRight ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
    </div>
  )
}

export function WhatSection() {
  return (
    <section id="plataforma" aria-labelledby="plataforma-title" className="mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 rounded-2xl sm:rounded-[32px] overflow-hidden py-24 lg:py-[120px]">
      <Shell>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Chip className="justify-center">Plataforma</Chip>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="plataforma-title" className="headline mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-ink sm:text-[42px]">
              Infraestrutura especializada para operações editoriais que cresceram além das soluções genéricas.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="pretty mx-auto mt-6 max-w-2xl text-[17px] leading-[1.66] text-mute">
              A DothNews foi desenvolvida exclusivamente para portais de notícias.<br />
              Não é uma adaptação.<br />
              Não depende de dezenas de componentes externos.<br />
              É uma plataforma construída para lidar com os desafios reais de operações editoriais profissionais.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PILLARS.slice(0, 2).map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <PillarCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* Carrossel SGI — interface editorial */}
        <Reveal delay={120} className="mt-6">
          <ScreenCarousel slides={SGI_SLIDES} imageRight={true} />
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {PILLARS.slice(2).map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <PillarCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* Carrossel Monitoramento — infraestrutura */}
        <Reveal delay={120} className="mt-6">
          <ScreenCarousel slides={MONITORING_SLIDES} imageRight={false} />
        </Reveal>
      </Shell>
    </section>
  )
}

const CLIENT_CARDS = [
  { name: 'Correio do Estado',    logo: '/assets/clients/webp/correiodoestado.webp',    logoW: 545, logoH: 110, meta: 'Campo Grande · MS',    print: '/assets/clients/prints/webp/correiodoestado' },
  { name: 'Folha de Pernambuco',  logo: '/assets/clients/webp/folhadepernambuco.webp',  logoW: 570, logoH: 114, meta: 'Recife · PE',           print: '/assets/clients/prints/webp/folhadepernambuco' },
  { name: 'Diário do Estado',     logo: '/assets/clients/webp/diariadoestado.webp',     logoW: 440, logoH: 87,  meta: 'Portal de notícias',   print: null },
  { name: 'Folha de Alphaville',  logo: '/assets/clients/webp/folhadealphaville.webp',  logoW: 740, logoH: 165, meta: 'Alphaville · SP',       print: null },
  { name: 'Portal de Prefeitura', logo: '/assets/clients/webp/portaldeprefeitura.webp', logoW: 438, logoH: 111, meta: 'Gestão pública',       print: null },
]

const METRICS = [
  { value: '22+',   label: 'anos de história' },
  { value: '100+',  label: 'plataformas ativas' },
  { value: '40+',   label: 'operações editoriais' },
  { value: '100M+', label: 'pageviews por mês' },
  { value: '99,9%', label: 'uptime média' },
]

const WHY_BULLETS = [
  'Tecnologia própria: nenhum plugin crítico de terceiro',
  'Controle total da stack técnica',
  'Independência operacional real',
  'Evolução planejada para portais editoriais',
]

export function MetricsGrid({ metrics }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-white/80 rounded-2xl overflow-hidden">
      {metrics.map((m, i) => (
        <div
          key={i}
          className={'flex flex-col items-center justify-center gap-2 px-4 py-8 bg-white' + (i === 4 ? ' col-span-2 sm:col-span-1' : '')}
        >
          <div className="headline text-[40px] font-bold leading-none text-primary-700 sm:text-[48px]">{m.value}</div>
          <div className="mt-1 text-[13px] leading-tight text-neutral-600 text-center">{m.label}</div>
        </div>
      ))}
    </div>
  )
}

const TRUST_FEATURES = [
  {
    icon: 'verified_user',
    title: 'Segurança e estabilidade',
    text: 'Infraestrutura robusta com monitoramento 24/7, backup automático e alta disponibilidade.',
  },
  {
    icon: 'speed',
    title: 'Performance de alto nível',
    text: 'Arquitetura otimizada para alto tráfego, entrega rápida e experiência superior.',
  },
  {
    icon: 'support_agent',
    title: 'Suporte especializado',
    text: 'Time que entende de jornalismo, disponível quando você precisa.',
  },
]

function PrintCarousel() {
  const slides = CLIENT_CARDS.filter(c => c.print)
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const [dir, setDir] = useState(1)
  const timerRef = useRef(null)
  const hasAnimated = useRef(false)
  const total = slides.length

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const go = (newIndex, direction) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    hasAnimated.current = true
    setPrevIndex(index)
    setDir(direction)
    setIndex(newIndex)
    timerRef.current = setTimeout(() => setPrevIndex(null), 400)
  }

  const goNext = () => go((index + 1) % total, 1)
  const goPrev = () => go((index - 1 + total) % total, -1)

  const slide = slides[index]
  const prevSlide = prevIndex !== null ? slides[prevIndex] : null

  const enterClass = hasAnimated.current ? (dir > 0 ? 'sc-img-enter-right' : 'sc-img-enter-left') : ''
  const exitClass  = dir > 0 ? 'sc-img-exit-left' : 'sc-img-exit-right'

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15" style={{ aspectRatio: '16/9' }}>
      {prevSlide && (
        <img
          key={`prev-${prevIndex}`}
          src={`${prevSlide.print}-768.webp`}
          srcSet={`${prevSlide.print}-480.webp 480w, ${prevSlide.print}-768.webp 768w, ${prevSlide.print}-1200.webp 1200w`}
          sizes="(min-width: 1024px) 600px, 100vw"
          alt={`Portal ${prevSlide.name} na DothNews`}
          width="1200"
          height="603"
          className={`absolute inset-0 h-full w-full object-cover object-top ${exitClass}`}
        />
      )}
      <img
        key={`curr-${index}`}
        src={`${slide.print}-768.webp`}
        srcSet={`${slide.print}-480.webp 480w, ${slide.print}-768.webp 768w, ${slide.print}-1200.webp 1200w`}
        sizes="(min-width: 1024px) 600px, 100vw"
        alt={`Portal ${slide.name} na DothNews`}
        width="1200"
        height="603"
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover object-top ${enterClass}`}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 pt-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <div>
          <p className="mt-0.5 text-[15px] font-semibold text-white">
            {slide.name}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/22 bg-black/20 text-white transition-all hover:bg-white/15"
            aria-label="Portal anterior"
          >
            <Icon name="chevron_left" className="text-[20px]" />
          </button>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={'h-1.5 rounded-full transition-all ' + (i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50')}
                aria-label={`Portal ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/22 bg-black/20 text-white transition-all hover:bg-white/15"
            aria-label="Próximo portal"
          >
            <Icon name="chevron_right" className="text-[20px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ClientLogosGrid() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
      {CLIENT_CARDS.map((card, i) => (
        <img
          key={i}
          src={card.logo}
          alt={card.name}
          title={card.name}
          width={card.logoW}
          height={card.logoH}
          loading="lazy"
          className="h-10 w-auto object-contain brightness-0 invert opacity-70 transition-opacity hover:opacity-90"
        />
      ))}
    </div>
  )
}


export function WhySection() {
  return (
    <section id="clientes" aria-labelledby="clientes-title" className="why-section relative mx-[8px] sm:mx-[24px] lg:mx-[40px] mt-3 sm:mt-4 rounded-2xl sm:rounded-[32px] overflow-hidden bg-primary py-20 lg:py-[100px]">

      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <div className="absolute why-blob-1" style={{ filter: 'blur(125px)' }}>
          <BlobPurple fill1="#FC52FF" fill2="#39FF85" />
        </div>
        <div className="absolute why-blob-2" style={{ filter: 'blur(125px)' }}>
          <BlobBlue fill1="#39FF85" fill2="#FC52FF" />
        </div>
      </div>

      <Shell className="relative z-10">
        <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <Reveal>
              <Chip variant="dark">Validação</Chip>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="clientes-title" className="headline mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-white sm:text-[42px]">
                Estrutura validada diariamente por operações editoriais reais.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-[17px] leading-[1.66] text-white/80">
                A confiança não vem apenas do discurso.<br />
                Ela é construída diariamente por portais que dependem da DothNews para publicar, monetizar e crescer.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <PrintCarousel />
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-12 lg:mt-20">
          <MetricsGrid metrics={METRICS} />
        </Reveal>

        <Reveal delay={120} className="mt-12 lg:mt-20">
          <ClientLogosGrid />
        </Reveal>

        <div className="mt-12 lg:mt-16 border-t border-white/10 pt-12 lg:pt-16">
          <div className="grid gap-10 sm:grid-cols-3">
            {TRUST_FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex flex-col gap-3">
                  <div className="text-white/70">
                    <Icon name={f.icon} className="text-[40px]" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-white">{f.title}</h3>
                  <p className="text-[14.5px] leading-[1.6] text-white/75">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  )
}
