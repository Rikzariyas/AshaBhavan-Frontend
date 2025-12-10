import { motion } from 'framer-motion'
import { Target, Eye, CheckCircle, GraduationCap, Users, Award, Heart } from 'lucide-react'
import { DUMMY_IMAGES, DUMMY_DATA } from '../constants'

export default function About() {
  const displayAboutData = DUMMY_DATA.ABOUT

  return (
    <div id="about" className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about our mission, vision, and objectives
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 md:p-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{displayAboutData.mission}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{displayAboutData.vision}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Objectives Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Objectives</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayAboutData.objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                >
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">{objective}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Why Choose Us
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: 'Quality Education',
                  description: 'Comprehensive curriculum designed for holistic development',
                },
                {
                  icon: Users,
                  title: 'Expert Courses',
                  description: 'Comprehensive range of educational courses',
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
              ].map((feature, index) => {
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
          </div>
        </motion.section>
      </div>
    </div>
  )
}
