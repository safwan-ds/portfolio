/**
 * App root — reads profile data from src/data/profile.ts.
 * Layout: fixed 3D canvas + scrollable DOM overlay.
 */

import { Suspense, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useProgress } from '@react-three/drei'
import './index.css'
import Scene from './components/three/Scene'
import SceneErrorBoundary from './components/ui/SceneErrorBoundary'
import Navbar from './components/ui/Navbar'
import About from './components/ui/About'
import Skills from './components/ui/Skills'
import Languages from './components/ui/Languages'
import Projects from './components/ui/Projects'
import Contact from './components/ui/Contact'
import Footer from './components/ui/Footer'
import NeonButton from './components/ui/NeonButton'
import { useScrollState } from './hooks/useScrollState'
import { profile } from './data'

function LoadingScreen() {
  const { progress } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 800)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <div className={`fixed inset-0 z-100 bg-void flex flex-col items-center justify-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-64 h-1 bg-slate/20 rounded-full overflow-hidden">
        <div className="h-full bg-neon-blue transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 font-mono text-sm text-neon-blue uppercase tracking-widest">
        {progress < 100 ? `Loading... ${Math.round(progress)}%` : 'Initializing...'}
      </p>
    </div>
  )
}

export default function App() {
  const { t } = useTranslation()
  const scrolled = useScrollState()

  return (
    <div className="relative bg-void text-text-primary font-body overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </SceneErrorBoundary>
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar />

        <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6">
          <div className="text-center pointer-events-auto bg-void/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h1 className="font-display text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl drop-shadow-lg">
              <span className="text-white">{t('hero.title')}</span>
            </h1>
            <p className="mt-4 font-display text-xl text-slate-200 sm:text-2xl md:text-3xl drop-shadow-md">
              {t('hero.subtitle')}
            </p>
            <p className="mt-6 mx-auto max-w-md font-body text-sm text-slate-300 sm:text-base drop-shadow-sm">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <NeonButton href="#about">
                {t('hero.cta_explore')}
              </NeonButton>
              <NeonButton href="#contact" solid>
                {t('hero.cta_contact')}
              </NeonButton>
            </div>
          </div>

          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 bg-void/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5 transition-opacity duration-500 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <span className="font-mono text-[10px] tracking-widest text-slate-300 uppercase">
              {t('hero.scroll')}
            </span>
            <div className="w-5 h-8 rounded-full border border-slate/40 flex justify-center">
              <div className="w-1 h-2 rounded-full bg-neon-blue/60 mt-1 animate-bounce" />
            </div>
          </div>
        </section>

        <About />
        <Skills />
        <Languages />
        <Projects />
        <Contact />
        <Footer />
      </div>

      <LoadingScreen />
    </div>
  )
}
