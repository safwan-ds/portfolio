import { cssColor } from '../../utils/constants'
import LogoSvg from '../../images/logo.svg?react'

interface LogoProps {
  className?: string
  color?: string
  style?: React.CSSProperties
}

export default function Logo({ className, color, style }: LogoProps) {
  return <LogoSvg className={className} fill={color ?? cssColor('neonBlue')} style={style} />
}
