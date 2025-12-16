import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, UserPlus, Loader2 } from 'lucide-react'
import { DUMMY_DATA, DUMMY_IMAGES, API_BASE_URL } from '../constants'
import axios from 'axios'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    setLoading(true)
    setError('')
    try {
      // Try to fetch from API
      const response = await axios.get(`${API_BASE_URL}/students`)
      console.log('Student API response:', response.data)
      
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        // Use API data if available
        console.log('Using API student data:', response.data.data)
        setStudents(response.data.data)
      } else {
        // Fallback to dummy data if API returns empty or no data
        console.log('API returned no students, using dummy data')
        setStudents(DUMMY_DATA.STUDENTS)
      }
    } catch (err) {
      console.error('Error fetching students:', err)
      console.log('API error, using dummy data as fallback')
      // Fallback to dummy data on error
      setStudents(DUMMY_DATA.STUDENTS)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const calculateAge = dateString => {
    const birthDate = new Date(dateString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Users className="text-asha-green mr-3" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Student List</h1>
          </div>
          <p className="text-xl text-gray-600">Our talented students at Asha Bhavan</p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="inline-block animate-spin text-asha-green" size={48} />
            <p className="mt-4 text-gray-600 text-lg">Loading students...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
              <p className="font-medium">{error}</p>
              <button
                onClick={fetchStudents}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        {!loading && !error && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-asha-green to-asha-pink text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        <div className="flex items-center">
                          <Calendar className="mr-2" size={16} />
                          Date of Birth
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        <div className="flex items-center">
                          <UserPlus className="mr-2" size={16} />
                          Joining Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Photo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-lg font-semibold text-gray-900">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-semibold text-gray-900">{student.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">{formatDate(student.dateOfBirth)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">{calculateAge(student.dateOfBirth)} years</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">{formatDate(student.joiningDate)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={student.photo || DUMMY_IMAGES.PLACEHOLDER}
                            alt={student.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-asha-green shadow-md"
                            onError={e => {
                              e.target.src = DUMMY_IMAGES.PLACEHOLDER
                            }}
                          />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">S.No: {index + 1}</div>
                      <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
                    </div>
                    <img
                      src={student.photo || DUMMY_IMAGES.PLACEHOLDER}
                      alt={student.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-asha-green shadow-md ml-4"
                      onError={e => {
                        e.target.src = DUMMY_IMAGES.PLACEHOLDER
                      }}
                    />
                  </div>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="mr-2 text-asha-green" size={18} />
                      <span className="font-medium">DOB:</span>
                      <span className="ml-2">{formatDate(student.dateOfBirth)}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="mr-2 text-asha-green" size={18} />
                      <span className="font-medium">Age:</span>
                      <span className="ml-2">{calculateAge(student.dateOfBirth)} years</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <UserPlus className="mr-2 text-asha-pink" size={18} />
                      <span className="font-medium">Joined:</span>
                      <span className="ml-2">{formatDate(student.joiningDate)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Student Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-gray-600"
            >
              <p className="text-lg">
                Total Students: <span className="font-bold text-asha-green">{students.length}</span>
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
