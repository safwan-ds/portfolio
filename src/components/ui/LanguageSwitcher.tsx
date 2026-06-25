/**
 * LanguageSwitcher — dropdown to switch between EN / AR / TR.
 * Updates i18n language and applies RTL direction for Arabic.
 */

import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SupportedLanguage } from '../../i18n/config'
import { SUPPORTED_LANGUAGES, languageNames, applyLanguageDirection } from '../../i18n/config'
import FlagIcon from './FlagIcon'

const FLAG_LANG_MAP: Record<SupportedLanguage, 'arabic' | 'english' | 'turkish'> = {
  ar: 'arabic',
  en: 'english',
  tr: 'turkish',
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Detect RTL so the dropdown opens away from the edge
  const isRtl = useMemo(() => document.documentElement.dir === 'rtl', [i18n.language])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const currentLang = (i18n.language || 'en') as SupportedLanguage

  function changeLanguage(lang: SupportedLanguage) {
    i18n.changeLanguage(lang)
    applyLanguageDirection(lang)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate/20 border border-slate/30 font-mono text-xs text-text-secondary hover:text-text-primary hover:border-slate/40 transition-all"
        aria-label="Switch language"
      >
        <FlagIcon lang={FLAG_LANG_MAP[currentLang]} />
        <span className="hidden sm:inline">{languageNames[currentLang]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-1 w-40 rounded-xl bg-carbon/90 backdrop-blur-xl border border-slate/30 shadow-lg overflow-hidden z-50"
            style={{
              left: isRtl ? '0px' : 'auto',
              right: isRtl ? 'auto' : '0px',
              maxWidth: 'calc(100vw - 1rem)',
            }}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`flex items-center gap-2 w-full px-3 py-2 font-mono text-xs text-start transition-colors hover:bg-slate/20 ${
                  lang === currentLang ? 'text-neon-blue' : 'text-text-secondary'
                }`}
              >
                <FlagIcon lang={FLAG_LANG_MAP[lang]} />
                <span>{languageNames[lang]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
