import { motion } from 'framer-motion'

export default function VideoSection() {
  return (
    <div id="video" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Video</h1>
          <p className="text-xl text-gray-600">Watch our inspiring student success stories</p> */}
        </motion.div>

        {/* Video Container with Left Placement */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Video - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/1P_YP2-s8-U?rel=0&modestbranding=1&controls=1"
                  title="Featured Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Description - Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Discover the transformative journey of our students as they pursue excellence and
              achieve their dreams through our dedicated programs and mentorship. Watch how Asha
              Bhavan empowers young minds to reach their full potential.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-asha-green mt-2 mr-3"></span>
                <span className="text-gray-700">Comprehensive educational programs</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-asha-green mt-2 mr-3"></span>
                <span className="text-gray-700">Expert guidance and mentorship</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-asha-green mt-2 mr-3"></span>
                <span className="text-gray-700">Proven track record of success</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
