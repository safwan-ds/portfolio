/**
 * SceneParallax — tilts the entire 3D scene based on cursor position (desktop)
 * or device gyroscope (mobile). Uses window-level listeners so parallax works
 * everywhere on the page (over cards, sections, navbar — not just the canvas).
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'

const MAX_TILT = 0.12
const LERP = 0.04
const GYRO_SENSITIVITY = 15

const input = { x: 0, y: 0 }
let gyroAvailable = false
let initialBeta: number | null = null
let initialGamma: number | null = null

function onOrientation(e: DeviceOrientationEvent) {
  if (e.beta === null || e.gamma === null) return

  if (initialBeta === null || initialGamma === null) {
    initialBeta = e.beta
    initialGamma = e.gamma
    return
  }

  gyroAvailable = true
  input.x = THREE.MathUtils.clamp((e.gamma - initialGamma) / GYRO_SENSITIVITY, -1, 1)
  input.y = THREE.MathUtils.clamp((e.beta - initialBeta) / GYRO_SENSITIVITY, -1, 1)
}

function startSensors() {
  window.addEventListener('deviceorientation', onOrientation, { passive: true })
  window.addEventListener('deviceorientationabsolute', onOrientation, { passive: true })
}

if (typeof window !== 'undefined') {
  window.addEventListener(
    'mousemove',
    (e: MouseEvent) => {
      if (gyroAvailable) return
      input.x = (e.clientX / window.innerWidth) * 2 - 1
      input.y = -(e.clientY / window.innerHeight) * 2 + 1
    },
    { passive: true },
  )

  // Chrome may require a user gesture before firing deviceorientation
  document.addEventListener('click', startSensors, { once: true, passive: true })
  document.addEventListener('touchend', startSensors, { once: true, passive: true })
  // Also try immediately (works without gesture on most browsers over HTTPS)
  startSensors()
}

export default function SceneParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null)
  const targetRot = useRef(new THREE.Euler(0, 0, 0))

  useFrame(() => {
    const group = groupRef.current
    if (!group) return
    targetRot.current.y = input.x * MAX_TILT
    targetRot.current.x = input.y * MAX_TILT * 0.6
    group.rotation.x += (targetRot.current.x - group.rotation.x) * LERP
    group.rotation.y += (targetRot.current.y - group.rotation.y) * LERP
  })

  return <group ref={groupRef}>{children}</group>
}
