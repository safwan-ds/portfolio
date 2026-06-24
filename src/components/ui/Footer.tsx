/**
 * Footer with i18n translations.
 */

import { useTranslation } from 'react-i18next'
import { HiHeart } from 'react-icons/hi'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative border-t border-slate/20 py-8 px-4 sm:px-6 pointer-events-auto bg-carbon/40 backdrop-blur-md">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-200">
          &copy; {new Date().getFullYear()} {t('footer.copyright')}
        </p>
        <p className="font-mono text-xs text-slate-300 flex items-center gap-1">
          {t('footer.madewith')} <HiHeart className="w-3 h-3 text-neon-pink" />
        </p>
      </div>
    </footer>
  )
}
