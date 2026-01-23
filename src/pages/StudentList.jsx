import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, UserPlus, Loader2 } from 'lucide-react'
import { DUMMY_DATA, DUMMY_IMAGES, API_BASE_URL } from '../constants'
import axios from 'axios'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedYear, setSelectedYear] = useState('all')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    setLoading(true)
    setError('')
    try {
      // Fetch from API
      const response = await axios.get(`${API_BASE_URL}/students`)
      console.log('Student API response:', response.data)

      // Handle API response - check for success and data array
      if (response.data && response.data.success) {
        const apiStudents = response.data.data || []
        if (Array.isArray(apiStudents)) {
          console.log('Using API student data:', apiStudents)
          setStudents(apiStudents)
        } else {
          console.error('API returned invalid data format')
          setError('Invalid data format from server')
          setStudents([])
        }
      } else if (response.data && Array.isArray(response.data)) {
        // Handle case where API returns array directly
        console.log('Using API student data (direct array):', response.data)
        setStudents(response.data)
      } else {
        console.log('API returned no students')
        setStudents([])
      }
    } catch (err) {
      console.error('Error fetching students:', err)
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to load students. Please try again.'
      setError(errorMessage)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  // Extract available years from joining dates
  const availableYears = useMemo(() => {
    const years = new Set()
    students.forEach(student => {
      if (student.joiningDate) {
        // Parse DD/MM/YYYY format to get year
        const parts = student.joiningDate.split('/')
        if (parts.length === 3) {
          years.add(parts[2]) // Year is the third part
        }
      }
    })
    return Array.from(years).sort((a, b) => b.localeCompare(a)) // Sort descending
  }, [students])

  // Filter students by selected year
  const filteredStudents = useMemo(() => {
    if (selectedYear === 'all') {
      return students
    }
    return students.filter(student => {
      if (!student.joiningDate) return false
      const parts = student.joiningDate.split('/')
      return parts.length === 3 && parts[2] === selectedYear
    })
  }, [students, selectedYear])

  const formatDate = dateString => {
    // If date is already formatted as DD/MM/YYYY, return as is
    if (dateString && dateString.includes('/')) {
      return dateString
    }
    // Otherwise, parse and format
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 pt-20">
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

        {/* Year Filter Tabs */}
        {!loading && !error && students.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedYear === 'all'
                  ? 'bg-asha-green text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All Students
            </button>
            {availableYears.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedYear === year
                    ? 'bg-asha-green text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {year}
              </button>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && students.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Users className="inline-block text-gray-400 mb-4" size={64} />
            <p className="text-xl text-gray-600 mb-2">No students found</p>
            <p className="text-gray-500">Check back later for student listings.</p>
          </motion.div>
        )}

        {/* Desktop Table View */}
        {!loading && !error && filteredStudents.length > 0 && (
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
                    {filteredStudents.map((student, index) => (
                      <motion.tr
                        key={student.id || student.studentId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-lg font-semibold text-gray-900">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-semibold text-gray-900">
                            {student.name || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">{formatDate(student.dob)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">{student.age || 0} years</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">{formatDate(student.joiningDate)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={student.avatar || DUMMY_IMAGES.PLACEHOLDER}
                            alt={student.name || 'Student'}
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
            {!loading && !error && filteredStudents.length > 0 && (
              <div className="md:hidden space-y-4">
                {filteredStudents.map((student, index) => (
                  <motion.div
                    key={student.id || student.studentId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">S.No: {index + 1}</div>
                        <h3 className="text-xl font-bold text-gray-900">{student.name || 'N/A'}</h3>
                      </div>
                      <img
                        src={student.avatar || DUMMY_IMAGES.PLACEHOLDER}
                        alt={student.name || 'Student'}
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
                        <span className="ml-2">{formatDate(student.dob)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users className="mr-2 text-asha-green" size={18} />
                        <span className="font-medium">Age:</span>
                        <span className="ml-2">{student.age || 0} years</span>
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
            )}

            {/* Student Count */}
            {!loading && !error && students.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center text-gray-600"
              >
                <p className="text-lg">
                  {selectedYear === 'all' ? (
                    <>
                      Total Students:{' '}
                      <span className="font-bold text-asha-green">{students.length}</span>
                    </>
                  ) : (
                    <>
                      Students from {selectedYear}:{' '}
                      <span className="font-bold text-asha-green">{filteredStudents.length}</span>
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
