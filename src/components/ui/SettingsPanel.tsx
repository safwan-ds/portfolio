import { AnimatePresence, motion } from 'framer-motion'
import { useSettingsCtx } from './SettingsContext'
import type { EffectsMode, Scene3dMode } from '../../hooks/useSettings'

const EFFECTS_OPTIONS: readonly EffectsMode[] = ['low', 'adaptive', 'high']
const SCENE3D_OPTIONS: readonly Scene3dMode[] = ['off', 'adaptive', 'on']

const EFFECTS_LABELS: Record<EffectsMode, string> = {
  low: 'Low',
  adaptive: 'Auto',
  high: 'High',
}

const SCENE3D_LABELS: Record<Scene3dMode, string> = {
  off: 'Off',
  adaptive: 'Auto',
  on: 'On',
}

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
}

export default function SettingsPanel({ open }: SettingsPanelProps) {
  const { effects, scene3d, setEffects, setScene3d } = useSettingsCtx()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 mt-1 w-56 rounded-xl bg-carbon/90 backdrop-blur-xl border border-slate/30 shadow-lg overflow-hidden z-50"
          style={{ maxWidth: 'calc(100vw - 1rem)' }}
        >
          <div className="px-3 py-3 space-y-3">
            <SegmentedControl
              label="Effects"
              value={effects}
              options={EFFECTS_OPTIONS}
              labels={EFFECTS_LABELS}
              disabled={scene3d === 'off'}
              onChange={setEffects}
            />
            <SegmentedControl
              label="3D Scene"
              value={scene3d}
              options={SCENE3D_OPTIONS}
              labels={SCENE3D_LABELS}
              onChange={setScene3d}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
