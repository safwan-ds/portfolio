import { Dithering } from '@paper-design/shaders-react'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import { cssColor } from '../../utils/constants'

interface DitherBackgroundProps {
  /** Dithering shape — vary per section so backgrounds don't all match. */
  shape?: 'sphere' | 'wave' | 'dots' | 'ripple' | 'swirl'
}

/**
 * Mobile GPU budget cap. A full-bleed section shader at phone DPR (2.75)
 * renders ~2.85M px; under that load Android Chrome can evict WebGL contexts
 * (error-placeholder flash). Capping keeps the texture at ~1M px on phones;
 * desktop passes undefined → library default (1920x1080x4), unchanged.
 */
const MOBILE_MAX_PIXEL_COUNT = 1_000_000

/**
 * Shared dither texture used as the background of every section.
 * Keeps the shader config in one place — tweak here, applies everywhere.
 * Pass a different `shape` per section for variety.
 */
export default function DitherBackground({ shape = 'swirl' }: DitherBackgroundProps) {
  const { isMobile } = useDeviceTier()
  return (
    <Dithering
      colorBack="#00000000"
      colorFront={cssColor('carbon')}
      shape={shape}
      type="8x8"
      size={4.2}
      speed={0.98}
      scale={0.56}
      maxPixelCount={isMobile ? MOBILE_MAX_PIXEL_COUNT : undefined}
      className="w-full h-full"
    />
  )
}
