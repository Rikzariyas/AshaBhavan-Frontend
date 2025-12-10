import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DUMMY_IMAGES } from '../constants'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Introduction() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-start gap-12">
        {/* Description - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-classic">
            A Journey of Hope and Transformation Since 1993
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-justify font-classic text-lg">
            <p>
              Pavanatma Province, Kallettumkara, of the Holy Family Congregation embarked upon an ambitious project in Annamanada in 1993, by establishing a Holy Family convent along with a Centre for providing education and imparting necessary training in various skills for the physically and mentally challenged children/youth. According to the Charitable Act, Asha Bhavan was registered as a charitable society on 5/5/1993. Under the supervision of sisters who are committed to service, the children/youth live together joyfully under one roof as one family, and practice different skills, according to their aptitudes.
            </p>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <p>
                    The noble aim of Asha Bhavan is to equip and empower the physically and mentally challenged children/youth with sufficient training in job oriented skills and thereby enable them to earn their future living. This is an Endeavour to bring them to the mainstream of the society. Due to the dedicated service and guidance of the sisters, the inmates of Asha Bhavan are enlightened in various aspects of their lives. Great care is bestowed upon their spiritual, mental and physical well being - proper values are inculcated and good, refined goals are set for them.
                  </p>
                  <p>
                    Two year's Diploma Course of Fashion Designing and Garment Technology (FDGT) under the Kerala Technical Education Department, Computer Course (M.S Office & DTP) registered under Indian Computer Education Society (ICES), courses in Tailoring and Embroidery, Jewellery making, Painting are some of the skills in which training is provided. Besides all these, sports and cultural programmes and study tours are conducted frequently to enrich them mentally and physically.
                  </p>
                  <p>
                    The education and training furnished in skills, along with the boarding and lodging of the inmates are provided free of cost at Asha Bhavan. It is worth mentioning that those who have obtained training from here are stationed in different walks of life and are doing meritorious works in different parts of the country. They are employed in various governmental, nongovernmental and other sectors where they work with responsibility and self confidence secured by the training acquired from Asha Bhavan.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-asha-green font-semibold hover:text-green-700 transition-colors mt-2"
            >
              {isExpanded ? (
                <>
                  Read Less <ChevronUp size={20} />
                </>
              ) : (
                <>
                  Read More <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Photo - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 sticky top-24"
        >
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={DUMMY_IMAGES.PLACEHOLDER}
              alt="Welcome to AshaBhavan"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              onError={e => {
                e.target.src = DUMMY_IMAGES.PLACEHOLDER
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
