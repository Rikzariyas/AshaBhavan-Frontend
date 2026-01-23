import { motion } from 'framer-motion'
import { Edit, Trash2, Calendar, UserPlus } from 'lucide-react'

export default function StudentCard({ student, onEdit, onDelete, index }) {
  const formatDate = dateString => {
    // If date is already formatted as DD/MM/YYYY, return as is
    if (dateString && dateString.includes('/')) {
      return dateString
    }
    // Otherwise, parse and format
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={student.avatar || student.photo || '/images/placeholder.jpg'}
          alt={student.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => {
            e.target.src = '/images/placeholder.jpg'
          }}
        />
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            #{index + 1}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-3 truncate text-lg">{student.name}</h3>
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="mr-2 text-blue-600" size={16} />
            <span className="font-medium">DOB:</span>
            <span className="ml-2">{formatDate(student.dob || student.dateOfBirth)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="font-medium ml-6">Age:</span>
            <span className="ml-2">{student.age || 0} years</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UserPlus className="mr-2 text-green-600" size={16} />
            <span className="font-medium">Joined:</span>
            <span className="ml-2">{formatDate(student.joiningDate)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(student)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(student)}
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
