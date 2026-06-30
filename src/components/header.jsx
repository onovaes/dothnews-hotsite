import { useState, useEffect, useRef } from 'react'
import { Shell, Button } from './ui'
import { WhatsAppIcon } from './WhatsAppIcon'
import { iconChar } from '../lib/icons'
import { WHATSAPP_CONTACT } from '../lib/contact'

/**
 * Dados padrão do header — substitua por payload de API.
 *
 * Estrutura esperada pela API:
 * {
 *   logo:  { src, alt, href }
 *   links: [{ id, label, href }]
 *   cta:   { label, href, icon, iconPosition?, description? }
 *   contact: { display, headerDisplay, href, description }
 * }
 */
export const DEFAULT_HEADER = {
  logo: {
    src: '/assets/logo-dothnews.svg',
    alt: 'DothNews',
    href: '#top',
  },
  links: [
    { id: 'estrutura',   label: 'Estrutura',   href: '#estrutura' },
    { id: 'clientes',    label: 'Clientes',    href: '#clientes' },
    { id: 'diagnostico', label: 'Diagnóstico', href: '#diagnostico' },
  ],
  cta: {
    label: 'Solicitar Diagnóstico',
    href: '#diagnostico',
    icon: 'arrow_outward',
    iconPosition: 'right',
    description: 'Agende seu diagnóstico editorial gratuito com a equipe DothNews',
  },
  contact: WHATSAPP_CONTACT,
}

// ─── SiteNav ──────────────────────────────────────────────────────────────────
// Barra de navegação desktop. Recebe links e CTA como props.

export function SiteNav({ links = [], cta = null, contact = null, onOpenForm }) {
  return (
    <nav
      className="hidden items-center gap-5 lg:flex xl:gap-8"
      aria-label="Navegação principal"
    >
      {links.map((link) => (
        <a
          key={link.id ?? link.href}
          href={link.href}
          className="text-[15px] font-medium text-ink transition-colors hover:text-primary lg:text-[16px]"
        >
          {link.label}
        </a>
      ))}

      {contact && (
        <a
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${contact.description}: ${contact.display}`}
          className="group inline-flex items-center gap-2 text-[14px] font-medium transition-all duration-300 px-4 py-2 rounded-[8px] hover:bg-[#28CC63] xl:text-[15px]"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0 logo-glow transition-colors duration-300 group-hover:text-ink" />
          <span className="text-ink">{contact.headerDisplay ?? contact.display}</span>
        </a>
      )}

      {cta && (
        <Button
          variant="primary"
          size="md"
          icon={cta.icon}
          iconPosition={cta.iconPosition ?? 'right'}
          description={cta.description}
          onClick={onOpenForm}
        >
          {cta.label}
        </Button>
      )}
    </nav>
  )
}

// ─── SiteHeader ───────────────────────────────────────────────────────────────
// Header completo: logo + nav desktop + menu mobile.

export function SiteHeader({
  logo  = DEFAULT_HEADER.logo,
  links = DEFAULT_HEADER.links,
  cta   = DEFAULT_HEADER.cta,
  contact = DEFAULT_HEADER.contact,
  onOpenForm,
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ' +
        (scrolled
          ? 'liquid-glass fixed-liquid frost'
          : 'border-b border-transparent bg-transparent')
      }
    >
      <Shell className="flex items-center justify-between py-4">
        {/* Logo */}
        <a href={logo.href} aria-label={logo.alt} className="flex items-center">
          <img src={logo.src} alt={logo.alt} width="569" height="76" className="h-[25px] w-auto logo-glow" />
        </a>

        {/* Nav desktop */}
        <SiteNav links={links} cta={cta} contact={contact} onOpenForm={onOpenForm} />

        {/* Botão hambúrguer mobile */}
        <button
          ref={hamburgerRef}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            {iconChar(open ? 'close' : 'menu')}
          </span>
        </button>
      </Shell>

      {/* Menu mobile */}
      {open && (
        <div ref={menuRef} id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <Shell className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.id ?? link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[16px] font-medium text-black"
              >
                {link.label}
              </a>
            ))}

            {contact && (
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${contact.description}: ${contact.display}`}
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-[15px] font-medium text-black transition-colors hover:border-[#28CC63] hover:text-[#128C7E]"
              >
                <span className="flex items-center gap-2">
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  <span>{contact.headerDisplay ?? contact.display}</span>
                </span>
              </a>
            )}

            {cta && (
              <Button
                variant="primary"
                size="md"
                icon={cta.icon}
                iconPosition={cta.iconPosition ?? 'right'}
                className="mt-2 w-full justify-center"
                onClick={() => { setOpen(false); onOpenForm?.() }}
              >
                {cta.label}
              </Button>
            )}
          </Shell>
        </div>
      )}
    </header>
  )
}
