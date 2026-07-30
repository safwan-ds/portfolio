/**
 * Navbar — fixed top navigation with glassmorphism + language switcher.
 * Nav links left-aligned, language switcher + mobile menu right-aligned.
 * Renders DotField as the nav's decorative background.
 */

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import LanguageSwitcher from './LanguageSwitcher'
import ScrollProgress from './ScrollProgress'
import Logo from './Logo'
import DotField from './DotField'
import { cssColor } from '../../utils/constants'
import { useScrollState } from '../../hooks/useScrollState'
import { useRtl } from '../../hooks/useRtl'
import { navigation } from '../../data'

export default function Navbar() {
  const { t } = useTranslation()
  const scrolled = useScrollState()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const isRtl = useRtl()

  function toggleLang() {
    setLangOpen(!langOpen)
  }

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* Trigger DotField canvas resize when mobile menu toggles (nav height changes) */
  useEffect(() => {
    const timer = setTimeout(() => window.dispatchEvent(new Event('resize')), 180)
    return () => clearTimeout(timer)
  }, [mobileOpen])

  const handleClick = (id: string) => {
    setMobileOpen(false)
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-300 border-b border-neon-blue/15 ${
        scrolled ? 'py-0' : 'py-2'
      }`}
    >
      {/* Glass overlay below dots */}
      <div className="absolute inset-0 z-0 bg-carbon/60 backdrop-blur-xl" />

      {/* DotField above glass */}
      <div className="absolute inset-0 z-1 overflow-hidden" aria-hidden="true">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={30}
          glowRadius={0}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom={`${cssColor('neonBlue')}B3`}
          gradientTo={`${cssColor('slate')}99`}
          glowColor={cssColor('graphite')}
        />
      </div>

      {/* Content above dots */}
      <div className="relative z-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative flex h-16 items-center justify-between">
            {/* Left side: logo + mobile hamburger */}
            <div className="flex items-center gap-2">
              {/* Logo */}
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 shrink-0 text-slate-300 hover:text-neon-blue transition-colors select-none"
                aria-label="Home"
              >
                <Logo className="h-9 w-auto" color="currentColor" />
              </a>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-slate-300 hover:text-neon-blue transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? (
                  <HiX size={22} style={{ transform: isRtl ? 'none' : 'scaleX(-1)' }} />
                ) : (
                  <HiMenuAlt3 size={22} style={{ transform: isRtl ? 'none' : 'scaleX(-1)' }} />
                )}
              </button>
              <div className="hidden md:flex items-center gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleClick(item.id)
                      }}
                      aria-label={t(item.labelKey)}
                      className="group px-3 py-2 font-mono text-sm tracking-wider text-slate-300 uppercase hover:text-neon-blue transition-colors rounded-md hover:bg-slate/20 inline-flex items-center gap-1.5 relative select-none"
                    >
                      {Icon ? <Icon className="w-4 h-4" /> : t(item.labelKey)}
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-neon-blue transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Right side: language switcher */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher open={langOpen} onToggle={toggleLang} />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden bg-carbon/90 backdrop-blur-xl border-t border-slate/30 overflow-hidden transition-all duration-200 ease-out ${
            mobileOpen
              ? 'max-h-80 opacity-100 pointer-events-auto'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(item.id)
                  }}
                  aria-label={t(item.labelKey)}
                  className="block px-3 py-2 font-mono text-base text-slate-300 hover:text-neon-blue hover:bg-slate/20 rounded-md transition-colors active:text-neon-blue active:bg-slate/20 select-none"
                  style={{ touchAction: 'manipulation' }}
                >
                  {Icon ? <Icon className="w-5 h-5 inline-block align-middle" /> : t(item.labelKey)}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <ScrollProgress />
    </motion.nav>
  )
}
