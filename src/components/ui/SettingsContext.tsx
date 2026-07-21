import { createContext, useContext } from 'react'
import type { EffectsMode, Scene3dMode } from '../../hooks/useSettings'

interface SettingsCtx {
  effects: EffectsMode
  scene3d: Scene3dMode
  setEffects: (v: EffectsMode) => void
  setScene3d: (v: Scene3dMode) => void
  cycleEffects: () => void
  cycleScene3d: () => void
}

export const SettingsCtx = createContext<SettingsCtx | null>(null)

export function useSettingsCtx() {
  const ctx = useContext(SettingsCtx)
  if (!ctx) throw new Error('useSettingsCtx must be used within <SettingsCtx.Provider>')
  return ctx
}
