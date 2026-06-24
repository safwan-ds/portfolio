/**
 * Navbar — fixed top navigation with glassmorphism + language switcher.
 * Nav links left-aligned, language switcher + mobile menu right-aligned.
 */

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import LanguageSwitcher from './LanguageSwitcher'
import { useScrollState } from '../../hooks/useScrollState'
import { navigation } from '../../data'

export default function Navbar() {
  const { t } = useTranslation()
  const scrolled = useScrollState()
  const [mobileOpen, setMobileOpen] = useState(false)

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
          {/* Desktop nav links — left side */}
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

          {/* Right side: language switcher + mobile hamburger */}
          <div className="flex items-center gap-2 ltr:ml-auto rtl:mr-auto">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-neon-blue transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-carbon/90 backdrop-blur-xl border-t border-slate/30 overflow-hidden"
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
                    className="block px-3 py-2 font-mono text-base text-slate-300 hover:text-neon-blue hover:bg-slate/20 rounded-md transition-colors"
                  >
                    {Icon ? <Icon className="w-5 h-5 inline-block" /> : t(item.labelKey)}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
