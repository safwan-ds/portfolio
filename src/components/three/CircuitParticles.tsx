/**
 * CircuitParticles — glowing particle field arranged in circuit-like paths.
 *
 * Uses a points geometry with positions generated along horizontal and
 * vertical grid lines (circuit board traces). Particles pulse opacity
 * to simulate data flowing through circuits.
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 300
const SPREAD = 8
const GRID_LINES = 8

/** Generate circuit-like grid positions (traces along x and z axes). */
function generateCircuitPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const isHorizontal = Math.random() > 0.5
    const lineIndex = Math.floor(Math.random() * GRID_LINES)
    const lineOffset = (lineIndex - GRID_LINES / 2) * (SPREAD / GRID_LINES)

    if (isHorizontal) {
      // Trace along X axis at a fixed Z
      positions[i * 3] = (Math.random() - 0.5) * SPREAD
      positions[i * 3 + 1] = Math.random() * 4 + 0.5
      positions[i * 3 + 2] = lineOffset
    } else {
      // Trace along Z axis at a fixed X
      positions[i * 3] = lineOffset
      positions[i * 3 + 1] = Math.random() * 4 + 0.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD
    }
  }

  return positions
}

export default function CircuitParticles() {
  const materialRef = useRef<THREE.PointsMaterial>(null)

  const positions = useMemo(
    () => generateCircuitPositions(PARTICLE_COUNT),
    [],
  )

  // Pulse the opacity to simulate data flow
  useFrame((state) => {
    if (!materialRef.current) return
    const t = state.clock.elapsedTime
    materialRef.current.opacity = 0.4 + Math.sin(t * 2) * 0.3
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.08}
        color={new THREE.Color(0, 1.7, 3.0)}
        transparent
        opacity={0.5}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  )
}
