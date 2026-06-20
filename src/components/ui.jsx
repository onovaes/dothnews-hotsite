import { useEffect, useRef } from 'react'

// Scroll reveal — module-level singleton (only registers listeners once)
const revealEls = new Set()
let checkQueued = false
const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined'

const checkReveal = () => {
  if (!canUseDOM) return
  checkQueued = false
  const vh = window.innerHeight || document.documentElement.clientHeight
  // Batch all DOM reads first, then apply writes — prevents forced reflow
  const toReveal = []
  revealEls.forEach((el) => {
    if (el.getBoundingClientRect().top < vh * 0.9) toReveal.push(el)
  })
  toReveal.forEach((el) => {
    el.style.opacity = '1'
    el.style.transform = 'none'
    el.classList.add('in')
    revealEls.delete(el)
    // Self-heal: snap if transition froze (background tab / throttled context)
    setTimeout(() => {
      if (parseFloat(window.getComputedStyle(el).opacity) < 0.9) {
        el.style.transition = 'none'
        el.style.opacity = '1'
        el.style.transform = 'none'
      }
    }, 1200)
  })
}

const scheduleCheck = () => {
  if (!canUseDOM) return
  if (!checkQueued) {
    checkQueued = true
    requestAnimationFrame(checkReveal)
  }
}

const snapAll = () => {
  if (!canUseDOM) return
  document.querySelectorAll('.reveal').forEach((el) => {
    el.style.transition = 'none'
    el.style.opacity = '1'
    el.style.transform = 'none'
  })
  revealEls.clear()
}

if (canUseDOM) {
  window.addEventListener('scroll', scheduleCheck, { passive: true })
  window.addEventListener('resize', scheduleCheck)
  window.addEventListener('load', scheduleCheck)
  document.addEventListener('visibilitychange', () => { if (document.hidden) snapAll() })
  if (document.hidden) setTimeout(snapAll, 50)
  // Safety net: never leave content hidden if scroll never fires
  setTimeout(() => {
    revealEls.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none' })
    revealEls.clear()
  }, 2600)
}

export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = delay + 'ms'
    revealEls.add(el)
    scheduleCheck()
  }, [delay])
  return <Tag ref={ref} className={'reveal ' + className} {...rest}>{children}</Tag>
}

export function Shell({ children, className = '' }) {
  return (
    <div className={'mx-auto w-full max-w-shell px-6 sm:px-8 lg:px-12 ' + className}>
      {children}
    </div>
  )
}

export function Chip({ children, className = '', variant = 'default' }) {
  return (
    <div className={'flex ' + className}>
      <span className={
        'liquid-glass inline-flex items-center rounded-full px-3.5 py-1.5 text-[12.5px] font-medium leading-none ' +
        (variant === 'dark' ? 'text-white/90' : 'text-subink')
      }>
        {children}
      </span>
    </div>
  )
}

const BTN_SIZES = {
  sm: { wrap: 'px-3 py-[6px] gap-1 rounded-[10px] text-[14px]',          icon: 'text-[18px]' },
  md: { wrap: 'px-[16px] py-[10px] gap-[8px] rounded-[12px] text-[16px]', icon: 'text-[20px]' },
  lg: { wrap: 'px-8 py-4 gap-2 rounded-[16px] text-[16px] sm:text-[18px]',              icon: 'text-[24px]' },
}

const BTN_VARIANTS = {
  primary:   'bg-primary text-white hover:bg-primary-dark',
  secondary: 'border border-primary text-primary hover:bg-primary-soft',
  ghost:     'text-primary hover:text-primary-dark',
  white:     'bg-white text-primary hover:bg-white/90 hover:-translate-y-0.5',
}

export function Button({ as: Tag, variant = 'primary', size = 'md', icon, iconPosition = 'right', description, href, children, className = '', ...rest }) {
  const s = BTN_SIZES[size] ?? BTN_SIZES.md
  const v = BTN_VARIANTS[variant] ?? BTN_VARIANTS.primary
  const Root = Tag ?? (href ? 'a' : 'button')
  const linkProps = href ? { href } : {}
  const a11yProps = description ? { title: description, 'aria-description': description } : {}
  const iconEl = icon ? (
    <span className={`material-symbols-outlined ${s.icon}`} aria-hidden="true">{icon}</span>
  ) : null
  return (
    <Root
      {...linkProps}
      {...a11yProps}
      className={['inline-flex items-center font-medium transition-all duration-300', s.wrap, v, className].join(' ')}
      {...rest}
    >
      {iconPosition === 'left' && iconEl}
      <span>{children}</span>
      {iconPosition === 'right' && iconEl}
    </Root>
  )
}

export function Card({ children, highlight = false, className = '' }) {
  return (
    <div className={
      'rounded-2xl p-7 transition-all duration-300 ' +
      (highlight
        ? 'bg-primary-400 text-white '
        : 'border border-line bg-white hover:border-ink/20 ') + className
    }>
      {children}
    </div>
  )
}

export function BrowserFrame({ src, alt, url = 'painel.dothnews.com', className = '' }) {
  return (
    <div className={'overflow-hidden rounded-xl border border-line bg-white shadow-[0_40px_90px_-40px_rgba(17,17,30,0.35)] ' + className}>
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0554d]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8b14b]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#54b265]"></span>
        </div>
        <div className="mx-auto flex w-1/2 items-center justify-center rounded-md bg-white/80 px-3 py-1 text-[11px] text-faint ring-1 ring-line">
          {url}
        </div>
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  )
}

export function ScreenFrame({ src, alt, className = '', imgClass = '' }) {
  return (
    <div className={'overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_70px_-45px_rgba(17,17,30,0.45)] ' + className}>
      <img src={src} alt={alt} loading="lazy" className={'block w-full ' + imgClass} />
    </div>
  )
}

export function Icon({ name, className = 'text-[32px]' }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{name}</span>
  )
}

export const CLIENT_LOGOS = [
  { name: 'Correio do Estado',    file: '/assets/clients/correiodoestado.webp' },
  { name: 'Folha de Pernambuco',  file: '/assets/clients/folhadepernambuco.webp' },
  { name: 'Diário do Estado',     file: '/assets/clients/diariadoestado.webp' },
  { name: 'Capital do Pantanal',  file: '/assets/clients/capitaldopantanal.webp' },
  { name: 'Expressão MS',         file: '/assets/clients/expressaoms.webp' },
  { name: 'Folha de Alphaville',  file: '/assets/clients/folhadealphaville.webp' },
  { name: 'Portal Mais 360',      file: '/assets/clients/portalmais360.webp' },
  { name: 'Diário da Baixada',    file: '/assets/clients/diariadabaixada.webp' },
  { name: 'Portal de Prefeitura', file: '/assets/clients/portaldeprefeitura.webp' },
]
