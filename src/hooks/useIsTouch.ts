import { useMemo } from 'react'

/**
 * True when the primary pointer is coarse (touch).
 *
 * Unlike width-based `useDeviceTier.isMobile`, this is orientation-proof: a
 * landscape phone or a tablet still reports `pointer: coarse`, so hover-only
 * effects gated on this stay off on every touch device. Use it for effects
 * that only make sense with a real hover pointer (tilt, hover-open panels).
 */
export function useIsTouch(): boolean {
  return useMemo(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches,
    [],
  )
}
