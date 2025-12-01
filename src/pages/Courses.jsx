import { motion } from 'framer-motion'
import {
  GraduationCap,
  BookOpen,
  Phone,
  Scissors,
  Sparkles,
  Shirt,
  Monitor,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { DUMMY_IMAGES, DUMMY_DATA } from '../constants'

export default function Courses() {
  const { courses } = useStore()
  // Use store data if available (from API), otherwise use constants
  const displayCourses = courses || DUMMY_DATA.COURSES

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600">
            Explore our comprehensive range of educational courses
          </p>
        </motion.div>

    {/* Course Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={course.photo || DUMMY_IMAGES.COURSES[0]}
                  alt={course.name}
                  className="w-full h-full object-cover"
                  onError={e => {
                    e.target.src = DUMMY_IMAGES.COURSES[0]
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="text-asha-green" size={20} />
                  <h3 className="text-2xl font-bold text-gray-900">{course.name}</h3>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="text-asha-pink" size={18} />
                  <p className="text-lg text-asha-pink font-semibold">{course.subject}</p>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{course.description}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-asha-green text-white rounded-lg font-semibold hover:bg-asha-green/90 transition-colors w-full justify-center"
                >
                  <Phone size={18} />
                  <span>Contact for More Details</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Our Courses Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-asha-green rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">About Our Courses</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ashabhavan is conducting various courses for disabled girls to achieve the goal of
              self-sufficiency in life. It will help them get jobs in Govt. or private sector after
              completing the courses. Most of our students are deaf and dumb, mildly mentally
              retarded, and orthopedically handicapped. We are giving them training in Computer,
              Tailoring and Embroidery, and Fashion Designing & Garment Technology (FDGT).
            </p>

            {/* Course Details */}
            <div className="space-y-8">
              {/* Tailoring Course */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-asha-pink/10 to-asha-yellow/10 rounded-xl p-6 border-l-4 border-asha-green"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-asha-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scissors className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Tailoring Course</h3>
                    <div className="space-y-3 text-gray-700">
                      <p className="leading-relaxed">
                        Hands-on skills training includes mastery in garment construction,
                        alteration and repair techniques. Precision and attention to detail help
                        develop fine motor skills.
                      </p>
                      <div>
                        <p className="font-semibold mb-2">Key Benefits:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>
                            Entrepreneurial opportunities - start their own tailoring business or
                            work in garment manufacturing
                          </li>
                          <li>Career paths: Tailor and alteration specialist</li>
                          <li>
                            Termly and timely evaluations and monitoring for effective training
                          </li>
                        </ul>
                      </div>
                      <p className="text-asha-green font-semibold">
                        34 students received training in this course
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Embroidery Course */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-asha-yellow/10 to-asha-pink/10 rounded-xl p-6 border-l-4 border-asha-pink"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-asha-pink rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Embroidery</h3>
                    <div className="space-y-3 text-gray-700">
                      <p className="leading-relaxed">
                        Embroidery has its traditional importance. It can be calming and meditative,
                        promoting relaxation and focus. Adds value to garments with attractive
                        stitching patterns.
                      </p>
                      <p className="text-asha-pink font-semibold">
                        34 students are currently enrolled in this course
                      </p>
                      <p className="leading-relaxed">
                        Both Tailoring and Embroidery courses help students achieve self-sufficiency
                        in life and secure jobs in private and public sectors, helping them reach
                        the mainstream of society.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fashion Designing & Garment Technology */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-asha-green/10 to-asha-pink/10 rounded-xl p-6 border-l-4 border-asha-green"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-asha-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shirt className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Fashion Designing & Garment Technology (FDGT)
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <p className="leading-relaxed">
                        Our Fashion Designing course is shortly known as FDGT. Students are engaged
                        with regular classes, industrial visits, internships, and project works.
                        Curricular and extracurricular activities are also part of our training
                        programme. Evaluation is done termly.
                      </p>
                      <div>
                        <p className="font-semibold mb-2">Creative Expression:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>
                            Develop skills in garment construction, textile science, and fashion
                            illustration
                          </li>
                          <li>
                            Industry relevant - learn about current trends, patterns, and designs in
                            the fashion industry
                          </li>
                          <li>
                            Career opportunities - pursue careers in fashion designing and styling.
                            In public sector schools, they are posted as craft teachers
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white/50 rounded-lg p-4 mt-4">
                        <p className="font-semibold text-asha-green mb-2">
                          Government Recognition:
                        </p>
                        <p className="leading-relaxed">
                          This course has affiliation from Technical Education for Fashion Designing
                          and Garment Technology (KGTE-FDGT). It is a Government recognized course
                          under Kerala Technical Education. We are registered with KRISMA (Kerala
                          Recognized Industrial School Managers Association), a coordinating body of
                          accredited private institutions working under Kerala Technical Education.
                        </p>
                        <p className="text-asha-green font-semibold mt-2">
                          6 students were enrolled in this course during the academic year
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Computer Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-asha-pink/10 to-asha-green/10 rounded-xl p-6 border-l-4 border-asha-pink"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-asha-pink rounded-lg flex items-center justify-center flex-shrink-0">
                    <Monitor className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Computer Courses</h3>
                    <div className="space-y-3 text-gray-700">
                      <p className="leading-relaxed">
                        Our students are very much interested in computer courses such as MS Office,
                        DTP, English and Malayalam Typing. We are preparing them for exams.
                      </p>
                      <div className="bg-white/50 rounded-lg p-4">
                        <p className="font-semibold text-asha-green mb-2">Recognition:</p>
                        <p className="leading-relaxed">
                          Our computer courses have recognition from the Indian Computer Academy.
                          All students attended this course.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

    
      </div>
    </div>
  )
}
