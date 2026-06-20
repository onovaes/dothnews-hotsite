import { useState, useCallback, lazy, Suspense } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Hero } from './components/hero'
import { SiteHeader } from './components/header'
import { GrowthSection, ReflectionSection } from './components/problem'

const WhatSection      = lazy(() => import('./components/solution').then(m => ({ default: m.WhatSection })))
const WhySection       = lazy(() => import('./components/solution').then(m => ({ default: m.WhySection })))
const EvolutionSection = lazy(() => import('./components/evolution').then(m => ({ default: m.EvolutionSection })))
const FaqSection       = lazy(() => import('./components/evolution').then(m => ({ default: m.FaqSection })))
const DiagnosisSection = lazy(() => import('./components/closing').then(m => ({ default: m.DiagnosisSection })))
const FinalCta         = lazy(() => import('./components/closing').then(m => ({ default: m.FinalCta })))
const Footer           = lazy(() => import('./components/closing').then(m => ({ default: m.Footer })))
const DiagnosisModal   = lazy(() => import('./components/closing').then(m => ({ default: m.DiagnosisModal })))

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
        <Suspense fallback={null}>
          <WhatSection />
          <WhySection />
          <EvolutionSection />
          <FaqSection />
          <DiagnosisSection />
          <FinalCta onOpenForm={openForm} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <DiagnosisModal open={formOpen} onClose={closeForm} />
      </Suspense>
      {/* Vercel Speed Insights — telemetria client-side (não renderiza no SSR/pré-render) */}
      <SpeedInsights />
    </>
  )
}
