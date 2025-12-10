import { motion } from 'framer-motion'
import { DUMMY_IMAGES, DUMMY_DATA } from '../constants'

export default function Management() {
  const team = DUMMY_DATA.MANAGEMENT || []
  const teamInfo = DUMMY_DATA.MANAGEMENT_TEAM || {}

  // Director of management will be the first member if provided
  const director = team.length ? team[0] : null
  const others = team.length > 1 ? team.slice(1) : []

  return (
    <section id="management" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8"
      >
        Meet Our Management
      </motion.h2>

      {/* Team: group photo on left, description + list on right */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView ={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={teamInfo.groupPhoto || DUMMY_IMAGES.PLACEHOLDER}
              alt="Management Team"
              className="w-full h-72 object-cover rounded-xl shadow"
              onError={e => (e.target.src = DUMMY_IMAGES.PLACEHOLDER)}
            />
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Management Team</h3>
            <p className="text-gray-600 mb-4">{teamInfo.description}</p>

            <div className="space-y-4">
              {others.map((member, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <img
                    src={member.photo || DUMMY_IMAGES.PLACEHOLDER}
                    alt={member.name}
                    className="w-12 h-12 object-cover rounded-md shadow flex-shrink-0"
                    onError={e => (e.target.src = DUMMY_IMAGES.PLACEHOLDER)}
                  />
                  <div>
                    <p className="text-gray-900 font-semibold">{member.name}</p>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Director of Management */}
      {director && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 mt-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-48 h-48">
              <img
                src={director.photo || DUMMY_IMAGES.PLACEHOLDER}
                alt={director.name}
                className="w-48 h-48 object-cover rounded-xl shadow"
                onError={e => (e.target.src = DUMMY_IMAGES.PLACEHOLDER)}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900">{director.name}</h3>
              <p className="text-asha-green font-semibold mb-3">{director.role}</p>
              <p className="text-gray-600">{director.description}</p>
            </div>
          </div>
        </motion.div>
        
      )}
    </section>
  )
}
