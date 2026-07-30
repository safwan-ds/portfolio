/**
 * Skills section — flip cards for each category.
 * Front shows the category, back lists the skills.
 * Flips on hover with staggered skill reveal.
 * Adapted from KokonutUI CardFlip concept, styled to the flat retro palette.
 */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import {
  HiOutlineCommandLine,
  HiOutlineCpuChip,
  HiOutlineFilm,
  HiOutlineGlobeAlt,
  HiOutlinePuzzlePiece,
  HiOutlineSignal,
  HiOutlineSparkles,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import { type SkillCategory, skills } from '../../data'
import RippleGrid from './RippleGrid'

const ACCENT_CLASSES: Record<
  string,
  { iconBg: string; iconColor: string; tagBg: string; tagBorder: string }
> = {
  'neon-cyan': {
    iconBg: 'bg-neon-cyan/10',
    iconColor: 'text-neon-cyan',
    tagBg: 'bg-neon-cyan/5',
    tagBorder: 'border-neon-cyan/10',
  },
  'neon-blue': {
    iconBg: 'bg-neon-blue/10',
    iconColor: 'text-neon-blue',
    tagBg: 'bg-neon-blue/5',
    tagBorder: 'border-neon-blue/10',
  },
  'neon-purple': {
    iconBg: 'bg-neon-purple/10',
    iconColor: 'text-neon-purple',
    tagBg: 'bg-neon-purple/5',
    tagBorder: 'border-neon-purple/10',
  },
  'neon-green': {
    iconBg: 'bg-neon-green/10',
    iconColor: 'text-neon-green',
    tagBg: 'bg-neon-green/5',
    tagBorder: 'border-neon-green/10',
  },
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  cpu: HiOutlineCpuChip,
  wrench: HiOutlineWrenchScrewdriver,
  signal: HiOutlineSignal,
  sparkles: HiOutlineSparkles,
  globe: HiOutlineGlobeAlt,
  command: HiOutlineCommandLine,
  puzzle: HiOutlinePuzzlePiece,
  film: HiOutlineFilm,
}

function SkillFlipCard({ category }: { category: SkillCategory }) {
  const { t } = useTranslation()
  const { isMobile } = useDeviceTier()
  const [flipped, setFlipped] = useState(false)
  const Icon = ICON_MAP[category.icon]
  const ac = ACCENT_CLASSES[category.accent]

  /* Desktop → hover flips. Mobile → click toggles. */

  const hoverProps = isMobile
    ? {}
    : {
        onMouseEnter: () => setFlipped(true) as void,
        onMouseLeave: () => setFlipped(false) as void,
      }

  return (
    <div
      className="group relative h-[300px] w-full [perspective:2000px] transition-transform duration-300 hover:scale-[1.02] active:scale-[1.01]"
      {...hoverProps}
      onClick={isMobile ? () => setFlipped((p) => !p) : undefined}
    >
      <div
        className={`relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
          flipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        }`}
      >
        {/* RippleGrid background — flips with the card */}
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg"
          aria-hidden="true"
        >
          <RippleGrid
            enableRainbow={false}
            gridColor="#ffffff"
            rippleIntensity={0.03}
            gridSize={10}
            gridThickness={20}
            fadeDistance={3.5}
            vignetteStrength={4.0}
            glowIntensity={0.8}
            opacity={1.0}
            mouseInteraction={false}
          />
        </div>
        {/* ── Front face ── */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden rounded-lg bg-carbon/85 border border-slate/20 group-hover:border-text-primary/20 transition-all duration-300 p-6 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div
              className={`p-3 rounded-xl ${ac.iconBg} transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon className={`w-8 h-8 ${ac.iconColor}`} />
            </div>
            <h3 className="font-display text-xl font-bold text-text-primary text-center leading-snug">
              {t(`skills.categories.${category.key}.title`)}
            </h3>
          </div>
        </div>

        {/* ── Back face ── */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-lg bg-carbon/95 border border-slate/20 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-1.5 rounded-lg ${ac.iconBg}`}>
              <Icon className={`w-4 h-4 ${ac.iconColor}`} />
            </div>
            <h3 className="font-display text-sm font-semibold text-text-primary leading-tight">
              {t(`skills.categories.${category.key}.title`)}
            </h3>
          </div>

          {/* Skills list — staggered reveal */}
          <div className="flex-1 flex flex-wrap content-start gap-2">
            {category.skills.map((skill, i) => {
              const skillKey = `skills.categories.${category.key}.skills.${skill.key}`
              return (
                <div
                  key={skill.key}
                  className={`px-2.5 py-1 rounded-md font-mono text-xs text-text-secondary ${ac.tagBg} ${ac.tagBorder} border transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]`}
                  style={{
                    transform: flipped ? 'translateX(0)' : 'translateX(-8px)',
                    opacity: flipped ? 1 : 0,
                    transitionDelay: `${i * 40}ms`,
                  }}
                >
                  {t(skillKey)}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="skills" label={t('skills.label')} title={t('skills.title')}>
      <SectionReveal delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 select-none">
          {skills.map((cat) => (
            <SkillFlipCard key={cat.key} category={cat} />
          ))}
        </div>
      </SectionReveal>
    </SectionWrapper>
  )
}
