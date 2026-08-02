import { type ReactNode } from 'react'

interface LabelProps {
  children: ReactNode
  color?: 'accent' | 'neon-cyan' | 'neon-purple' | 'text-secondary' | 'warning' | 'accent-hover'
  size?: 'xs' | '2xs'
  className?: string
}

const COLOR_MAP: Record<NonNullable<LabelProps['color']>, string> = {
  accent: 'text-accent',
  'neon-cyan': 'text-neon-cyan',
  'neon-purple': 'text-neon-purple',
  'text-secondary': 'text-text-secondary',
  warning: 'text-warning',
  'accent-hover': 'text-accent-hover',
}

const SIZE_MAP: Record<NonNullable<LabelProps['size']>, string> = {
  xs: 'text-xs tracking-wider',
  '2xs': 'text-[10px] tracking-widest',
}

export default function Label({
  children,
  color = 'accent',
  size = 'xs',
  className = '',
}: LabelProps) {
  return (
    <p className={`font-mono uppercase ${SIZE_MAP[size]} ${COLOR_MAP[color]} ${className}`}>
      {children}
    </p>
  )
}
