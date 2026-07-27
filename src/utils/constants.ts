/**
 * Centralized constants.
 * All colors, scene config, and magic numbers live here.
 */

// ── Palette hex values (matches index.css @theme) ──
export const PALETTE = {
  void: '#1a1a1a',
  carbon: '#222222',
  graphite: '#1e1e1e',
  slate: '#333333',
  neonBlue: '#1e93ab',
  neonPurple: '#e62727',
  neonCyan: '#1e93ab',
  neonPink: '#f3f2ec',
  textPrimary: '#f3f2ec',
  textSecondary: '#dcdcdc',
} as const

// ── Scene background gradients —─
export const BACKGROUND_GRADIENT =
  'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(30,147,171,0.15) 0%, #1a1a1a 50%, #111111 100%)'

/** Glow behind project cards on hover. */
export const CARD_GLOW_GRADIENT =
  'radial-gradient(ellipse at center, rgba(30,147,171,0.08) 0%, transparent 70%)'

// ── 3D scene colors ──
/** Fog color for reduced-quality mode. */
export const FOG_COLOR_REDUCED = '#222222'

/** Fallback mesh color for reduced-quality mode. */
export const BG_COLOR_REDUCED = '#1a1a1a'

/** Scene background fog color (full effects). */
export const FOG_COLOR = '#1a1a1a'

/** Ambient light color filling shadow areas. */
export const AMBIENT_LIGHT_COLOR = '#222222'

/** Warm key light (desk lamp). */
export const WARM_LIGHT = '#fff5e6'

/**
 * Neon accent colors used across the scene.
 * Normalized RGB tuples (can be >1.0 for HDR bloom).
 */
export const NEON_COLORS = {
  blue: [0.12, 0.58, 0.67] as [number, number, number],
  purple: [0.9, 0.15, 0.15] as [number, number, number],
  cyan: [0.12, 0.58, 0.67] as [number, number, number],
  pink: [0.95, 0.95, 0.93] as [number, number, number],
} as const

/** HDR emissive colors (values >1.0 — these are what bloom picks up). */
export const EMISSIVE_COLORS = {
  blue: [0.36, 1.74, 2.01] as [number, number, number],
  purple: [2.71, 0.46, 0.46] as [number, number, number],
  cyan: [0.36, 1.74, 2.01] as [number, number, number],
} as const

// ── Camera ──
export const CAMERA_CONFIG = {
  position: [0, 2.5, 11] as [number, number, number],
  fov: 45,
  near: 0.1,
  far: 100,
} as const

// ── Post-processing ──
export const BLOOM_CONFIG = {
  intensity: 0.8,
  luminanceThreshold: 0.5,
  luminanceSmoothing: 0.9,
  mipmapBlur: true,
} as const

export const VIGNETTE_CONFIG = {
  offset: 0.3,
  darkness: 0.8,
} as const

export const CHROMATIC_ABERRATION_OFFSET = [0.0005, 0.0005] as [number, number]

// ── Assets ──
/** GLTF model asset paths — use import.meta.env.BASE_URL so paths work on both dev (/) and GitHub Pages (/portfolio/). */
const BASE = import.meta.env.BASE_URL
export const MODEL_PATHS = {
  computer: `${BASE}models/legend_5.glb`,
} as const
