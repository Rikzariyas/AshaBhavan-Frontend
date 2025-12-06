import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Image as ImageIcon, BookOpen, Camera, Loader2 } from 'lucide-react'
import { DUMMY_IMAGES, API_BASE_URL } from '../constants'
import axios from 'axios'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const tabs = [
    { id: 'all', label: 'All', icon: Camera },
    { id: 'studentWork', label: 'Student Work', icon: BookOpen },
    { id: 'programs', label: 'Programs', icon: Play },
    { id: 'photos', label: 'Photos', icon: ImageIcon },
  ]

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${API_BASE_URL}/gallery`)
      
      if (response.data.success) {
        // Flatten gallery items from all categories
        const allItems = []
        
        if (response.data.data.studentWork) {
          allItems.push(
            ...response.data.data.studentWork.map(item => ({
              src: item.url || item.thumbnail,
              category: 'studentWork',
              title: item.title || 'Student Work',
              id: item.id,
            }))
          )
        }
        
        if (response.data.data.programs) {
          allItems.push(
            ...response.data.data.programs.map(item => ({
              src: item.url || item.thumbnail,
              category: 'programs',
              title: item.title || 'Program',
              id: item.id,
            }))
          )
        }
        
        if (response.data.data.photos) {
          allItems.push(
            ...response.data.data.photos.map(item => ({
              src: item.url || item.thumbnail,
              category: 'photos',
              title: item.title || 'Photo',
              id: item.id,
            }))
          )
        }
        
        setGalleryItems(allItems)
      }
    } catch (err) {
      console.error('Error fetching gallery items:', err)
      setError('Failed to load gallery items. Please try again later.')
      // Fallback to empty array
      setGalleryItems([])
    } finally {
      setLoading(false)
    }
  }

  const filteredImages =
    activeTab === 'all'
      ? galleryItems
      : galleryItems.filter(img => img.category === activeTab)

  return (
    <div id="gallery" className="min-h-screen">
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="inline-block animate-spin text-blue-600" size={48} />
            <p className="mt-4 text-gray-600 text-lg">Loading gallery items...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
              <p className="font-medium">{error}</p>
              <button
                onClick={fetchGalleryItems}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Images Grid */}
        {!loading && !error && (
          <>
            {filteredImages.length === 0 ? (
              <div className="text-center py-16">
                <ImageIcon className="inline-block text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 text-lg">
                  No images found in {tabs.find(t => t.id === activeTab)?.label || 'this category'}.
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              >
                <AnimatePresence mode="wait">
                  {filteredImages.map((item, index) => (
                    <motion.div
                      key={item.id || `${item.category}-${index}`}
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
                        alt={item.title || `Gallery ${index + 1}`}
                        className="w-full h-64 object-cover"
                        loading="lazy"
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
                      {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <p className="text-white font-medium text-sm truncate">{item.title}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
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
