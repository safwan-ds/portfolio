/**
 * WaveParticles — GPU particle field with wave motion on Y axis.
 *
 * Uses maath's randomPointsInBox for distribution. Particles oscillate
 * vertically with a sine wave, creating a flowing wave effect.
 * Purple/magenta emissive color complements the blue circuit particles.
 */

import {useEffect, useMemo, useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import {Vector3} from 'three'
import {useDeviceTier} from '../../hooks/useDeviceTier'

const DESKTOP_PARTICLE_COUNT = 500
const REDUCED_PARTICLE_COUNT = 100
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
    const {isReduced} = useDeviceTier()
    const particleCount = isReduced ? REDUCED_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT

    const {positions, baseY} = useMemo(() => generateWavePositions(particleCount), [particleCount])

    // Keep refs in sync so useFrame always reads the latest arrays
    const positionsRef = useRef(positions)
    const baseYRef = useRef(baseY)

    useEffect(() => {
        positionsRef.current = positions
        baseYRef.current = baseY
    }, [positions, baseY])

  // Animate Y position with a sine wave based on X and Z coordinates
  useFrame((state) => {
    if (!geometryRef.current) return
    const t = state.clock.elapsedTime
    const posAttr = geometryRef.current.attributes.position as THREE.BufferAttribute
      const pos = positionsRef.current
      const base = baseYRef.current

      for (let i = 0; i < pos.length / 3; i++) {
          const x = pos[i * 3]
          const z = pos[i * 3 + 2]
          posAttr.array[i * 3 + 1] = base[i] + Math.sin(t + x * 0.5 + z * 0.3) * 0.3
    }
    posAttr.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
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
