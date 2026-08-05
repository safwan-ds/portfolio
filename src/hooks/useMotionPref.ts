import { useReducedMotion } from 'framer-motion'

/**
 * Whether scroll-wipe motion should run.
 * Disabled only for OS prefers-reduced-motion.
 */
export function useMotionPref() {
  const osReduced = useReducedMotion()

  return {
    motionEnabled: !osReduced,
  }
}
