import { type ReactNode } from 'react'

interface NeonButtonProps {
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  disabled?: boolean
  /** When true, fills the background instead of transparent */
  solid?: boolean
  type?: 'button' | 'submit'
}

const BASE =
  'inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm text-neon-blue transition-all'
const OUTLINE = 'border border-neon-blue/40 hover:bg-neon-blue/10 hover:border-neon-blue/60'
const SOLID = 'bg-neon-blue/10 border border-neon-blue/40 hover:bg-neon-blue/20'

export default function NeonButton({
  href,
  target,
  rel,
  onClick,
  children,
  className = '',
  disabled = false,
  solid = false,
  type = 'button',
}: NeonButtonProps) {
  const cls = `${BASE} ${solid ? SOLID : OUTLINE} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cls}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
    >
      {children}
    </button>
  )
}
