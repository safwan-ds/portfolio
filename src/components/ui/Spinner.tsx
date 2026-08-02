interface SpinnerProps {
  size?: string
  className?: string
}

export default function Spinner({ size = 'w-12 h-12', className = '' }: SpinnerProps) {
  return (
    <div
      className={`${size} rounded-full border-2 border-accent/20 border-t-accent animate-spin ${className}`}
    />
  )
}
