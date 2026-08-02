import { type ReactNode, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useRtl } from '../../hooks/useRtl'
import GlassSurface from './GlassSurface'

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
  glassSurface?: boolean
}

export default function Dropdown({
  open,
  onClose,
  children,
  className = '',
  width = 'w-56',
  glassSurface = false,
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
          className={`${
            glassSurface ? 'absolute mt-1 z-50' : DROPDOWN_PANEL
          } ${width} ${className}`}
          style={
            glassSurface
              ? {
                  left: isRtl ? '0px' : 'auto',
                  right: isRtl ? 'auto' : '0px',
                  maxWidth: 'calc(100vw - 1rem)',
                }
              : {
                  left: isRtl ? '0px' : 'auto',
                  right: isRtl ? 'auto' : '0px',
                  maxWidth: 'calc(100vw - 1rem)',
                }
          }
        >
          {glassSurface ? (
            <GlassSurface
              width="100%"
              borderRadius={12}
              borderWidth={0.04}
              brightness={50}
              opacity={0.92}
              blur={10}
              backgroundOpacity={0.08}
              saturation={1.3}
              distortionScale={-100}
              redOffset={2}
              greenOffset={6}
              blueOffset={12}
              mixBlendMode="overlay"
              style={{ minHeight: 0 }}
            >
              {children}
            </GlassSurface>
          ) : (
            children
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { DROPDOWN_PANEL }
