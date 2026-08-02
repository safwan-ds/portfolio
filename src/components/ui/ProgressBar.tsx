interface ProgressBarProps {
  percent: number
  height?: string
  color?: string
  className?: string
}

export default function ProgressBar({
  percent,
  height = 'h-1.5',
  color = 'bg-linear-to-r from-accent to-neon-purple',
  className = '',
}: ProgressBarProps) {
  const w = `${Math.min(100, Math.max(0, percent))}%`

  return (
    <div className={`${height} rounded-full bg-slate/30 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ease-out ${color}`}
        style={{ width: w }}
      />
    </div>
  )
}
