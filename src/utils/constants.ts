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
