/**
 * Scene — the 3D canvas root.
 *
 * Sets up the R3F Canvas with camera, lighting, environment, shadows,
 * and post-processing. Composes all 3D layers:
 * - DeskSetup (literal): GLTF desk + computer + chair
 * - FloatingShapes (abstract): geometric neon shapes
 * - NeonRings (abstract): orbiting glowing rings
 * - CircuitParticles (abstract): circuit-board particle field
 * - WaveParticles (abstract): wave-motion particle field
 *
 * Post-processing: Bloom (neon glow), Vignette (cinematic edges),
 * ChromaticAberration (subtle lens effect).
 */

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Environment, PerformanceMonitor } from '@react-three/drei'
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

import type { EffectsMode } from '../../hooks/useSettings'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import Lighting from './Lighting'
import DeskSetup from './DeskSetup'
import FloatingShapes from './FloatingShapes'
import NeonRings from './NeonRings'
import CircuitParticles from './CircuitParticles'
import WaveParticles from './WaveParticles'
import ScrollCamera from './ScrollCamera'
import SceneParallax from './SceneParallax'
import {
  BLOOM_CONFIG,
  CAMERA_CONFIG,
  CHROMATIC_ABERRATION_OFFSET,
  FOG_COLOR,
  VIGNETTE_CONFIG,
} from '../../utils/constants'

interface SceneProps {
  effects: EffectsMode
}

export default function Scene({ effects }: SceneProps) {
  const { isMobile, isReduced } = useDeviceTier()
  const [fpsReduced, setFpsReduced] = useState(isReduced)

  const effectiveReduced = effects === 'low' ? true : effects === 'high' ? false : fpsReduced

  return (
    <Canvas
      shadows={!isReduced}
      gl={{
        antialias: true,
        alpha: true,
        premultipliedAlpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      onCreated={({ gl, scene }) => {
        gl.shadowMap.type = THREE.VSMShadowMap
        gl.setClearColor(0x000000, 0)
        scene.background = null
      }}
      camera={{
        position: isMobile
          ? ([0, 2.5, -17] as [number, number, number])
          : ([0, 2.5, -14] as [number, number, number]),
        fov: CAMERA_CONFIG.fov,
        near: CAMERA_CONFIG.near,
        far: CAMERA_CONFIG.far,
      }}
      dpr={[1, 2]}
    >
      {/* Fog + background: transparent canvas when reduced, opaque void when effects are high */}
      {effectiveReduced ? (
        <>
          <fog attach="fog" args={['#1a1028', 5, 20]} />
          <mesh position={[0, 0, -12]}>
            <planeGeometry args={[80, 60]} />
            <meshBasicMaterial color="#14101e" transparent opacity={0.8} />
          </mesh>
        </>
      ) : (
        <>
          <color attach="background" args={[FOG_COLOR]} />
          <fog attach="fog" args={[FOG_COLOR, 8, 25]} />
        </>
      )}

      <Suspense fallback={null}>
        <ScrollCamera />
        <SceneParallax>
          <Lighting />
          <DeskSetup />
          <FloatingShapes />
          <NeonRings />
          <CircuitParticles />
          <WaveParticles />

          <Environment preset="night" />
        </SceneParallax>
      </Suspense>

      {/* Post-processing pipeline — adaptive: starts at heuristic level, FPS/user can override */}
      {!effectiveReduced && (
        <EffectComposer>
          <Bloom
            intensity={BLOOM_CONFIG.intensity}
            luminanceThreshold={BLOOM_CONFIG.luminanceThreshold}
            luminanceSmoothing={BLOOM_CONFIG.luminanceSmoothing}
            mipmapBlur={BLOOM_CONFIG.mipmapBlur}
          />
          <Vignette
            offset={VIGNETTE_CONFIG.offset}
            darkness={VIGNETTE_CONFIG.darkness}
            blendFunction={BlendFunction.NORMAL}
          />
          <ChromaticAberration
            offset={CHROMATIC_ABERRATION_OFFSET}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      )}

      {/* Adaptive effects — FPS-driven when in adaptive mode */}
      <PerformanceMonitor
        bounds={() => [60, 60]}
        onDecline={() => {
          if (effects === 'adaptive') setFpsReduced(true)
        }}
        onIncline={() => {
          if (effects === 'adaptive') setFpsReduced(false)
        }}
      >
        <AdaptiveDpr pixelated />
      </PerformanceMonitor>
    </Canvas>
  )
}
