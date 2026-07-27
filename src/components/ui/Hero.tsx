/**
 * Hero — the landing section with title, subtitle, CTA buttons, and scroll indicator.
 */

import { useTranslation } from 'react-i18next'
import NeonButton from './NeonButton'
import Logo from './Logo'
import { PALETTE } from '../../utils/constants'
import { useScrollState } from '../../hooks/useScrollState'

export default function Hero() {
  const { t } = useTranslation()
  const scrolled = useScrollState()

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center px-4 sm:px-6"
      style={{ paddingTop: 'calc(var(--navbar-height, 0px) + 7rem)' }}
    >
      {/* Push content to vertical center */}
      <div className="flex-1" />

      <div className="text-center pointer-events-auto bg-void/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Logo className="h-40 w-auto" color={PALETTE.neonPink} />
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
            <span className="text-white">{t('hero.title')}</span>
          </h1>
        </div>
        <p className="font-display text-xl text-slate-200 sm:text-2xl md:text-3xl drop-shadow-md">
          {t('hero.subtitle')}
        </p>
        <p className="mt-6 mx-auto max-w-md font-body text-sm text-slate-300 sm:text-base drop-shadow-sm">
          {t('hero.description')}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <NeonButton href="#about">{t('hero.cta_explore')}</NeonButton>
          <NeonButton href="#contact" solid>
            {t('hero.cta_contact')}
          </NeonButton>
        </div>
      </div>

      {/* Push scroll indicator to bottom */}
      <div className="flex-1 flex items-end pb-8">
        <div
          className={`flex flex-col items-center gap-2 bg-void/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5 transition-opacity duration-500 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <span className="font-mono text-[10px] tracking-widest text-slate-300 uppercase">
            {t('hero.scroll')}
          </span>
          <div className="w-5 h-8 rounded-full border border-slate/40 flex justify-center">
            <div className="w-1 h-2 rounded-full bg-neon-blue/60 mt-1 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
