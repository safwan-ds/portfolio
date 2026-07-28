/**
 * App root — reads profile data from src/data/profile.ts.
 * Layout: fixed 3D canvas + scrollable DOM overlay.
 */

import { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProgress } from '@react-three/drei'
import './index.css'
import Scene from './components/three/Scene'
import SceneErrorBoundary from './components/ui/SceneErrorBoundary'
import Navbar from './components/ui/Navbar'
import AIChat from './components/ai/AIChat'
import About from './components/ui/About'
import Skills from './components/ui/Skills'
import Languages from './components/ui/Languages'
import Projects from './components/ui/Projects'
import Contact from './components/ui/Contact'
import Footer from './components/ui/Footer'
import Hero from './components/ui/Hero'
import { useSettings } from './hooks/useSettings'
import { useDeviceTier } from './hooks/useDeviceTier'
import { SettingsCtx } from './components/ui/SettingsContext'

function LoadingScreen() {
  const { t } = useTranslation()
  const { progress: modelProgress } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (modelProgress >= 100) {
      const timer = setTimeout(() => setShow(false), 800)
      return () => clearTimeout(timer)
    }
  }, [modelProgress])

  const progress = Math.round(Math.min(100, modelProgress))

  return (
    <div
      className={`fixed inset-0 z-100 bg-void flex flex-col items-center justify-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="w-64 h-1 bg-slate/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-neon-blue transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-sm text-neon-blue uppercase tracking-widest">
        {progress < 100
          ? `${t('loading.loading')}... ${progress}%`
          : `${t('loading.initializing')}...`}
      </p>
    </div>
  )
}

export default function App() {
  const settings = useSettings()
  const { isMobile } = useDeviceTier()

  return (
    <SettingsCtx.Provider value={settings}>
      <div className="relative bg-void text-text-primary font-body overflow-x-hidden">
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 bg-linear-to-b from-carbon via-void to-carbon"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 35%, #1a1028 0%, #0f0b1a 45%, #0a0a0f 100%)',
            }}
          />
          {settings.scene3d !== 'off' && (
            <SceneErrorBoundary>
              <Suspense fallback={null}>
                <Scene effects={settings.effects} />
              </Suspense>
            </SceneErrorBoundary>
          )}
        </div>

        <Navbar />

        <div className="relative z-10 pointer-events-none">
          <Hero />

          <About />
          <Skills />
          <Languages />
          <Projects />
          <Contact />
          <Footer />
        </div>

        {!isMobile && <AIChat />}
        <LoadingScreen />
      </div>
    </SettingsCtx.Provider>
  )
}
