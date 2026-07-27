/**
 * About section — reads profile + interests from src/data/profile.ts.
 * Uses i18n for translatable labels.
 */

import { useTranslation } from 'react-i18next'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import GlassCard from './GlassCard'
import Label from './Label'
import Logo from './Logo'
import { PALETTE } from '../../utils/constants'
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
                <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                  <Logo className="w-8 h-auto" color={PALETTE.neonPink} />
                </div>
                <div>
                  <Label color="neon-blue" size="2xs" className="mb-0.5">
                    {t('about.name_label')}
                  </Label>
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
              <Label color="neon-blue" className="mb-1">
                {t('about.location_label')}
              </Label>
              <p className="text-text-primary font-medium">{t('about.location_val')}</p>
            </GlassCard>

            <GlassCard>
              <Label color="neon-cyan" className="mb-1">
                {t('about.education_label')}
              </Label>
              <p className="text-text-primary font-medium">{t('about.education_val')}</p>
              <p className="text-text-secondary text-sm mt-1">{t('about.education_school')}</p>
            </GlassCard>

            <GlassCard>
              <Label color="neon-purple" className="mb-1">
                {t('about.interests_label')}
              </Label>
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
