/**
 * DeskSetup — the literal 3D layer.
 *
 * Loads the laptop GLTF model (Legend 5 by churliaevyaroslav, CC BY 4.0),
 * positioned, scaled, and rotated to form the centerpiece.
 *
 * The screen mesh gets an emissive material override so bloom
 * picks it up and it glows like a real monitor.
 */

import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { Mesh, Group } from 'three'
import { MODEL_PATHS } from '../../utils/constants'

/** Scale + transform for the model — tuned by eye in the scene. */
interface ModelPlacement {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const COMPUTER_PLACEMENT: ModelPlacement = {
  position: [0.75, 0.5, -2],
  rotation: [-Math.PI / 6, 0, 0],
  scale: 0.175,
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
    const isScreen = name.includes('display_display')

    if (isScreen && !Array.isArray(mesh.material)) {
      mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone()
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissive = new THREE.Color(0, 1.7, 3.0)
      mat.emissiveIntensity = 1.0
      mat.toneMapped = false
    }
  })
}

export default function DeskSetup() {
  const { scene } = useGLTF(MODEL_PATHS.computer)

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    applyEmissiveScreen(clone)
    return clone
  }, [scene])

  return (
    <primitive
      object={clonedScene}
      position={COMPUTER_PLACEMENT.position}
      rotation={COMPUTER_PLACEMENT.rotation}
      scale={COMPUTER_PLACEMENT.scale}
      castShadow
      receiveShadow
    />
  )
}

// Preload for faster initial render
useGLTF.preload(MODEL_PATHS.computer)
