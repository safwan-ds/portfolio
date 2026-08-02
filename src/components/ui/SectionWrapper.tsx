import { type ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  label?: string
  title?: string
  maxWidth?: '4xl' | '5xl'
  headerDelay?: number
  className?: string
  background?: ReactNode
}

export default function SectionWrapper({
  id,
  children,
  label,
  title,
  maxWidth = '5xl',
  headerDelay: _headerDelay = 0,
  className = '',
  background,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 ${className}`}
    >
      <div className={`mx-auto max-w-${maxWidth}`}>
        <div
          className="relative overflow-hidden rounded-2xl pointer-events-auto"
          style={{
            background: 'rgba(20, 30, 58, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {background && (
            <div
              className="absolute inset-0 z-0 rounded-lg pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              {background}
            </div>
          )}
          <div className="relative z-10 w-full p-8 md:p-12">
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
        </div>
      </div>
    </section>
  )
}
