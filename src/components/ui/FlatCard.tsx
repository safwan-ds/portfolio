import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function FlatCard({ children, className = '', style }: GlassCardProps) {
  return (
    <div
      className={`rounded-lg bg-carbon p-6 transition-all duration-300 will-change-[opacity] ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
