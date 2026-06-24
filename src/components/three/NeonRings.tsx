/**
 * NeonRings — orbiting glowing rings around the desk.
 *
 * Thin torus geometries tilted at angles, slowly rotating.
 * Emissive neon materials trigger bloom glow.
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { EMISSIVE_COLORS } from '../../utils/constants'

interface RingConfig {
  radius: number
  tube: number
  position: [number, number, number]
  rotation: [number, number, number]
  color: [number, number, number]
  speed: number
}

const RINGS: RingConfig[] = [
  {
    radius: 4,
    tube: 0.015,
    position: [0, 2, 0],
    rotation: [Math.PI / 2.5, 0, 0],
    color: EMISSIVE_COLORS.blue,
    speed: 0.3,
  },
  {
    radius: 5.5,
    tube: 0.01,
    position: [0, 1, -1],
    rotation: [Math.PI / 3, Math.PI / 6, 0],
    color: EMISSIVE_COLORS.purple,
    speed: -0.2,
  },
  {
    radius: 3.5,
    tube: 0.012,
    position: [0, 3, 1],
    rotation: [-Math.PI / 4, 0, Math.PI / 8],
    color: EMISSIVE_COLORS.cyan,
    speed: 0.4,
  },
]

export default function NeonRings() {
  const ringRefs = useRef<(Group | null)[]>([])

  useFrame((_, delta) => {
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return
      ring.rotation.z += RINGS[i].speed * delta
    })
  })

  return (
    <>
      {RINGS.map((ring, i) => (
        <group
          key={i}
          ref={(el) => { ringRefs.current[i] = el }}
          position={ring.position}
          rotation={ring.rotation}
        >
          <mesh>
            <torusGeometry args={[ring.radius, ring.tube, 16, 128]} />
            <meshStandardMaterial
              color={ring.color}
              emissive={ring.color}
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}
