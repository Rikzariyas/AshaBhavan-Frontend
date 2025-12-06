import { motion } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'

export default function DeleteModal({
  show,
  item,
  deleting,
  onConfirm,
  onCancel,
  getCategoryLabel,
}) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Delete Gallery Item</h3>
          <button
            onClick={onCancel}
            disabled={deleting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this gallery item? This action cannot be undone.
          </p>
          {item && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.url || item.thumbnail || '/images/placeholder.jpg'}
                  alt={item.title || 'Gallery image'}
                  className="w-20 h-20 object-cover rounded"
                  onError={e => {
                    e.target.src = '/images/placeholder.jpg'
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.title || 'Untitled'}</p>
                  <p className="text-sm text-gray-500">
                    Category: {getCategoryLabel(item.category)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {deleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

