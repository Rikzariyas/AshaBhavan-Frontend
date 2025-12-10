import { motion } from 'framer-motion'
import { DUMMY_IMAGES, DUMMY_DATA } from '../constants'

export default function DirectorProfile() {
  const displayHeadOfInstitute = DUMMY_DATA.HEAD_OF_INSTITUTE


  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -6, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14 }}
            whileHover={{ scale: 1.04, rotate: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 portrait-entrance projective-wrapper"
          >
            <motion.div
              whileHover={{ rotateY: 8, rotateX: -4, translateZ: 6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="rounded-full overflow-hidden"
            >
              <img
                src={displayHeadOfInstitute.photo || DUMMY_IMAGES.HEAD_OF_INSTITUTE}
                alt={displayHeadOfInstitute.name}
                className="w-64 h-64 rounded-full object-cover shadow-lg animate-float projective-img"
                onError={e => {
                  e.target.src = DUMMY_IMAGES.HEAD_OF_INSTITUTE
                }}
              />
            </motion.div>
          </motion.div>
          <div className="flex-1 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            >
              {displayHeadOfInstitute.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-asha-green mb-4"
            >
              {displayHeadOfInstitute.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 leading-relaxed"
            >
              {displayHeadOfInstitute.description}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Campus Photos Section */}

    </section>
  )
}
