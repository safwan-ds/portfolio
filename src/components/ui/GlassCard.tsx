import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-lg bg-carbon p-6 transition-all duration-300 will-change-[opacity] ${className}`}
    >
      {children}
    </div>
  )
}
