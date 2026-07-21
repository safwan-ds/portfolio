/**
 * Projects section — reads project entries from src/data/projects.ts.
 * Each project references an i18n key (projects.items.<key>.title / .description).
 * Edit projects.ts to add/remove entries, edit locale files for translations.
 */

import { type MouseEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { HiArrowUpRight } from 'react-icons/hi2'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import NeonButton from './NeonButton'
import { profile, type Project, projects } from '../../data'

function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const titleKey = `projects.items.${project.key}.title`
  const descKey = `projects.items.${project.key}.description`

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
      className="group relative rounded-2xl bg-carbon/80 border border-slate/20 p-6 transition-colors duration-300 hover:border-neon-blue/30 cursor-pointer"
    >
      <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-neon-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-neon-blue transition-colors mb-3">
        {t(titleKey)}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4">{t(descKey)}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md bg-slate/30 font-mono text-[11px] text-text-secondary"
          >
            {t(`projects.tags.${tag}`)}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-neon-blue hover:text-neon-cyan transition-colors"
          >
            GitHub <HiArrowUpRight className="w-3 h-3" />
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-neon-purple hover:text-neon-pink transition-colors"
          >
            Live <HiArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </div>
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20 blur-xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="projects" label={t('projects.label')} title={t('projects.title')}>
      <SectionReveal delay={0.15}>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.key} project={p} />
          ))}
        </div>
      </SectionReveal>
      <SectionReveal delay={0.3}>
        <div className="mt-10 text-center">
          <NeonButton
            href={`https://github.com/${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('projects.github_cta')} <HiArrowUpRight className="w-4 h-4" />
          </NeonButton>
        </div>
      </SectionReveal>
    </SectionWrapper>
  )
}
