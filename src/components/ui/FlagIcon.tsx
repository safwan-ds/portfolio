/**
 * FlagIcon — pixel-perfect vector flags via the flag-icons CSS package.
 * Uses country code classes (fi fi-gb, fi fi-sa, fi fi-tr).
 */

import 'flag-icons/css/flag-icons.min.css'

interface FlagIconProps {
  lang: 'arabic' | 'english' | 'turkish'
  className?: string
}

const COUNTRY_CODE: Record<string, string> = {
  arabic: 'sa',
  english: 'gb',
  turkish: 'tr',
}

export default function FlagIcon({ lang, className = 'w-5 h-5' }: FlagIconProps) {
  return (
    <span
      className={`fi fi-${COUNTRY_CODE[lang]} inline-flex items-center justify-center rounded-sm ${className}`}
    />
  )
}
