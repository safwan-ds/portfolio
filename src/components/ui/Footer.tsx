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
      <div className="mx-auto max-w-5xl mt-4 pt-3 border-t border-slate-800/50">
        <h4 className="font-mono text-[10px] text-slate-600 text-center mb-2 tracking-widest uppercase">
          3D Model Credits
        </h4>
        <p className="font-mono text-[10px] text-slate-500 text-center leading-relaxed">
          This work is based on{' '}
          <a
            href="https://skfb.ly/oUoss"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-400 transition-colors"
          >
            &quot;Legend 5&quot;
          </a>{' '}
          by{' '}
          <a
            href="https://skfb.ly/oUoss"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-400 transition-colors"
          >
            churliaevyaroslav
          </a>
          , licensed under{' '}
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-400 transition-colors"
          >
            CC BY 4.0
          </a>
        </p>
      </div>
    </footer>
  )
}
