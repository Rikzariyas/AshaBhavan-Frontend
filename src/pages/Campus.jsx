import { motion } from 'framer-motion'
import { DUMMY_IMAGES, DUMMY_DATA } from '../constants'

export default function Campus() {
  const displayAboutData = DUMMY_DATA.ABOUT

  return (
    <section id="campus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Campus</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayAboutData.photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={photo || DUMMY_IMAGES.PLACEHOLDER}
                alt={`Campus ${index + 1}`}
                className="w-full h-64 object-cover"
                onError={e => {
                  e.target.src = DUMMY_IMAGES.PLACEHOLDER
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
