import { useState, useCallback } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { Hero } from './components/hero'
import { SiteHeader } from './components/header'
import { GrowthSection, ReflectionSection } from './components/problem'
// Imports estáticos (não lazy): garantem que TODO o conteúdo seja renderizado no
// SSR/pré-render (HTML completo p/ SEO). Com React.lazy, o renderToString suspende
// (erro React #419) e as seções abaixo da dobra não entravam no HTML inicial.
import { WhatSection, WhySection } from './components/solution'
import { EvolutionSection, FaqSection } from './components/evolution'
import { DiagnosisSection, FinalCta, Footer, DiagnosisModal } from './components/closing'

export default function App() {
  const [formOpen, setFormOpen] = useState(false)
  const openForm = useCallback(() => setFormOpen(true), [])
  const closeForm = useCallback(() => setFormOpen(false), [])

  return (
    <>
      {/*
        SVG filters referenced by .liquid-glass
        #container-glass → cards / large containers
        #btn-glass → buttons (add feImage with displacement texture when needed)
      */}
      <svg aria-hidden="true" style={{ display: 'none' }}>
        <defs>
          <filter id="container-glass" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
            <feDisplacementMap in="SourceGraphic" in2="blur" scale="77" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <SiteHeader onOpenForm={openForm} />
      <main>
        <Hero onOpenForm={openForm} />
        <GrowthSection />
        <ReflectionSection />
        <WhatSection />
        <WhySection />
        <EvolutionSection />
        <FaqSection />
        <DiagnosisSection />
        <FinalCta onOpenForm={openForm} />
      </main>
      <Footer />
      <DiagnosisModal open={formOpen} onClose={closeForm} />
      {/* Vercel Speed Insights + Web Analytics — telemetria client-side (não renderiza no SSR/pré-render) */}
      <SpeedInsights />
      <Analytics />
    </>
  )
}
