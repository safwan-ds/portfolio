import { useTranslation } from 'react-i18next'
import { useSettingsCtx } from './SettingsContext'
import type { EffectsMode, Scene3dMode } from '../../hooks/useSettings'
import Dropdown from './Dropdown'

const EFFECTS_OPTIONS: readonly EffectsMode[] = ['low', 'adaptive', 'high']
const SCENE3D_OPTIONS: readonly Scene3dMode[] = ['off', 'adaptive', 'on']

function SegmentedControl<T extends string>({
  label,
  value,
  options,
  labels,
  disabled,
  onChange,
}: {
  label: string
  value: T
  options: readonly T[]
  labels: Record<T, string>
  disabled?: boolean
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className={`font-mono text-[10px] tracking-widest uppercase ${
          disabled ? 'text-slate-600' : 'text-slate-400'
        }`}
      >
        {label}
      </span>
      <div
        className={`flex rounded-lg bg-slate/20 border border-slate/30 p-0.5 gap-0.5 ${
          disabled ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 px-2 py-1 rounded-md font-mono text-[11px] tracking-wider uppercase transition-all ${
              value === opt
                ? 'bg-neon-blue/20 text-neon-blue shadow-[0_0_8px_rgba(0,212,255,0.2)]'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {labels[opt]}
          </button>
        ))}
      </div>
    </div>
  )
}

interface SettingsPanelProps {
  open: boolean
  onClose: () => void
}

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const { effects, scene3d, setEffects, setScene3d } = useSettingsCtx()
  const { t } = useTranslation()

  const EFFECTS_LABELS: Record<EffectsMode, string> = {
    low: t('settings.effects_levels.low'),
    adaptive: t('settings.effects_levels.adaptive'),
    high: t('settings.effects_levels.high'),
  }

  const SCENE3D_LABELS: Record<Scene3dMode, string> = {
    off: t('settings.3d_scene_levels.off'),
    adaptive: t('settings.3d_scene_levels.adaptive'),
    on: t('settings.3d_scene_levels.on'),
  }

  return (
    <Dropdown open={open} onClose={onClose}>
      <div className="px-3 py-3 space-y-3">
        <SegmentedControl
          label={t('settings.effects')}
          value={effects}
          options={EFFECTS_OPTIONS}
          labels={EFFECTS_LABELS}
          disabled={scene3d === 'off'}
          onChange={setEffects}
        />
        <SegmentedControl
          label={t('settings.3d_scene')}
          value={scene3d}
          options={SCENE3D_OPTIONS}
          labels={SCENE3D_LABELS}
          onChange={setScene3d}
        />
      </div>
    </Dropdown>
  )
}
