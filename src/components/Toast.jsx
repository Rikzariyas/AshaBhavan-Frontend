import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X, AlertCircle, Info } from 'lucide-react'

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const toastColors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const iconColors = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600',
}

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = toastIcons[toast.type] || toastIcons.info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              className={`min-w-[300px] max-w-md rounded-lg border shadow-lg p-4 flex items-start space-x-3 ${toastColors[toast.type]}`}
            >
              <Icon className={`flex-shrink-0 ${iconColors[toast.type]}`} size={20} />
              <div className="flex-1">
                <p className="font-medium text-sm">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <X size={16} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Toast hook for easy usage
export function useToast() {
  const showToast = (message, type = 'info', duration = 6000) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type, duration }

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent('show-toast', {
        detail: toast,
      })
    )

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('remove-toast', {
            detail: { id },
          })
        )
      }, duration)
    }

    return id
  }

  return {
    showSuccess: (message, duration) => showToast(message, 'success', duration),
    showError: (message, duration) => showToast(message, 'error', duration),
    showWarning: (message, duration) => showToast(message, 'warning', duration),
    showInfo: (message, duration) => showToast(message, 'info', duration),
  }
}

