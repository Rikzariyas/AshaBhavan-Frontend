import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'

export default function GalleryCard({ item, onEdit, onDelete, getCategoryLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={item.url || item.thumbnail || '/images/placeholder.jpg'}
          alt={item.title || 'Gallery image'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => {
            e.target.src = '/images/placeholder.jpg'
          }}
        />
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            {getCategoryLabel(item.category)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-3 truncate text-lg">
          {item.title || 'Untitled'}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(item)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

