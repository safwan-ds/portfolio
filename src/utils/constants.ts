/**
 * Centralized constants.
 * All colors live in index.css @theme as CSS custom properties.
 * This file reads them at runtime via getComputedStyle.
 */

/**
 * Read a theme color from CSS custom property --color-<name>.
 *
 * @example
 *   cssColor('void')        // "rgba(255, 255, 255, 0.03)"  (from CSS)
 *   cssColor('accent')     // "#C084FF"
 *
 * Accepts camelCase (neonBlue) or kebab-case (accent).
 */
export function cssColor(name: string): string {
  const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  return getComputedStyle(document.documentElement).getPropertyValue(`--color-${kebab}`).trim()
}

/**
 * Hero wipe/parallax motion speed.
 * Extra scroll distance, in viewport heights, added to the wipe window.
 * Higher = slower visible wipe: the clip now completes PAST section exit, so
 * the on-screen drain runs at a slower rate (e.g. 0.8 → window 180vh, clip
 * ~1.56x scroll instead of 2x). 0 = original speed.
 */
export const HERO_WIPE_EXTRA_VH = 0.8

/**
 * How far (in viewport heights) each section is pulled up under the previous
 * one, so the next section is revealed underneath as the wipe passes.
 * Kept smaller than the wipe window extension so the reveal starts while the
 * current section is still on screen — growing it with the wipe speed would
 * delay the reveal until the section is nearly gone.
 */
export const WIPE_OVERLAP_VH = 0.4
