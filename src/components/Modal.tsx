import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Modal({
  open,
  onClose,
  children,
  width = 'max-w-md',
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  width?: string
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${width} bg-surface border border-border rounded-2xl shadow-2xl p-6`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
