import { motion } from 'framer-motion'
import { GraduationCap, Users, Award, Heart } from 'lucide-react'
import ImageSlider from '../components/ImageSlider'
import { useStore } from '../store/useStore'
import { DUMMY_IMAGES } from '../constants'

export default function Home() {
  const { sliderImages, headOfInstitute } = useStore()

  const features = [
    {
      icon: GraduationCap,
      title: 'Quality Education',
      description: 'Comprehensive curriculum designed for holistic development',
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Experienced and dedicated teaching professionals',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Commitment to academic and personal excellence',
    },
    {
      icon: Heart,
      title: 'Care & Support',
      description: 'Nurturing environment for every student',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section with Slider */}
      <section className="mb-16 px-4 sm:px-6 lg:px-8">
        <ImageSlider images={sliderImages} />
      </section>

      {/* Head of Institute Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <img
                src={headOfInstitute.photo || DUMMY_IMAGES.HEAD_OF_INSTITUTE}
                alt={headOfInstitute.name}
                className="w-64 h-64 rounded-full object-cover shadow-lg"
                onError={(e) => {
                  e.target.src = DUMMY_IMAGES.HEAD_OF_INSTITUTE
                }}
              />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              >
                {headOfInstitute.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-asha-green mb-4"
              >
                {headOfInstitute.title}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 leading-relaxed"
              >
                {headOfInstitute.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-asha-pink/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-asha-green" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
