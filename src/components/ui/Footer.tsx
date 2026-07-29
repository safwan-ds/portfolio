/**
 * Footer with i18n translations.
 */

import { useTranslation } from 'react-i18next'
import { HiHeart } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative border-t-2 border-neon-blue/30 py-8 px-4 sm:px-6 pointer-events-auto bg-carbon/40 backdrop-blur-md">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-3">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
          <p className="font-vt323 text-xs text-slate-200 tracking-wider order-2 sm:order-1">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="font-mono text-xs text-slate-300 flex items-center gap-1 order-1 sm:order-2">
            {t('footer.madewith')} <HiHeart className="w-3 h-3 text-neon-pink" />
          </p>
        </div>
        <a
          href="https://github.com/safwan-ds/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-neon-blue hover:text-neon-cyan transition-colors flex items-center gap-1.5"
        >
          <FaGithub className="w-3.5 h-3.5" />
          {t('footer.source')}
        </a>
      </div>
    </footer>
  )
}
