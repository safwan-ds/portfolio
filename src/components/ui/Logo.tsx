import { PALETTE } from '../../utils/constants'
import LogoSvg from '/public/images/logo.svg?react'

interface LogoProps {
  className?: string
  color?: string
  style?: React.CSSProperties
}

export default function Logo({ className, color = PALETTE.neonBlue, style }: LogoProps) {
  return <LogoSvg className={className} fill={color} style={style} />
}
