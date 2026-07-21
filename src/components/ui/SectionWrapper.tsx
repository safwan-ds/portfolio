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
}

export default function SectionWrapper({
  id,
  children,
  label,
  title,
  maxWidth = '5xl',
  headerDelay = 0,
  className = '',
}: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-4 sm:px-6 ${className}`}>
      <div
        className={`mx-auto max-w-${maxWidth} rounded-3xl bg-void/70 backdrop-blur-md border border-slate/10 p-8 md:p-12 pointer-events-auto`}
      >
        {label && title && (
          <SectionReveal delay={headerDelay}>
            <p className="font-mono text-xs tracking-[0.2em] text-neon-blue uppercase mb-3">
              {label}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-8">
              {title}
            </h2>
          </SectionReveal>
        )}
        {children}
      </div>
    </section>
  )
}
