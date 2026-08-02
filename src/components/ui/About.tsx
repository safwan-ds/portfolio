/**
 * About section — reads profile + interests from src/data/profile.ts.
 * Uses i18n for translatable labels.
 */

import { useTranslation } from 'react-i18next'
import { Dithering } from '@paper-design/shaders-react'
import { HiOutlineAcademicCap, HiOutlineMapPin, HiOutlineSparkles } from 'react-icons/hi2'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import FlatCard from './FlatCard.tsx'
import Label from './Label'
import Logo from './Logo'
import { cssColor } from '../../utils/constants'
import { profile } from '../../data'

export default function About() {
  const { t } = useTranslation()

  return (
    <SectionWrapper
      id="about"
      label={t('about.label')}
      title={t('about.title')}
      background={
        <Dithering
          colorBack="#00000000"
          colorFront={cssColor('carbon')}
          shape="swirl"
          type="8x8"
          size={4.2}
          speed={0.98}
          scale={0.56}
          className="w-full h-full"
        />
      }
    >
      <SectionReveal delay={0.15}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-5">
            <FlatCard>
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                  <Logo className="w-8 h-auto" color={cssColor('accent')} />
                </div>
                <div>
                  <Label color="accent" size="2xs" className="mb-0.5">
                    {t('about.name_label')}
                  </Label>
                  <p className="font-display text-xl font-semibold text-text-primary">
                    {t('about.name_val')}
                  </p>
                </div>
              </div>
            </FlatCard>
            <div className="space-y-4 text-text-secondary text-base leading-relaxed">
              <p>{t('about.bio_1')}</p>
              <p>{t('about.bio_2')}</p>
              <p>{t('about.bio_3')}</p>
            </div>
          </div>

          <div className="space-y-5">
            <FlatCard>
              <Label color="accent" className="mb-1 flex items-center gap-1.5">
                <HiOutlineMapPin className="w-4 h-4 -mt-0.5" />
                {t('about.location_label')}
              </Label>
              <p className="text-text-primary font-medium">{t('about.location_val')}</p>
            </FlatCard>

            <FlatCard>
              <Label color="neon-cyan" className="mb-1 flex items-center gap-1.5">
                <HiOutlineAcademicCap className="w-4 h-4 -mt-0.5" />
                {t('about.education_label')}
              </Label>
              <p className="text-text-primary font-medium">{t('about.education_val')}</p>
              <p className="text-text-secondary text-sm mt-1">{t('about.education_school')}</p>
            </FlatCard>

            <FlatCard>
              <Label color="neon-purple" className="mb-1 flex items-center gap-1.5">
                <HiOutlineSparkles className="w-4 h-4 -mt-0.5" />
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
            </FlatCard>
          </div>
        </div>
      </SectionReveal>
    </SectionWrapper>
  )
}
