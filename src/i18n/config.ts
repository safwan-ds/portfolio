/**
 * i18n configuration — react-i18next with language detection.
 * Supported: English (en), Arabic (ar / RTL), Turkish (tr).
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import ar from './locales/ar.json'
import tr from './locales/tr.json'

export const SUPPORTED_LANGUAGES = ['en', 'ar', 'tr'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  ar: 'العربية',
  tr: 'Türkçe',
}

/** Languages that use right-to-left text direction. */
const RTL_LANGUAGES: SupportedLanguage[] = ['ar']

/**
 * Apply RTL/LTR direction to the HTML element based on the active language.
 * Should be called on language change.
 */
export function applyLanguageDirection(lang: SupportedLanguage): void {
  const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr'
  document.documentElement.dir = dir
  document.documentElement.lang = lang
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      tr: { translation: tr },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

// Apply RTL on initial load
const savedLang = (localStorage.getItem('i18nextLng') || 'en') as SupportedLanguage
if (SUPPORTED_LANGUAGES.includes(savedLang)) {
  applyLanguageDirection(savedLang)
}

export default i18n
