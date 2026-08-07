import { type ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'
import { useWipe } from '../../hooks/useWipe'
import { useMotionPref } from '../../hooks/useMotionPref'
import { WIPE_OVERLAP_VH } from '../../utils/constants'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  label?: string
  title?: string
  headerDelay?: number
  className?: string
  background?: ReactNode
  /** Exit wipe like the hero: clips from the bottom as the section scrolls
   *   past and pulls the next section up underneath so it's revealed by the
   *  wipe. Requires a zIndex below the section above and above the one below. */
  wipe?: boolean
  /** Stacking position in the wipe chain (strictly decreasing down the page). */
  zIndex?: string
  /** Content column width (applies to header and children). Default max-w-7xl. */
  maxWidth?: string
  /** Solid background color class for the section (default bg-void). */
  bgClass?: string
  /** Bottom padding class override (default pb-32 md:pb-44, matching the top). */
  pbClass?: string
}

export default function SectionWrapper({
  id,
  children,
  label,
  title,
  headerDelay: _headerDelay = 0,
  className = '',
  background,
  wipe = false,
  zIndex = 'z-0',
  maxWidth = 'max-w-7xl',
  bgClass = 'bg-void',
  pbClass = 'pb-32 md:pb-44',
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { clipPath } = useWipe(sectionRef)
  const { motionEnabled } = useMotionPref()
  const useWipeMotion = wipe && motionEnabled

  const content = (
    <>
      {background && (
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {background}
        </div>
      )}
      <div className={`relative z-10 w-full px-4 sm:px-6 mx-auto ${maxWidth} pointer-events-auto`}>
        {label && title && (
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3 select-none">
              {label}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-8 select-none">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </>
  )

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative ${zIndex} overflow-hidden ${className}`}
      style={
        useWipeMotion
          ? {
              // Pull the next section up underneath so the wipe reveals it
              marginBottom: `${-WIPE_OVERLAP_VH * 100}vh`,
            }
          : undefined
      }
    >
      {useWipeMotion ? (
        <motion.div
          className={`relative w-full pt-32 md:pt-44 ${pbClass} ${bgClass}`}
          style={{ clipPath, willChange: 'clip-path' }}
        >
          {content}
        </motion.div>
      ) : (
        <div className={`relative w-full pt-32 md:pt-44 ${pbClass} ${bgClass}`}>{content}</div>
      )}
    </section>
  )
}
