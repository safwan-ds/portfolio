/**
 * LanguageSwitcher — dropdown to switch between EN / AR / TR.
 */

import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SupportedLanguage } from '../../i18n/config'
import { applyLanguageDirection, languageNames, SUPPORTED_LANGUAGES } from '../../i18n/config'
import FlagIcon from './FlagIcon'

const FLAG_LANG_MAP: Record<SupportedLanguage, 'arabic' | 'english' | 'turkish'> = {
  ar: 'arabic',
  en: 'english',
  tr: 'turkish',
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const currentLang = (i18n.language || 'en') as SupportedLanguage

  const isRtl = i18n.language === 'ar'

  function changeLanguage(lang: SupportedLanguage) {
    i18n.changeLanguage(lang).catch(() => {})
    applyLanguageDirection(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-xs text-slate-200 hover:text-white transition-colors cursor-pointer rounded-lg h-[34px]"
        style={{
          background: 'rgba(20, 30, 58, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
        aria-label="Switch language"
      >
        <FlagIcon lang={FLAG_LANG_MAP[currentLang]} />
        <span className="hidden sm:inline">{languageNames[currentLang]}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full mb-1 md:top-full md:bottom-auto md:mt-1 md:mb-0 rounded-xl w-[160px] overflow-hidden z-50"
            style={{
              [isRtl ? 'left' : 'right']: 0,
              background: 'rgba(20, 30, 58, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`flex items-center gap-2 w-full px-3 py-2 font-mono text-xs text-start hover:bg-white/[0.06] transition-colors ${
                  lang === currentLang ? 'text-accent' : 'text-text-secondary'
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
