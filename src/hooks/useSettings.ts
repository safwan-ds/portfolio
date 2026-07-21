import { useCallback, useEffect, useState } from 'react'

export type EffectsMode = 'low' | 'adaptive' | 'high'
export type Scene3dMode = 'off' | 'adaptive' | 'on'

const STORAGE_KEYS = {
  effects: 'portfolio_settings_effects',
  scene3d: 'portfolio_settings_scene3d',
} as const

function readSetting<T extends string>(key: string, fallback: T, valid: readonly T[]): T {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = localStorage.getItem(key)
    if (valid.includes(stored as T)) return stored as T
  } catch {
    /* ignore */
  }
  return fallback
}

function usePersistedSetting<T extends string>(key: string, fallback: T, valid: readonly T[]) {
  const [value, setValue] = useState<T>(() => readSetting(key, fallback, valid))

  useEffect(() => {
    try {
      localStorage.setItem(key, value)
    } catch {
      /* ignore */
    }
  }, [key, value])

  return [value, setValue] as const
}

const EFFECTS_OPTIONS = ['low', 'adaptive', 'high'] as const
const SCENE3D_OPTIONS = ['off', 'adaptive', 'on'] as const

export function useSettings() {
  const [effects, setEffects] = usePersistedSetting<EffectsMode>(
    STORAGE_KEYS.effects,
    'adaptive',
    EFFECTS_OPTIONS,
  )
  const [scene3d, setScene3d] = usePersistedSetting<Scene3dMode>(
    STORAGE_KEYS.scene3d,
    'adaptive',
    SCENE3D_OPTIONS,
  )

  const cycle = useCallback(<T extends string>(current: T, options: readonly T[]): T => {
    const idx = options.indexOf(current)
    return options[(idx + 1) % options.length]
  }, [])

  return {
    effects,
    scene3d,
    setEffects,
    setScene3d,
    cycleEffects: () => setEffects((e) => cycle(e, EFFECTS_OPTIONS)),
    cycleScene3d: () => setScene3d((s) => cycle(s, SCENE3D_OPTIONS)),
  }
}
