/**
 * FloatingShapes — abstract geometric shapes that float around the desk.
 * Uses drei's <Float> for idle bobbing/rotation animation.
 * Scene-wide parallax (cursor tilt) is handled by SceneParallax wrapper.
 */

import { Dodecahedron, Float, Icosahedron, Octahedron, Torus } from '@react-three/drei'
import { EMISSIVE_COLORS } from '../../utils/constants'

interface ShapeConfig {
  position: [number, number, number]
  scale: number
  color: [number, number, number]
  wireframe: boolean
  speed: number
  rotationIntensity: number
}

const SHAPES: ShapeConfig[] = [
  {
    position: [4, 3, -1],
    scale: 0.5,
    color: EMISSIVE_COLORS.blue,
    wireframe: false,
    speed: 1.5,
    rotationIntensity: 0.8,
  },
  {
    position: [-5, 2.5, 0],
    scale: 0.4,
    color: EMISSIVE_COLORS.purple,
    wireframe: true,
    speed: 2,
    rotationIntensity: 1.2,
  },
  {
    position: [3, -0.5, 2],
    scale: 0.35,
    color: EMISSIVE_COLORS.cyan,
    wireframe: false,
    speed: 1.8,
    rotationIntensity: 1,
  },
  {
    position: [-3, 4, -2],
    scale: 0.5,
    color: EMISSIVE_COLORS.purple,
    wireframe: false,
    speed: 1.2,
    rotationIntensity: 0.6,
  },
  {
    position: [5, 1, -3],
    scale: 0.4,
    color: EMISSIVE_COLORS.blue,
    wireframe: true,
    speed: 2.5,
    rotationIntensity: 1.5,
  },
  {
    position: [-5, 0.5, 1],
    scale: 0.45,
    color: EMISSIVE_COLORS.cyan,
    wireframe: false,
    speed: 1.6,
    rotationIntensity: 0.9,
  },
]

export default function FloatingShapes() {
  return (
    <>
      {SHAPES.map((shape, i) => (
        <Float
          key={i}
          speed={shape.speed}
          rotationIntensity={shape.rotationIntensity}
          floatIntensity={1.5}
          floatingRange={[-0.3, 0.3]}
        >
          {i % 4 === 0 && (
            <Icosahedron args={[shape.scale, 0]} position={shape.position}>
              <meshStandardMaterial
                color={shape.color}
                emissive={shape.color}
                emissiveIntensity={2}
                wireframe={shape.wireframe}
                toneMapped={false}
              />
            </Icosahedron>
          )}
          {i % 4 === 1 && (
            <Torus args={[shape.scale, shape.scale * 0.3, 16, 32]} position={shape.position}>
              <meshStandardMaterial
                color={shape.color}
                emissive={shape.color}
                emissiveIntensity={2}
                wireframe={shape.wireframe}
                toneMapped={false}
              />
            </Torus>
          )}
          {i % 4 === 2 && (
            <Octahedron args={[shape.scale, 0]} position={shape.position}>
              <meshStandardMaterial
                color={shape.color}
                emissive={shape.color}
                emissiveIntensity={2}
                wireframe={shape.wireframe}
                toneMapped={false}
              />
            </Octahedron>
          )}
          {i % 4 === 3 && (
            <Dodecahedron args={[shape.scale, 0]} position={shape.position}>
              <meshStandardMaterial
                color={shape.color}
                emissive={shape.color}
                emissiveIntensity={2}
                wireframe={shape.wireframe}
                toneMapped={false}
              />
            </Dodecahedron>
          )}
        </Float>
      ))}
    </>
  )
}
