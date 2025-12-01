import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Award } from 'lucide-react'
import { useStore } from '../store/useStore'
import { DUMMY_IMAGES } from '../constants'

export default function Faculties() {
  const { faculties, facultyVideos } = useStore()

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Faculties</h1>
          <p className="text-xl text-gray-600">
            Meet our dedicated and experienced teaching professionals
          </p>
        </motion.div>

        {/* Faculty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {faculties.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={faculty.photo || DUMMY_IMAGES.FACULTIES[0]}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = DUMMY_IMAGES.FACULTIES[0]
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="text-blue-600" size={20} />
                  <h3 className="text-2xl font-bold text-gray-900">{faculty.name}</h3>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="text-purple-600" size={18} />
                  <p className="text-lg text-purple-600 font-semibold">{faculty.subject}</p>
                </div>
                <p className="text-gray-600 leading-relaxed">{faculty.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Faculty Videos Section */}
        {facultyVideos.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <Award className="text-blue-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">Faculty Videos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {facultyVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
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
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
