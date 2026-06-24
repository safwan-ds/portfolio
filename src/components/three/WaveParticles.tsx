/**
 * WaveParticles — GPU particle field with wave motion on Y axis.
 *
 * Uses maath's randomPointsInBox for distribution. Particles oscillate
 * vertically with a sine wave, creating a flowing wave effect.
 * Purple/magenta emissive color complements the blue circuit particles.
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Vector3 } from 'three'
import { EMISSIVE_COLORS } from '../../utils/constants'

const PARTICLE_COUNT = 500
const BOUNDS = new Vector3(10, 5, 10)

/** Generate randomly distributed point positions within a box volume. */
function generateWavePositions(count: number): { positions: Float32Array; baseY: Float32Array } {
  const positions = new Float32Array(count * 3)
  const baseY = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * BOUNDS.x
    positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y
    positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS.z
    baseY[i] = positions[i * 3 + 1]
  }

  return { positions, baseY }
}

export default function WaveParticles() {
  const geometryRef = useRef<THREE.BufferGeometry>(null)

  const { positions, baseY } = useMemo(
    () => generateWavePositions(PARTICLE_COUNT),
    [],
  )

  // Animate Y position with a sine wave based on X and Z coordinates
  useFrame((state) => {
    if (!geometryRef.current) return
    const t = state.clock.elapsedTime
    const posAttr = geometryRef.current.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = positions[i * 3]
      const z = positions[i * 3 + 2]
      posAttr.array[i * 3 + 1] = baseY[i] + Math.sin(t + x * 0.5 + z * 0.3) * 0.3
    }
    posAttr.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={new THREE.Color(1.4, 0.3, 2.0)}
        transparent
        opacity={0.4}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  )
}
