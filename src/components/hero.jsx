import { useState, useEffect, useRef } from 'react'
import { Chip, Button } from './ui'

// ─── Carousel ────────────────────────────────────────────────────────────────
// transition: 'fade' | 'slide' | 'push'
//   fade  — opacidade cruzada entre slides
//   slide — novo slide entra por cima do anterior (cover)
//   push  — os dois slides se movem juntos (empurra)

const DRAG_THRESHOLD = 50
const TRANSITION_DURATION = 700

function Carousel({ slides, interval = 3500, transition = 'fade' }) {
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState(null)
  const [dir, setDir] = useState('right')
  const currentRef = useRef(0)
  const timerRef = useRef(null)
  const dragRef = useRef({ startX: 0, active: false })

  function startTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const c = currentRef.current
      const next = (c + 1) % slides.length
      setExiting(c)
      setDir('right')
      setCurrent(next)
      currentRef.current = next
    }, interval)
  }

  // Pausa o autoplay (usado no hover do mouse; retoma no mouseleave)
  function pauseTimer() {
    clearInterval(timerRef.current)
  }

  function goTo(index) {
    const c = currentRef.current
    if (index === c) return
    setExiting(c)
    setDir(index > c ? 'right' : 'left')
    setCurrent(index)
    currentRef.current = index
    startTimer()
  }

  function onPointerDown(e) {
    dragRef.current = { startX: e.clientX, active: true }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerUp(e) {
    if (!dragRef.current.active) return
    const delta = e.clientX - dragRef.current.startX
    dragRef.current.active = false
    if (Math.abs(delta) < DRAG_THRESHOLD) return
    const direction = delta < 0 ? 'right' : 'left'
    const c = currentRef.current
    const next = direction === 'right'
      ? (c + 1) % slides.length
      : (c - 1 + slides.length) % slides.length
    setExiting(c)
    setDir(direction)
    setCurrent(next)
    currentRef.current = next
    startTimer()
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  // Limpa o slide saindo depois da animação
  useEffect(() => {
    if (exiting === null) return
    const t = setTimeout(() => setExiting(null), TRANSITION_DURATION)
    return () => clearTimeout(t)
  }, [current])

  function slideClass(i) {
    const base = 'absolute inset-0 w-full h-full object-cover object-top'
    if (transition === 'fade') {
      return `${base} transition-opacity duration-700 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`
    }
    if (transition === 'slide') {
      if (i === current) return `${base} z-10 ${dir === 'right' ? 'carousel-enter-right' : 'carousel-enter-left'}`
      if (i === exiting)  return base
      return `${base} opacity-0`
    }
    if (transition === 'push') {
      if (i === current) return `${base} z-10 ${dir === 'right' ? 'carousel-enter-right' : 'carousel-enter-left'}`
      if (i === exiting)  return `${base} ${dir === 'right' ? 'carousel-exit-left' : 'carousel-exit-right'}`
      return `${base} opacity-0`
    }
    return `${base} ${i === current ? 'opacity-100' : 'opacity-0'}`
  }

  return (
    <div className="relative z-10 mt-10 -mb-[68px] lg:mb-0 sm:mx-[24px] lg:mx-auto w-auto lg:w-full max-w-[1142px] lg:mt-16">
      <div className="liquid-glass max-sm:before:hidden max-sm:after:hidden rounded-[16px] p-0 sm:rounded-[24px] md:rounded-[32px] sm:p-[8px] sm:pb-0 md:p-[24px] md:pb-0 lg:p-[40px] lg:pb-0">

        {/* Slides */}
        <div
          className="relative overflow-hidden rounded-[16px] border border-neutral-50 cursor-grab active:cursor-grabbing select-none touch-pan-y"
          style={{ aspectRatio: '1846/928' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { dragRef.current.active = false }}
          onPointerEnter={(e) => { if (e.pointerType === 'mouse') pauseTimer() }}
          onPointerLeave={(e) => { if (e.pointerType === 'mouse') startTimer() }}
        >
          {slides.map((slide, i) => (
            <img
              key={slide.name}
              src={slide.src}
              srcSet={slide.srcSet}
              sizes="(min-width: 1024px) 1142px, (min-width: 640px) calc(100vw - 48px), 100vw"
              alt={slide.alt}
              width="1846"
              height="928"
              draggable="false"
              className={slideClass(i)}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          ))}
        </div>

        {/* Caption */}
        <p className="py-3 text-center text-[15px] sm:text-[16px] font-medium leading-snug text-neutral-0 md:text-subink">
          {slides[current].label}
        </p>

      </div>

      {/* Dots — fora do glass card, conforme ajuste visual */}
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ver tela ${i + 1}: ${slides[i].label}`}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === current ? 'w-10 bg-primary-400' : 'w-3 bg-neutral-200 hover:bg-primary-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Slides ───────────────────────────────────────────────────────────────────

// WebP gerados por `npm run images` em /assets/area-administrativa/webp/‹nome›-‹largura›.webp.
// As larguras devem casar com CAROUSEL_WIDTHS em scripts/optimize-images.mjs.
const ADMIN_WEBP = '/assets/area-administrativa/webp'
const CAROUSEL_WIDTHS = [480, 768, 1142, 1846]

function adminSlide(name, alt, label) {
  return {
    name,
    src: `${ADMIN_WEBP}/${name}-1142.webp`,
    srcSet: CAROUSEL_WIDTHS.map((w) => `${ADMIN_WEBP}/${name}-${w}.webp ${w}w`).join(', '),
    alt,
    label,
  }
}

const SLIDES = [
  // Legendas em sequência: contam a jornada editorial (verbo a verbo).
  adminSlide('dashboard',               'Painel de gestão editorial da DothNews',          'Acompanhe toda a operação em um só painel'),
  adminSlide('desempenho',              'Painel de desempenho do site: tráfego, audiência e melhor hora para publicar', 'Descubra a melhor hora para publicar'),
  adminSlide('criar-post',              'Editor de conteúdo da plataforma DothNews',       'Escreva num editor feito para a redação'),
  adminSlide('posts-preview',           'Pré-visualização do post em desktop, tablet e mobile', 'Revise como a matéria fica antes de publicar'),
  adminSlide('posts',                   'Busca e gestão do histórico de publicações',      'Encontre qualquer post em milissegundos'),
  adminSlide('app-token',               'Tela de App Token da plataforma DothNews',        'Conecte apps e IA: 100% API-first'),
  adminSlide('dois-fatores-seguranca',  'Configuração de autenticação em dois fatores',    'Proteja a conta com dois fatores'),
  adminSlide('dispositivos-conectados', 'Dispositivos e sessões conectados à sua conta',  'Veja onde sua conta está conectada'),
  adminSlide('search-console-missing-urls', 'Detecção de URLs 404 com criação de redirecionamento', 'Recupere os acessos perdidos em páginas 404'),
]

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero({ onOpenForm }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero relative bg-white">

      {/* Copy — centered */}
      <div className="relative z-20 mx-auto flex max-w-[1104px] flex-col items-center gap-6 sm:gap-8 pt-[24px] sm:pt-[60px] text-center">
        <div className="flex flex-col items-center gap-5">
          <Chip>22 anos de Infraestrutura editorial</Chip>

          <h1 id="hero-title" className="text-ink">
            <span className="block font-sans text-[24px] font-bold leading-[32px] sm:text-[36px] sm:leading-[44px] lg:text-[46px] lg:leading-[54px]">
              Existe uma diferença entre ter um portal online e ter uma estrutura preparada para crescer.
            </span>
          </h1>
        </div>

        <div className="flex w-full flex-col items-center gap-5">
          <p className="max-w-[822px] text-[15px] leading-[26px] sm:text-[17px] sm:leading-[28px] text-ink">
            A DothNews é a infraestrutura tecnológica por trás de operações editoriais que precisam crescer com estabilidade, segurança e suporte especializado.
          </p>
          <Button
            variant="primary"
            size="lg"
            icon="arrow_outward"
            iconPosition="left"
            description="Inicie seu diagnóstico editorial gratuito com a equipe DothNews"
            onClick={onOpenForm}
          >
            Quero escalar minha operação
          </Button>
        </div>
      </div>

      <Carousel slides={SLIDES} interval={3500} transition="fade" />

      {/*
        Background: dois SVGs vetoriais ("DOTHNEWS") sobrepostos com baixa opacidade.
        O overlay com backdrop-blur-[125px] os difunde em nuvens gradiente,
        replicando fielmente o Figma (node 43:1992).
        Alturas fixas calculadas a partir do frame Figma (1290px de altura):
          purple: top=232px h=138px  |  blue: top=199px h=171px
      */}
      <div className="hero-background pointer-events-none z-0 inset-0 select-none" aria-hidden="true">
        <div className="absolute hero-blob-purple" />
        <div className="absolute hero-blob-blue" />
        <div className="absolute hero-blur-overlay rounded-[20px] backdrop-blur-[125px]" />
      </div>
    </section>
  )
}
