/**
 * About section — reads profile + interests from src/data/profile.ts.
 * Uses i18n for translatable labels.
 */

import { useTranslation } from 'react-i18next'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import GlassCard from './GlassCard'
import { profile } from '../../data'

export default function About() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="about" label={t('about.label')} title={t('about.title')}>
      <SectionReveal delay={0.15}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-5">
            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-neon-blue to-neon-purple flex items-center justify-center font-display text-lg font-bold text-white">
                  {t('about.name_val')
                    .split(' ')
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <p className="font-mono text-[10px] text-neon-blue uppercase tracking-widest mb-0.5">
                    {t('about.name_label')}
                  </p>
                  <p className="font-display text-xl font-semibold text-text-primary">
                    {t('about.name_val')}
                  </p>
                </div>
              </div>
            </GlassCard>
            <div className="space-y-4 text-text-secondary text-base leading-relaxed">
              <p>{t('about.bio_1')}</p>
              <p>{t('about.bio_2')}</p>
              <p>{t('about.bio_3')}</p>
            </div>
          </div>

          <div className="space-y-5">
            <GlassCard>
              <p className="font-mono text-xs text-neon-blue uppercase tracking-wider mb-1">
                {t('about.location_label')}
              </p>
              <p className="text-text-primary font-medium">{t('about.location_val')}</p>
            </GlassCard>

            <GlassCard>
              <p className="font-mono text-xs text-neon-cyan uppercase tracking-wider mb-1">
                {t('about.education_label')}
              </p>
              <p className="text-text-primary font-medium">{t('about.education_val')}</p>
              <p className="text-text-secondary text-sm mt-1">{t('about.education_school')}</p>
            </GlassCard>

            <GlassCard>
              <p className="font-mono text-xs text-neon-purple uppercase tracking-wider mb-1">
                {t('about.interests_label')}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.interestKeys.map((key) => (
                  <span
                    key={key}
                    className="px-2.5 py-1 rounded-full border border-slate/30 font-mono text-xs text-text-secondary"
                  >
                    {t(`about.interests.${key}`)}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </SectionReveal>
    </SectionWrapper>
  )
}
