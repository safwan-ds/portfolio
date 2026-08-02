import { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LiquidMetal } from '@paper-design/shaders-react'
import DotField from './DotField'

import { cssColor } from '../../utils/constants'

const LOGO_URL = `${import.meta.env.BASE_URL}images/logo.svg`

function LiquidMetalReady() {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window._preloaderReady?.()
      })
    })
  }, [])

  return (
    <LiquidMetal
      width={150}
      height={200}
      image={LOGO_URL}
      suspendWhenProcessingImage
      colorBack="#FFFFFF00"
      colorTint={cssColor('peach')}
      repetition={1.5}
      softness={1}
      shiftRed={0}
      shiftBlue={0}
      distortion={0}
      contour={0.8}
      angle={70}
      speed={1}
      scale={1}
      fit="contain"
    />
  )
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      <div
        className="text-center pointer-events-auto p-10 rounded-2xl relative overflow-hidden w-fit"
        style={{
          minWidth: '20rem',
          background: 'rgba(20, 30, 58, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl"
          aria-hidden="true"
        >
          <DotField
            dotRadius={2}
            dotSpacing={14}
            bulgeStrength={25}
            glowRadius={0}
            sparkle={false}
            waveAmplitude={0}
            gradientFrom="rgba(192, 132, 255, 0.6)"
            gradientTo="rgba(74, 94, 138, 0.5)"
            glowColor="#141E3A"
          />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-4">
            <Suspense fallback={<div style={{ width: 150, height: 200 }} />}>
              <LiquidMetalReady />
            </Suspense>

            <h1 className="font-hero-display text-7xl sm:text-8xl md:text-9xl select-none animate-glitch">
              <span className="text-white">{t('hero.title')}</span>
            </h1>
          </div>
          <p className="font-display text-xl text-slate-200 sm:text-2xl md:text-3xl select-none">
            {t('hero.subtitle')}
          </p>
          <p className="mt-6 mx-auto max-w-md font-body text-sm text-slate-300 sm:text-base">
            {t('hero.description')}
          </p>
        </div>
      </div>
    </section>
  )
}
