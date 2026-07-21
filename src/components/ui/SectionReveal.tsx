/**
 * SectionReveal — wraps children with a scroll-triggered reveal animation.
 * Uses Framer Motion's useInView to animate when the section enters viewport.
 */

import { type ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  /** Animation direction: 'up' (fade-up), 'left', 'right', 'none' (fade only) */
  direction?: 'up' | 'left' | 'right' | 'none'
  /** Delay in seconds before animation starts */
  delay?: number
}

const directionVariants = {
  up: { y: 40, x: 0 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
}

export default function SectionReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-10% 0px -10% 0px',
  })

  const initialOffset = directionVariants[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialOffset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initialOffset }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // ease-out quad
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
