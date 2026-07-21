/**
 * Lighting rig for the 3D scene.
 *
 * Three-point cinematic lighting + neon accent lights.
 * - Key: warm spotlight (simulates desk lamp)
 * - Fill: cool directional light (fills shadows)
 * - Rim: neon purple point light (backlight rim glow)
 * - Accents: blue and cyan point lights near abstract elements
 */

import { EMISSIVE_COLORS, NEON_COLORS, WARM_LIGHT } from '../../utils/constants'

export default function Lighting() {
  return (
    <>
      {/* Key light — warm spotlight from above-right (desk lamp direction) */}
      <spotLight
        position={[3, 6, 3]}
        angle={0.5}
        penumbra={0.8}
        intensity={2.5}
        color={WARM_LIGHT}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Fill light — cool blue directional from the left */}
      <directionalLight position={[-5, 4, 2]} intensity={0.6} color={NEON_COLORS.blue} />

      {/* Rim light — purple from behind for edge glow */}
      <pointLight
        position={[0, 3, -4]}
        intensity={3}
        color={EMISSIVE_COLORS.purple}
        distance={15}
      />

      {/* Accent lights — positioned near abstract elements */}
      <pointLight position={[4, 2, 1]} intensity={2} color={EMISSIVE_COLORS.blue} distance={10} />

      <pointLight position={[-3, 1, 3]} intensity={1.5} color={EMISSIVE_COLORS.cyan} distance={8} />

      {/* Subtle ambient so dark areas aren't fully black */}
      <ambientLight intensity={0.08} color="#1a1a2e" />
    </>
  )
}
