import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Save, Upload, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const {
    isAdmin,
    logout,
    sliderImages,
    headOfInstitute,
    aboutData,
    gallery,
    courses,
    contactInfo,
    updateSliderImages,
    updateHeadOfInstitute,
    updateAboutData,
    updateGallery,
    updateCourses,
    updateContactInfo,
  } = useStore()

  const [activeTab, setActiveTab] = useState('home')
  const [localData, setLocalData] = useState({
    sliderImages,
    headOfInstitute,
    aboutData,
    gallery,
    courses,
    contactInfo,
  })

  if (!isAdmin) {
    navigate('/admin/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSave = () => {
    updateSliderImages(localData.sliderImages)
    updateHeadOfInstitute(localData.headOfInstitute)
    updateAboutData(localData.aboutData)
    updateGallery(localData.gallery)
    updateCourses(localData.courses)
    updateContactInfo(localData.contactInfo)
    alert('Changes saved successfully!')
  }

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'courses', label: 'Courses' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'home' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Home Page Settings</h2>

              {/* Slider Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slider Images (URLs, one per line)
                </label>
                <textarea
                  value={localData.sliderImages.join('\n')}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      sliderImages: e.target.value.split('\n').filter((url) => url.trim()),
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </div>

              {/* Head of Institute */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={localData.headOfInstitute.name}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        headOfInstitute: { ...localData.headOfInstitute, name: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={localData.headOfInstitute.title}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        headOfInstitute: { ...localData.headOfInstitute, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                <input
                  type="text"
                  value={localData.headOfInstitute.photo}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      headOfInstitute: { ...localData.headOfInstitute, photo: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={localData.headOfInstitute.description}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      headOfInstitute: { ...localData.headOfInstitute, description: e.target.value },
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Page Settings</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
                <textarea
                  value={localData.aboutData.mission}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      aboutData: { ...localData.aboutData, mission: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                <textarea
                  value={localData.aboutData.vision}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      aboutData: { ...localData.aboutData, vision: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objectives (one per line)
                </label>
                <textarea
                  value={localData.aboutData.objectives.join('\n')}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      aboutData: {
                        ...localData.aboutData,
                        objectives: e.target.value.split('\n').filter((obj) => obj.trim()),
                      },
                    })
                  }
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URLs (one per line)
                </label>
                <textarea
                  value={localData.aboutData.photos.join('\n')}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      aboutData: {
                        ...localData.aboutData,
                        photos: e.target.value.split('\n').filter((url) => url.trim()),
                      },
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery Settings</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Work URLs (one per line)
                </label>
                <textarea
                  value={localData.gallery.studentWork.join('\n')}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      gallery: {
                        ...localData.gallery,
                        studentWork: e.target.value.split('\n').filter((url) => url.trim()),
                      },
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program URLs (one per line)
                </label>
                <textarea
                  value={localData.gallery.programs.join('\n')}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      gallery: {
                        ...localData.gallery,
                        programs: e.target.value.split('\n').filter((url) => url.trim()),
                      },
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URLs (one per line)
                </label>
                <textarea
                  value={localData.gallery.photos.join('\n')}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      gallery: {
                        ...localData.gallery,
                        photos: e.target.value.split('\n').filter((url) => url.trim()),
                      },
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Courses Settings</h2>
              <div className="space-y-4">
                {localData.courses.map((course, index) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => {
                            const newCourses = [...localData.courses]
                            newCourses[index] = { ...course, name: e.target.value }
                            setLocalData({ ...localData, courses: newCourses })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asha-green outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={course.subject}
                          onChange={(e) => {
                            const newCourses = [...localData.courses]
                            newCourses[index] = { ...course, subject: e.target.value }
                            setLocalData({ ...localData, courses: newCourses })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asha-green outline-none"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo URL
                      </label>
                      <input
                        type="text"
                        value={course.photo}
                        onChange={(e) => {
                          const newCourses = [...localData.courses]
                          newCourses[index] = { ...course, photo: e.target.value }
                          setLocalData({ ...localData, courses: newCourses })
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asha-green outline-none"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={course.description}
                        onChange={(e) => {
                          const newCourses = [...localData.courses]
                          newCourses[index] = { ...course, description: e.target.value }
                          setLocalData({ ...localData, courses: newCourses })
                        }}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asha-green outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={localData.contactInfo.phone}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        contactInfo: { ...localData.contactInfo, phone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={localData.contactInfo.email}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        contactInfo: { ...localData.contactInfo, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input
                    type="url"
                    value={localData.contactInfo.instagram}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        contactInfo: { ...localData.contactInfo, instagram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input
                    type="url"
                    value={localData.contactInfo.whatsapp}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        contactInfo: { ...localData.contactInfo, whatsapp: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={localData.contactInfo.address}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      contactInfo: { ...localData.contactInfo, address: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Embed URL
                </label>
                <textarea
                  value={localData.contactInfo.mapLocation}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      contactInfo: { ...localData.contactInfo, mapLocation: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={20} />
              <span>Save Changes</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
