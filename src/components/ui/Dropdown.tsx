import { type ReactNode, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useRtl } from '../../hooks/useRtl'

const DROPDOWN_PANEL =
  'absolute mt-1 rounded-xl bg-carbon/90 backdrop-blur-xl border border-slate/30 shadow-lg overflow-hidden z-50'

const ANIMATION = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
}

interface DropdownProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  width?: string
}

export default function Dropdown({
  open,
  onClose,
  children,
  className = '',
  width = 'w-56',
}: DropdownProps) {
  const isRtl = useRtl()
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, onClose, open)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          {...ANIMATION}
          transition={{ duration: 0.15 }}
          className={`${DROPDOWN_PANEL} ${width} ${className}`}
          style={{
            left: isRtl ? '0px' : 'auto',
            right: isRtl ? 'auto' : '0px',
            maxWidth: 'calc(100vw - 1rem)',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { DROPDOWN_PANEL }
