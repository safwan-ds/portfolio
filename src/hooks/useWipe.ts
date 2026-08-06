import { type RefObject } from 'react'
import { useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { HERO_WIPE_EXTRA_VH } from '../utils/constants'

type WipeScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset']

/**
 * Scroll-linked exit wipe — the mechanism the hero uses, extracted for reuse.
 *
 * VIEWPORT-relative, not section-relative, so every section wipes identically
 * regardless of height:
 * - window starts when the section BOTTOM hits the viewport bottom (section
 *   fully entered) and ends `extraVh` viewport-heights AFTER the section
 *   bottom passes the viewport top — more scroll = a slower wipe
 * - clip `0vh → 100vh`: the wipe edge sweeps from the fold to the top, eased
 *   with easeInOut so it accelerates in and decelerates out (smooth, not
 *   linear)
 *
 * This is why the clip uses vh units, NOT a percentage of the section: a
 * section-% clip on a tall section finishes before the section has entered,
 * and on a short section lags past its exit.
 *
 * The section itself must stay UNCLIPPED (clip an inner layer instead) —
 * clipping the measured scroll target breaks useScroll progress.
 */
export function useWipe(target: RefObject<HTMLElement | null>, extraVh = HERO_WIPE_EXTRA_VH) {
  const offset = ['end end', `end -${extraVh * 100}vh`] as WipeScrollOffset
  const { scrollYProgress } = useScroll({
    target,
    offset,
  })
  const clipBottom = useTransform(scrollYProgress, [0, 1], ['0vh', '100vh'])
  const clipPath = useMotionTemplate`inset(0 0 ${clipBottom} 0)`
  return { clipPath }
}
