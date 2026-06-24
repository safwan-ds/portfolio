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

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  AdaptiveDpr,
  PerformanceMonitor,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

import Lighting from './Lighting'
import DeskSetup from './DeskSetup'
import FloatingShapes from './FloatingShapes'
import NeonRings from './NeonRings'
import CircuitParticles from './CircuitParticles'
import WaveParticles from './WaveParticles'
import ScrollCamera from './ScrollCamera'
import SceneParallax from './SceneParallax'
import {
  CAMERA_CONFIG,
  BLOOM_CONFIG,
  VIGNETTE_CONFIG,
  CHROMATIC_ABERRATION_OFFSET,
  FOG_COLOR,
} from '../../utils/constants'

export default function Scene() {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      onCreated={({ gl }) => {
        // three 0.184 deprecated PCFSoftShadowMap; use VSMShadowMap instead
        gl.shadowMap.type = THREE.VSMShadowMap
      }}
      camera={{
        position: CAMERA_CONFIG.position,
        fov: CAMERA_CONFIG.fov,
        near: CAMERA_CONFIG.near,
        far: CAMERA_CONFIG.far,
      }}
      dpr={[1, 2]}
    >
      {/* Fog for depth — dark void background */}
      <fog attach="fog" args={[FOG_COLOR, 8, 25]} />

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

      {/* Post-processing pipeline */}
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


      {/* Adaptive quality — scales DPR based on GPU performance */}
      <PerformanceMonitor>
        <AdaptiveDpr pixelated />
      </PerformanceMonitor>
    </Canvas>
  )
}
