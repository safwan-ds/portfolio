/**
 * Centralized scene constants.
 * All magic numbers live here so they can be tuned in one place.
 */

/** Neon accent colors used across the scene (HDR values >1.0 trigger bloom). */
export const NEON_COLORS = {
    blue: [0.0, 0.83, 1.0] as [number, number, number],
    purple: [0.69, 0.15, 1.0] as [number, number, number],
    cyan: [0.0, 1.0, 0.96] as [number, number, number],
    pink: [1.0, 0.18, 0.6] as [number, number, number],
} as const

/** HDR emissive colors (values >1.0 — these are what bloom picks up). */
export const EMISSIVE_COLORS = {
    blue: [0.0, 1.7, 3.0] as [number, number, number],
    purple: [1.4, 0.3, 2.0] as [number, number, number],
    cyan: [0.0, 2.0, 1.9] as [number, number, number],
} as const

/** Warm key light (desk lamp). */
export const WARM_LIGHT = '#fff5e6'

/** Scene background fog color. */
export const FOG_COLOR = '#0a0a0f'

/** Camera configuration. */
export const CAMERA_CONFIG = {
    position: [0, 2.5, 11] as [number, number, number],
    fov: 45,
    near: 0.1,
    far: 100,
} as const

/** Bloom post-processing settings. */
export const BLOOM_CONFIG = {
    intensity: 0.8,
    luminanceThreshold: 0.5,
    luminanceSmoothing: 0.9,
    mipmapBlur: true,
} as const

/** Vignette settings. */
export const VIGNETTE_CONFIG = {
    offset: 0.3,
    darkness: 0.8,
} as const

/** Chromatic aberration offset. */
export const CHROMATIC_ABERRATION_OFFSET = [0.0005, 0.0005] as [number, number]

/** GLTF model asset paths — use import.meta.env.BASE_URL so paths work on both dev (/) and GitHub Pages (/portfolio/). */
const BASE = import.meta.env.BASE_URL
export const MODEL_PATHS = {
    computer: `${BASE}models/legend_5.glb`,
} as const
