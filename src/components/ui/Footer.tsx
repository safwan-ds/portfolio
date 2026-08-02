/**
 * Footer with i18n translations.
 */

import { useTranslation } from 'react-i18next'
import { HiHeart } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      className="relative pointer-events-auto py-8 px-4 sm:px-6"
      style={{
        background: 'rgba(20, 30, 58, 0.85)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-200">
          &copy; {new Date().getFullYear()} {t('footer.copyright')}
        </p>
        <p className="font-mono text-xs text-slate-300 flex items-center gap-1">
          {t('footer.madewith')} <HiHeart className="w-3 h-3 text-error" />
        </p>
      </div>
      <div className="mx-auto max-w-5xl mt-4 flex justify-center">
        <a
          href="https://github.com/safwan-ds/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-accent hover:text-accent-hover transition-colors flex items-center gap-1.5"
        >
          <FaGithub className="w-3.5 h-3.5" />
          {t('footer.source')}
        </a>
      </div>
    </footer>
  )
}
