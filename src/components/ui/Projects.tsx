/**
 * Projects section — reads project entries from src/data/projects.ts.
 * Each project references an i18n key (projects.items.<key>.title / .description).
 * Edit projects.ts to add/remove entries, edit locale files for translations.
 */

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { HiArrowUpRight, HiEye } from 'react-icons/hi2'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import NeonButton from './NeonButton'
import ExternalLink from './ExternalLink'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import { profile, type Project, projects } from '../../data'

interface Origin {
  left: number
  top: number
  width: number
  height: number
}

interface ExpandState {
  key: string
  origin: Origin
  size: { w: number; h: number }
  project: Project
}

interface ProjectCardProps {
  project: Project
  onActivate: (
    key: string | null,
    data?: { origin: Origin; size: { w: number; h: number }; project: Project },
  ) => void
  isExpanded: boolean
  background?: ReactNode
}

function ProjectCard({ project, onActivate, isExpanded, background }: ProjectCardProps) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [naturalRatio, setNaturalRatio] = useState(1)
  const { isMobile } = useDeviceTier()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  // Smoothly return to neutral and freeze tilt while image is expanded
  useEffect(() => {
    if (isExpanded) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [isExpanded, mouseX, mouseY])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isExpanded || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const titleKey = `projects.items.${project.key}.title`
  const descKey = `projects.items.${project.key}.description`

  function handleOpen() {
    if (isMobile || !thumbRef.current || !cardRef.current) return
    // Temporarily remove the card's tilt transform so getBoundingClientRect
    // returns the untransformed (layout) rect — all synchronous, no paint between
    const card = cardRef.current
    const savedTransform = card.style.transform
    card.style.transform = ''
    const r = thumbRef.current.getBoundingClientRect()
    card.style.transform = savedTransform
    const origin: Origin = {
      left: r.left + window.scrollX,
      top: r.top + window.scrollY,
      width: r.width,
      height: r.height,
    }
    const ratio = naturalRatio
    const size =
      ratio > 1 ? { w: r.width * ratio, h: r.height } : { w: r.width, h: r.height / ratio }
    onActivate(project.key, { origin, size, project })
  }

  function handleImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    setNaturalRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
        }}
        className="group relative rounded-2xl bg-carbon/80 border border-neon-blue/10 p-6 transition-colors duration-300 hover:border-neon-blue/30 cursor-pointer overflow-hidden"
      >
        {background && (
          <div
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl"
            aria-hidden="true"
          >
            {background}
          </div>
        )}
        <div className="relative z-10">
          <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-neon-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {project.image && (
            <div
              ref={thumbRef}
              data-project-key={project.key}
              className="relative -mx-6 -mt-6 mb-6 overflow-hidden group/img"
            >
              <div
                className={`aspect-square overflow-hidden rounded-2xl${isMobile ? '' : ' cursor-pointer'}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpen()
                }}
              >
                <img
                  src={project.image}
                  alt={t(titleKey)}
                  className="w-full h-full object-cover"
                  onLoad={handleImgLoad}
                />
                <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover/img:bg-black/50 transition-colors duration-300" />
                {!isMobile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpen()
                    }}
                    className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 cursor-pointer"
                    aria-label="Expand image"
                  >
                    <HiEye className="w-10 h-10 text-white drop-shadow-lg" />
                  </button>
                )}
              </div>
            </div>
          )}
          <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-neon-blue transition-colors mb-3">
            {t(titleKey)}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">{t(descKey)}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-sm bg-neon-blue/10 text-neon-blue/80 font-mono text-[11px]"
              >
                {t(`projects.tags.${tag}`)}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github && (
              <ExternalLink
                href={project.github}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-neon-blue hover:text-neon-cyan transition-colors"
              >
                GitHub <HiArrowUpRight className="w-3 h-3" />
              </ExternalLink>
            )}
            {project.link && (
              <ExternalLink
                href={project.link}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-neon-purple hover:text-neon-pink transition-colors"
              >
                Live <HiArrowUpRight className="w-3 h-3" />
              </ExternalLink>
            )}
          </div>
        </div>
        {/* end content z-10 */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20 blur-xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  )
}

/**
 * Expanded image overlay — rendered in a portal.
 * Captures origin/size in local state at mount time so the exit animation
 * isn't corrupted when the parent's expandState changes (e.g. switching
 * images while one is still closing).
 */
function ExpandedImage({ data, onClose }: { data: ExpandState; onClose: () => void }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  // Freeze at mount — this instance keeps its own values for its whole lifecycle,
  // including during exit, so switching images won't corrupt the closing animation.
  const [origin, setOrigin] = useState(data.origin)
  const [size] = useState(data.size)

  // Close handler: re-read card position from DOM for scroll-accurate exit,
  // then trigger the parent's state cleanup.
  function handleClose() {
    const el = document.querySelector(`[data-project-key="${data.key}"]`)
    if (el) {
      const r = el.getBoundingClientRect()
      flushSync(() => {
        setOrigin({
          left: r.left + window.scrollX,
          top: r.top + window.scrollY,
          width: r.width,
          height: r.height,
        })
      })
    }
    onClose()
  }

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    handleClose()
  }

  // Imperative listeners (keyboard, outside-click, scroll/touch close)
  useEffect(() => {
    if (!ref.current) return
    let isActive = true

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }

    function onDocClick(e: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClose()
      }
    }

    const defer = setTimeout(() => {
      if (!isActive) return
      document.addEventListener('keydown', onKeyDown)
      document.addEventListener('click', onDocClick)
      window.addEventListener('wheel', handleClose, { passive: true, once: true })
      window.addEventListener('touchmove', handleClose, { passive: true, once: true })
    }, 100)

    return () => {
      isActive = false
      clearTimeout(defer)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('wheel', handleClose)
      window.removeEventListener('touchmove', handleClose)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.key])

  return (
    <motion.div
      ref={ref}
      variants={{
        initial: {
          opacity: 0,
          left: origin.left,
          top: origin.top,
          width: origin.width,
          height: origin.height,
        },
        enter: {
          opacity: 1,
          left: origin.left + (origin.width - size.w) / 2,
          top: origin.top + (origin.height - size.h) / 2,
          width: size.w,
          height: size.h,
          transition: {
            opacity: { duration: 0.15 },
            left: { type: 'spring', damping: 40, stiffness: 300 },
            top: { type: 'spring', damping: 40, stiffness: 300 },
            width: { type: 'spring', damping: 40, stiffness: 300 },
            height: { type: 'spring', damping: 40, stiffness: 300 },
          },
        },
        exit: {
          opacity: 0,
          left: origin.left,
          top: origin.top,
          width: origin.width,
          height: origin.height,
          transition: {
            opacity: { duration: 0.15, delay: 0.35 },
            left: { duration: 0.35, ease: 'easeInOut' },
            top: { duration: 0.35, ease: 'easeInOut' },
            width: { duration: 0.35, ease: 'easeInOut' },
            height: { duration: 0.35, ease: 'easeInOut' },
          },
        },
      }}
      initial="initial"
      animate="enter"
      exit="exit"
      className="absolute z-40 overflow-hidden cursor-pointer rounded-2xl shadow-2xl shadow-black"
      onClick={handleClick}
    >
      <img
        src={data.project.image}
        alt={t(`projects.items.${data.project.key}.title`)}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const [expandState, setExpandState] = useState<ExpandState | null>(null)

  function handleActivate(
    key: string | null,
    data?: { origin: Origin; size: { w: number; h: number }; project: Project },
  ) {
    if (key && data) {
      setExpandState({ key, ...data })
    } else {
      setExpandState(null)
    }
  }

  function handleClose() {
    setExpandState(null)
  }

  const es = expandState

  return (
    <SectionWrapper id="projects" label={t('projects.label')} title={t('projects.title')}>
      <SectionReveal delay={0.15}>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard
              key={p.key}
              project={p}
              onActivate={handleActivate}
              isExpanded={expandState?.key === p.key}
            />
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

      {createPortal(
        <AnimatePresence>
          {es && <ExpandedImage key={`exp-${es.key}`} data={es} onClose={handleClose} />}
        </AnimatePresence>,
        document.body,
      )}
    </SectionWrapper>
  )
}
