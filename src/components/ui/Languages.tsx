/**
 * Languages section — language proficiency levels as horizontal bars.
 * Data sourced from src/data/languages.ts.
 */

import { useTranslation } from 'react-i18next'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import GlassCard from './GlassCard'
import FlagIcon from './FlagIcon'
import { languages } from '../../data'

const LEVEL_BAR: Record<string, { width: string; color: string }> = {
  native: { width: '100%', color: 'bg-linear-to-r from-emerald-500 to-teal-600' },
  c2: { width: '90%', color: 'bg-linear-to-r from-neon-purple to-pink-500' },
  c1: { width: '75%', color: 'bg-linear-to-r from-neon-blue to-cyan-500' },
}

export default function Languages() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="languages" label={t('languages.label')} title={t('languages.title')}>
      <SectionReveal delay={0.15}>
        <div className="mx-auto max-w-xl space-y-5">
          {languages.map((lang) => {
            const bar = LEVEL_BAR[lang.levelKey]
            return (
              <GlassCard key={lang.key}>
                {/* Mobile: stacked; sm+: horizontal row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  {/* Language name + flag */}
                  <p className="font-display text-sm sm:text-base font-semibold text-text-primary flex items-center gap-1.5 sm:gap-2 sm:w-32 shrink-0">
                    <FlagIcon
                      lang={lang.key as 'arabic' | 'english' | 'turkish'}
                      className="w-5 h-3.5 sm:w-6 sm:h-4 rounded-sm shrink-0"
                    />
                    <span>{t(`languages.items.${lang.key}`)}</span>
                  </p>
                  {/* Bar + level — full width on mobile */}
                  <div className="flex items-center gap-2 sm:gap-4 flex-1">
                    {/* Bar track */}
                    <div className="flex-1 h-2.5 sm:h-3 rounded-full bg-slate/30 overflow-hidden min-w-0">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${bar.color}`}
                        style={{ width: bar.width }}
                      />
                    </div>
                    {/* Level label */}
                    <p
                      className="font-mono text-[10px] sm:text-xs text-text-secondary w-28 text-right shrink-0 truncate"
                      title={t(`languages.levels.${lang.levelKey}`)}
                    >
                      {t(`languages.levels.${lang.levelKey}`)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </SectionReveal>
    </SectionWrapper>
  )
}
