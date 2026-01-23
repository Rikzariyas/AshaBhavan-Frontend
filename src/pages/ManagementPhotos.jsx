import { motion } from 'framer-motion'
import { DUMMY_IMAGES, DUMMY_DATA } from '../constants'

export default function ManagementPhotos() {
  const teamPhoto = DUMMY_DATA.MANAGEMENT_TEAM?.groupPhoto || DUMMY_IMAGES.PLACEHOLDER
  // Using the new image for staff, or fallback to placeholder. 
  // We added 'photos' array in constants earlier, let's use the second one for staff if available, 
  // or explicitly hardcode the path I know exists: '/images/management_new.jpg'
  // But wait, the user reverted my change to constants!
  // So I cannot rely on DUMMY_DATA.MANAGEMENT_TEAM.photos.
  // I will use the path directly for now: '/images/management_new.jpg'
  const staffPhoto = '/images/management_new.jpg'

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Management Team Photo */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col items-center"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg w-full h-80">
            <img 
              src={teamPhoto} 
              alt="Ashabhavan Team" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              onError={(e) => e.target.src = DUMMY_IMAGES.PLACEHOLDER}
            />
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-900">Ashabhavan Team</h3>
        </motion.div>

        {/* Staffs Photo */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="flex flex-col items-center"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg w-full h-80">
            <img 
              src={staffPhoto} 
              alt="Ashabhavan Staffs" 
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              onError={(e) => e.target.src = DUMMY_IMAGES.PLACEHOLDER}
            />
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-900">Ashabhavan Staffs</h3>
        </motion.div>
      </div>
    </section>
  )
}
