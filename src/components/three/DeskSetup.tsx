/**
 * DeskSetup — the literal 3D layer.
 *
 * Loads three GLTF models (desk, desktop computer, office chair) and
 * composes them into a workstation scene. Each model is positioned,
 * scaled, and rotated to form a cohesive desk arrangement.
 *
 * Models are from Poly Pizza (CC-BY):
 * - Computer Desk by Zsky (396 triangles)
 * - Desktop computer by Poly by Google (1.5k triangles)
 * - Office Chair (CC-BY)
 *
 * The computer model's screen mesh gets an emissive material override
 * so bloom picks it up and it glows like a real monitor.
 */

import { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh, Group } from 'three'
import { MODEL_PATHS } from '../../utils/constants'

/** Scale + transform for each model — tuned by eye in the scene. */
interface ModelPlacement {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const COMPUTER_PLACEMENT: ModelPlacement = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: 0.6,
}


/**
 * Traverses a GLTF scene and overrides screen/monitor meshes with
 * an emissive material so they glow under bloom post-processing.
 */
function applyEmissiveScreen(scene: Group): void {
  scene.traverse((child) => {
    const mesh = child as Mesh
    if (!mesh.isMesh) return

    const name = mesh.name.toLowerCase()
    const isScreen = name.includes('screen') || name.includes('monitor') || name.includes('display')

    if (isScreen && !Array.isArray(mesh.material)) {
      mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone()
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissive = new THREE.Color(0, 1.7, 3.0)
      mat.emissiveIntensity = 1.5
      mat.toneMapped = false
    }
  })
}

function GLTFModel({
  path,
  placement,
  onScreenOverride,
  innerRef,
}: {
  path: string
  placement: ModelPlacement
  onScreenOverride?: (scene: Group) => void
  innerRef?: React.RefObject<Group | null>
}) {
  const { scene } = useGLTF(path)

  // Clone the scene so multiple instances don't share materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    if (onScreenOverride) {
      onScreenOverride(clone)
    }
    return clone
  }, [scene, onScreenOverride])

  return (
    <primitive
      ref={innerRef}
      object={clonedScene}
      position={placement.position}
      rotation={placement.rotation}
      scale={placement.scale}
      castShadow
      receiveShadow
    />
  )
}

export default function DeskSetup() {
  const monitorRef = useRef<Group>(null)

  useFrame(() => {
    if (!monitorRef.current) return
    const scrollY = window.scrollY
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const t = Math.max(0, Math.min(1, scrollY / maxScroll))

    let targetX = COMPUTER_PLACEMENT.rotation[0]
    let targetY = COMPUTER_PLACEMENT.rotation[1]

    if (t < 0.25) {
      const p = t / 0.25
      targetY = THREE.MathUtils.lerp(0, -0.6, p)
      targetX = THREE.MathUtils.lerp(0, 0.15, p)
    } else if (t < 0.5) {
      const p = (t - 0.25) / 0.25
      targetY = THREE.MathUtils.lerp(-0.6, 0, p)
      targetX = THREE.MathUtils.lerp(0.15, -0.4, p)
    } else if (t < 0.75) {
      const p = (t - 0.5) / 0.25
      targetY = THREE.MathUtils.lerp(0, 0.6, p)
      targetX = THREE.MathUtils.lerp(-0.4, 0.15, p)
    } else {
      const p = (t - 0.75) / 0.25
      targetY = THREE.MathUtils.lerp(0.6, 0, p)
      targetX = THREE.MathUtils.lerp(0.15, 0.05, p)
    }

    monitorRef.current.rotation.y = THREE.MathUtils.lerp(monitorRef.current.rotation.y, targetY, 0.08)
    monitorRef.current.rotation.x = THREE.MathUtils.lerp(monitorRef.current.rotation.x, targetX, 0.08)
  })

  return (
    <group>
      <GLTFModel
        path={MODEL_PATHS.computer}
        placement={COMPUTER_PLACEMENT}
        onScreenOverride={applyEmissiveScreen}
        innerRef={monitorRef}
      />
    </group>
  )
}

// Preload all models for faster initial render
useGLTF.preload(MODEL_PATHS.computer)
