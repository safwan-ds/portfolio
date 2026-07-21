import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl bg-carbon/80 border border-slate/20 p-6 transition-colors duration-300 hover:border-slate/40 hover:bg-carbon/90 will-change-[opacity] ${className}`}
    >
      {children}
    </div>
  )
}
