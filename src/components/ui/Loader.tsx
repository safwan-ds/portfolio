/**
 * Loader — 3D-aware loading screen with progress bar.
 * Uses drei's useProgress to track GLTF model loading progress.
 */

import { useProgress } from '@react-three/drei'
import ProgressBar from './ProgressBar'
import Spinner from './Spinner'

interface LoaderProps {
  message?: string
}

export default function Loader({ message = 'Loading 3D scene...' }: LoaderProps) {
  const { progress, errors, item } = useProgress()
  const percent = Math.round(progress)
  const hasErrors = errors.length > 0

  return (
    <div className="flex h-full flex-col items-center justify-center bg-void">
      <div className="text-center space-y-5 px-4">
        <Spinner size="w-12 h-12" />

        <div className="w-48 sm:w-64">
          <div className="flex justify-between mb-1.5">
            <p className="font-mono text-xs text-text-secondary">{message}</p>
            <p className="font-mono text-xs text-neon-blue">{percent}%</p>
          </div>
          <ProgressBar percent={percent} />
        </div>

        {item && (
          <p className="font-mono text-[11px] text-text-secondary/40 truncate max-w-xs">
            {decodeURIComponent(item.split('/').pop() || item)}
          </p>
        )}
      </div>

      {hasErrors && (
        <div className="text-center mt-4">
          <p className="font-mono text-xs text-neon-pink">Failed to load some assets</p>
          <p className="font-mono text-[11px] text-text-secondary/40 mt-1">
            The scene may appear incomplete
          </p>
        </div>
      )}
    </div>
  )
}
