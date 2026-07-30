/**
 * Centralized constants.
 * All colors, scene config, and magic numbers live here.
 *
 * Colors are defined ONCE in index.css @theme as CSS custom properties
 * (--color-void, --color-neon-blue, etc.). This file reads them at
 * runtime via getComputedStyle — no duplication, no sync needed.
 */

// ── Color fallbacks (last resort if CSS custom property is unavailable) ──
const FALLBACKS: Record<string, string> = {
  void: '#141E3A',
  carbon: '#31466E',
  graphite: '#253556',
  slate: '#4A5E8A',
  'neon-blue': '#C084FF',
  'neon-purple': '#D4ACFF',
  'neon-cyan': '#FFCF95',
  'neon-pink': '#FFCF95',
  emerald: '#34D399',
  'text-primary': '#FFF0D9',
  'text-secondary': '#E8D5B8',
}

/**
 * Read a theme color from CSS custom property --color-<name>.
 *
 * @example
 *   cssColor('void')        // "#141E3A"
 *   cssColor('neon-blue')   // "#C084FF"
 *
 * Accepts camelCase (neonBlue) or kebab-case (neon-blue).
 * Falls back to the hardcoded values above if the CSS property
 * isn't defined (safe during SSR / early render).
 */
export function cssColor(name: string): string {
  const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  if (typeof document === 'undefined') return FALLBACKS[kebab] ?? '#000000'
  const val = getComputedStyle(document.documentElement).getPropertyValue(`--color-${kebab}`).trim()
  return val || (FALLBACKS[kebab] ?? '#000000')
}
