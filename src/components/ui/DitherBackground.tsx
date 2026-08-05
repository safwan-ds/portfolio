import { Dithering } from '@paper-design/shaders-react'
import { cssColor } from '../../utils/constants'

interface DitherBackgroundProps {
  /** Dithering shape — vary per section so backgrounds don't all match. */
  shape?: 'sphere' | 'wave' | 'dots' | 'ripple' | 'swirl'
}

/**
 * Shared dither texture used as the background of every section.
 * Keeps the shader config in one place — tweak here, applies everywhere.
 * Pass a different `shape` per section for variety.
 */
export default function DitherBackground({ shape = 'swirl' }: DitherBackgroundProps) {
  return (
    <Dithering
      colorBack="#00000000"
      colorFront={cssColor('carbon')}
      shape={shape}
      type="8x8"
      size={4.2}
      speed={0.98}
      scale={0.56}
      className="w-full h-full"
    />
  )
}
