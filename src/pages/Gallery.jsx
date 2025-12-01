import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Image as ImageIcon, Video, BookOpen, Camera } from 'lucide-react'
import { useStore } from '../store/useStore'
import { DUMMY_IMAGES, DUMMY_DATA } from '../constants'

export default function Gallery() {
  const { gallery } = useStore()
  // Use store data if available (from API), otherwise use constants
  const displayGallery = gallery || DUMMY_DATA.GALLERY
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'All', icon: Camera },
    { id: 'studentWork', label: 'Student Work', icon: BookOpen },
    { id: 'programs', label: 'Programs', icon: Play },
    { id: 'photos', label: 'Photos', icon: ImageIcon },
    { id: 'videos', label: 'Videos', icon: Video },
  ]

  const allImages = [
    ...displayGallery.studentWork.map(img => ({ src: img, category: 'studentWork' })),
    ...displayGallery.programs.map(img => ({ src: img, category: 'programs' })),
    ...displayGallery.photos.map(img => ({ src: img, category: 'photos' })),
  ]

  const filteredImages =
    activeTab === 'all' ? allImages : allImages.filter(img => img.category === activeTab)

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-xl text-gray-600">Explore our students' work, programs, and events</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Images Grid */}
        {activeTab !== 'videos' && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div
                  key={`${item.category}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(item.src)}
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                >
                  <img
                    src={item.src || DUMMY_IMAGES.PLACEHOLDER}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover"
                    onError={e => {
                      e.target.src = DUMMY_IMAGES.PLACEHOLDER
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ImageIcon
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      size={40}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Videos Section */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {displayGallery.videos.map(video => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="aspect-video">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} className="text-white" />
              </motion.button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-full object-contain"
                onClick={e => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
