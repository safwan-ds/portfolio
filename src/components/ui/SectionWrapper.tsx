import { type ReactNode } from 'react'
import SectionReveal from './SectionReveal'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  /** Translated section label (rendered inside SectionReveal header) */
  label?: string
  /** Translated section title (rendered inside SectionReveal header) */
  title?: string
  /** Container max-width: '5xl' (default) or '4xl' */
  maxWidth?: '4xl' | '5xl'
  /** Delay for the header SectionReveal */
  headerDelay?: number
  /** Additional classes on the outer <section> */
  className?: string
  /** Background element rendered inside <section> behind the content div */
  background?: ReactNode
}

export default function SectionWrapper({
  id,
  children,
  label,
  title,
  maxWidth = '5xl',
  headerDelay = 0,
  className = '',
  background,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 ${className}`}
    >
      <div
        className={`mx-auto max-w-${maxWidth} relative rounded-lg bg-graphite p-8 md:p-12 pointer-events-auto`}
      >
        {background && (
          <div
            className="absolute inset-0 z-0 rounded-lg pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            {background}
          </div>
        )}
        <div className="relative z-10">
          {label && title && (
            <SectionReveal delay={headerDelay}>
              <p className="font-mono text-xs tracking-[0.2em] text-neon-blue uppercase mb-3 select-none">
                {label}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-8 select-none">
                {title}
              </h2>
            </SectionReveal>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
