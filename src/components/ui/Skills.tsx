/**
 * Skills section — reads skill categories from src/data/skills.ts.
 * Purely presentational — edit skills.ts to change content.
 */

import { useTranslation } from 'react-i18next'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import GlassCard from './GlassCard'
import {
  HiOutlineCodeBracket,
  HiOutlineCommandLine,
  HiOutlineCpuChip,
  HiOutlinePaintBrush,
} from 'react-icons/hi2'
import { type SkillCategory, skills } from '../../data'

/** Maps accent name to pre-computed Tailwind classes (no dynamic JIT). */
const ACCENT_CLASSES: Record<
  string,
  {
    iconBg: string
    iconColor: string
    tagBg: string
    tagBorder: string
    glowGradient: string
  }
> = {
  'neon-cyan': {
    iconBg: 'bg-neon-cyan/10',
    iconColor: 'text-neon-cyan',
    tagBg: 'bg-neon-cyan/5',
    tagBorder: 'border-neon-cyan/10',
    glowGradient: 'bg-linear-to-br from-neon-cyan/5 to-transparent',
  },
  'neon-blue': {
    iconBg: 'bg-neon-blue/10',
    iconColor: 'text-neon-blue',
    tagBg: 'bg-neon-blue/5',
    tagBorder: 'border-neon-blue/10',
    glowGradient: 'bg-linear-to-br from-neon-blue/5 to-transparent',
  },
  'neon-purple': {
    iconBg: 'bg-neon-purple/10',
    iconColor: 'text-neon-purple',
    tagBg: 'bg-neon-purple/5',
    tagBorder: 'border-neon-purple/10',
    glowGradient: 'bg-linear-to-br from-neon-purple/5 to-transparent',
  },
  'neon-green': {
    iconBg: 'bg-neon-green/10',
    iconColor: 'text-neon-green',
    tagBg: 'bg-neon-green/5',
    tagBorder: 'border-neon-green/10',
    glowGradient: 'bg-linear-to-br from-neon-green/5 to-transparent',
  },
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  cpu: HiOutlineCpuChip,
  code: HiOutlineCodeBracket,
  command: HiOutlineCommandLine,
  brush: HiOutlinePaintBrush,
}

function SkillCard({ category }: { category: SkillCategory }) {
  const { t } = useTranslation()
  const Icon = ICON_MAP[category.icon]
  const ac = ACCENT_CLASSES[category.accent]

  return (
    <GlassCard className="group relative">
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${ac.glowGradient}`}
      />
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2 rounded-lg ${ac.iconBg}`}>
          <Icon className={`w-5 h-5 ${ac.iconColor}`} />
        </div>
        <h3 className="font-display text-lg font-semibold text-text-primary">
          {t(`skills.categories.${category.key}.title`)}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {category.skills.map((skill) => {
          const skillKey = `skills.categories.${category.key}.skills.${skill.key}`
          return (
            <div
              key={skill.key}
              className={`px-3 py-1.5 rounded-md font-mono text-xs text-text-secondary ${ac.tagBg} ${ac.tagBorder} border group-hover:border-slate/40 transition-colors`}
            >
              {t(skillKey)}
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}

export default function Skills() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="skills" label={t('skills.label')} title={t('skills.title')}>
      <SectionReveal delay={0.15}>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((cat) => (
            <SkillCard key={cat.key} category={cat} />
          ))}
        </div>
      </SectionReveal>
    </SectionWrapper>
  )
}
