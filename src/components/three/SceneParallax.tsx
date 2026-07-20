/**
 * SceneParallax — tilts the entire 3D scene based on cursor position.
 * Uses a window-level mousemove listener so parallax works everywhere
 * on the page (over cards, sections, navbar — not just the canvas).
 */

import {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import type {Group} from 'three'
import * as THREE from 'three'

const MAX_TILT = 0.12
const LERP = 0.04

/** Shared ref for mouse position — updated by window listener. */
const mousePos = { x: 0, y: 0 }

// Single global listener — safe because this module runs once
if (typeof window !== 'undefined') {
    window.addEventListener(
        'mousemove',
        (e: MouseEvent) => {
            // Normalize to -1..1 relative to viewport center
            mousePos.x = (e.clientX / window.innerWidth) * 2 - 1
            mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1
        },
        {passive: true},
    )
}

export default function SceneParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null)
  const targetRot = useRef(new THREE.Euler(0, 0, 0))

  useFrame(() => {
    if (!groupRef.current) return
    targetRot.current.y = mousePos.x * MAX_TILT
    targetRot.current.x = mousePos.y * MAX_TILT * 0.6
    groupRef.current.rotation.x += (targetRot.current.x - groupRef.current.rotation.x) * LERP
    groupRef.current.rotation.y += (targetRot.current.y - groupRef.current.rotation.y) * LERP
  })

  return <group ref={groupRef}>{children}</group>
}
