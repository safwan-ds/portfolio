/**
 * Hero — the landing section with title, subtitle, CTA buttons, and scroll indicator.
 */

import { useTranslation } from 'react-i18next'
import { Dithering, LiquidMetal } from '@paper-design/shaders-react'
import { PALETTE } from '../../utils/constants'
import { useScrollState } from '../../hooks/useScrollState'

export default function Hero() {
  const { t } = useTranslation()
  const scrolled = useScrollState()

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center px-4 sm:px-6 overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height, 0px) + 7rem)' }}
    >
      {/* Vertical centering spacer */}
      <div className="flex-1 relative z-10" />

      {/* Text content */}
      <div className="text-center pointer-events-auto p-10 rounded-lg bg-carbon relative overflow-hidden">
        {/* Shader on top of bg-carbon, below content */}
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg"
          aria-hidden="true"
        >
          <Dithering
            colorBack="#00000000"
            colorFront={PALETTE.slate}
            shape="warp"
            type="8x8"
            size={3}
            speed={0.98}
            scale={0.56}
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-4">
            <div className="relative shrink-0">
              <LiquidMetal
                width={150}
                height={200}
                image={`${import.meta.env.BASE_URL}images/logo.svg`}
                colorBack="#FFFFFF00"
                colorTint={PALETTE.neonPink}
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
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-widest uppercase select-none animate-glitch">
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
        {/* end content z-10 */}
      </div>
      {/* end card bg-carbon */}

      {/* Push scroll indicator to bottom */}
      <div className="flex-1 flex items-end pb-8 relative z-10 select-none">
        <div
          className={`hidden sm:flex flex-col items-center gap-2 bg-graphite px-4 py-3 rounded-2xl transition-opacity duration-500 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <span className="font-mono text-[10px] tracking-widest text-slate-300 uppercase">
            {t('hero.scroll')}
          </span>
          <div className="w-5 h-8 rounded-full border border-slate flex justify-center">
            <div className="w-1 h-2 rounded-full bg-neon-blue/60 mt-1 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
