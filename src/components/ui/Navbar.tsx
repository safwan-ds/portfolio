/**
 * Navbar — fixed top navigation with glassmorphism + language switcher.
 * Nav links left-aligned, language switcher + mobile menu right-aligned.
 */

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import LanguageSwitcher from './LanguageSwitcher'
import ScrollProgress from './ScrollProgress'
import { useScrollState } from '../../hooks/useScrollState'
import { navigation } from '../../data'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const scrolled = useScrollState()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isRtl = i18n.language === 'ar'

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleClick = (id: string) => {
    setMobileOpen(false)
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-300 bg-carbon/60 backdrop-blur-xl border-b ${
        scrolled ? 'border-slate/30 py-0' : 'border-transparent py-2'
      }`}
    >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left side: mobile hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-neon-blue transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <HiX size={22} style={{ transform: isRtl ? 'none' : 'scaleX(-1)' }} /> : <HiMenuAlt3 size={22} style={{ transform: isRtl ? 'none' : 'scaleX(-1)' }} />}
            </button>
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); handleClick(item.id) }}
                    aria-label={t(item.labelKey)}
                    className="px-3 py-2 font-mono text-sm tracking-wider text-slate-300 uppercase hover:text-neon-blue transition-colors rounded-md hover:bg-slate/20 inline-flex items-center gap-1.5"
                  >
                    {Icon ? <Icon className="w-4 h-4" /> : t(item.labelKey)}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right side: language switcher */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-carbon/90 backdrop-blur-xl border-t border-slate/30 shadow-lg overflow-hidden transition-all duration-200 ease-out ${
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
                onClick={(e) => { e.preventDefault(); handleClick(item.id) }}
                aria-label={t(item.labelKey)}
                className="block px-3 py-2 font-mono text-base text-slate-300 hover:text-neon-blue hover:bg-slate/20 rounded-md transition-colors active:text-neon-blue active:bg-slate/20"
                style={{ touchAction: 'manipulation' }}
              >
                {Icon ? <Icon className="w-5 h-5 inline-block align-middle" /> : t(item.labelKey)}
              </a>
            )
          })}
        </div>
      </div>
      <ScrollProgress />
    </motion.nav>
  )
}
