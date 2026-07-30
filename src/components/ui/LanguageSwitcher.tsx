/**
 * LanguageSwitcher — dropdown to switch between EN / AR / TR.
 * Updates i18n language and applies RTL direction for Arabic.
 */

import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import type { SupportedLanguage } from '../../i18n/config'
import { applyLanguageDirection, languageNames, SUPPORTED_LANGUAGES } from '../../i18n/config'
import Dropdown from './Dropdown'
import FlagIcon from './FlagIcon'

const FLAG_LANG_MAP: Record<SupportedLanguage, 'arabic' | 'english' | 'turkish'> = {
  ar: 'arabic',
  en: 'english',
  tr: 'turkish',
}

export default function LanguageSwitcher({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  const { i18n } = useTranslation()
  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open ?? internalOpen
  const toggle = onToggle ?? (() => setInternalOpen(!internalOpen))

  const currentLang = (i18n.language || 'en') as SupportedLanguage

  function changeLanguage(lang: SupportedLanguage) {
    i18n.changeLanguage(lang).catch(() => {})
    applyLanguageDirection(lang)
    if (!onToggle) setInternalOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggle}
        onMouseDown={(e) => e.stopPropagation()}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate/20 border border-slate/30 font-mono text-xs text-text-secondary hover:text-text-primary hover:border-slate/40 transition-all"
        aria-label="Switch language"
      >
        <FlagIcon lang={FLAG_LANG_MAP[currentLang]} />
        <span className="hidden sm:inline">{languageNames[currentLang]}</span>
      </button>

      <Dropdown open={isOpen} onClose={onToggle ?? (() => setInternalOpen(false))} width="w-40">
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
      </Dropdown>
    </div>
  )
}
