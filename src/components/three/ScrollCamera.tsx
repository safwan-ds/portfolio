/**
 * ScrollCamera — maps page scroll to camera position/lookAt via GSAP ScrollTrigger.
 *
 * Five camera keyframes define a path the camera follows as the user scrolls.
 * OrbitControls remain active for manual interaction — scrolling smoothly
 * moves the camera through the keyframe path. Uses lerp for smooth following.
 */

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { useDeviceTier } from '../../hooks/useDeviceTier'

gsap.registerPlugin(ScrollTrigger)

/** CatmullRom spline through the keyframes for smooth camera path (desktop). */
const DESKTOP_CAMERA_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 2.5, -14), // 0%   Hero — front of model
    new THREE.Vector3(5, 2, -11), // 25%  About — right-front
    new THREE.Vector3(0, 5, -10), // 50%  Skills — top-down front
    new THREE.Vector3(-5, 2.5, -11), // 75%  Projects — left-front
    new THREE.Vector3(0, 1.5, -9), // 100% Contact — close front
  ],
  false,
  'catmullrom',
  0.5,
)

/** Mobile curve — camera pulled farther back (z pushed -3) to fit narrower viewport. */
const MOBILE_CAMERA_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 2.5, -17), // 0%   Hero
    new THREE.Vector3(4, 2, -14), // 25%  About
    new THREE.Vector3(0, 5, -13), // 50%  Skills
    new THREE.Vector3(-4, 2.5, -14), // 75%  Projects
    new THREE.Vector3(0, 1.5, -12), // 100% Contact
  ],
  false,
  'catmullrom',
  0.5,
)

/** Look-at targets corresponding to each keyframe (desk center area). */
const LOOK_TARGETS: THREE.Vector3[] = [
  new THREE.Vector3(0, 1.2, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 1.5, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 1.2, 0),
]

const LERP_FACTOR = 0.04 // Smoothness: lower = smoother but slower to follow

export default function ScrollCamera() {
  const camera = useThree((s) => s.camera)
  const controls = useThree((s) => s.controls as { autoRotate?: boolean } | null)
  const { isMobile } = useDeviceTier()

  const cameraCurve = isMobile ? MOBILE_CAMERA_CURVE : DESKTOP_CAMERA_CURVE

  // Shared ref for scroll progress (0..1), updated by ScrollTrigger
  const progressRef = useRef(0)

  const lookAtTarget = useMemo(() => new THREE.Vector3(0, 2.0, 0), [])
  const camTarget = useMemo(() => new THREE.Vector3(), [])

  // GSAP ScrollTrigger setup
  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    // Disable autoRotate so scroll camera takes over rotation
    // eslint-disable-next-line react-hooks/immutability
    if (controls) controls.autoRotate = false

    const obj = { progress: 0 }

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5, // smooth scrubbing
      onUpdate: (self) => {
        obj.progress = self.progress
        progressRef.current = self.progress
      },
    })

    // Also update on refresh (resize, dynamic content)
    st.refresh()

    return () => {
      if (controls) controls.autoRotate = true
      st.kill()
    }
  }, [controls])

  // Smooth camera follow in the render loop
  useFrame(() => {
    const t = Math.max(0, Math.min(1, progressRef.current))

    // Get target position from the curve
    const targetPos = cameraCurve.getPointAt(t)

    // Get target lookAt by interpolating between keyframe look-at targets
    const keyCount = LOOK_TARGETS.length
    const segment = t * (keyCount - 1)
    const idx = Math.floor(segment)
    const frac = segment - idx
    const a = LOOK_TARGETS[Math.min(idx, keyCount - 1)]
    const b = LOOK_TARGETS[Math.min(idx + 1, keyCount - 1)]
    lookAtTarget.lerpVectors(a, b, frac)

    // Smooth lerp camera position toward target
    camera.position.lerp(targetPos, LERP_FACTOR)

    // Smooth lookAt (just lerp toward the spline's look target directly)
    camTarget.lerp(lookAtTarget, 0.1)
    camera.lookAt(camTarget)
  })

  return null
}
