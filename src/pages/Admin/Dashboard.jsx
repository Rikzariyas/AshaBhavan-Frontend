import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Plus, List, Users, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { API_BASE_URL } from '../../constants'
import axios from 'axios'
import Toast, { useToast } from '../../components/Toast'
import { useGallery } from '../../hooks/useGallery'
import { useStudents } from '../../hooks/useStudents'
import { useImageUpload } from '../../hooks/useImageUpload'
import DeleteModal from '../../components/admin/DeleteModal'
import GalleryCard from '../../components/admin/GalleryCard'
import GalleryForm from '../../components/admin/GalleryForm'
import StudentCard from '../../components/admin/StudentCard'
import StudentForm from '../../components/admin/StudentForm'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { isAdmin, adminToken, logout } = useStore()
  const { showSuccess, showError } = useToast()
  const [view, setView] = useState('gallery-list')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toasts, setToasts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Gallery Form state
  const [formData, setFormData] = useState({
    category: 'studentWork',
    title: '',
    image: null,
  })

  // Student Form state
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    dateOfBirth: '',
    joiningDate: '',
    photo: null,
  })
  const [editingStudent, setEditingStudent] = useState(null)

  // Custom hooks
  const {
    galleryItems,
    loading,
    fetchGalleryItems,
    deleteGalleryItem,
    updateGalleryItem,
    uploadGalleryItem,
  } = useGallery(adminToken)
  const { students, loading: studentsLoading, fetchStudents, deleteStudent, updateStudent, createStudent } = useStudents(adminToken)
  const {
    imagePreview,
    isDragging,
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeImage,
    setPreview,
  } = useImageUpload()
  const {
    imagePreview: studentImagePreview,
    isDragging: studentIsDragging,
    handleImageChange: handleStudentImageChange,
    handleDragOver: handleStudentDragOver,
    handleDragLeave: handleStudentDragLeave,
    handleDrop: handleStudentDrop,
    removeImage: removeStudentImage,
    setPreview: setStudentPreview,
  } = useImageUpload()

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
    } else {
      fetchGalleryItems()
      fetchStudents()
    }
  }, [isAdmin, navigate, fetchGalleryItems, fetchStudents])

  // Toast event listeners
  useEffect(() => {
    const handleShowToast = event => {
      setToasts(prev => [...prev, event.detail])
    }
    const handleRemoveToast = event => {
      setToasts(prev => prev.filter(toast => toast.id !== event.detail.id))
    }

    window.addEventListener('show-toast', handleShowToast)
    window.addEventListener('remove-toast', handleRemoveToast)

    return () => {
      window.removeEventListener('show-toast', handleShowToast)
      window.removeEventListener('remove-toast', handleRemoveToast)
    }
  }, [])

  const removeToast = id => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const onImageChange = e => {
    const file = handleImageChange(e, showError)
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const onDrop = e => {
    const file = handleDrop(e, showError)
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const onStudentImageChange = e => {
    const file = handleStudentImageChange(e, showError)
    if (file) {
      setStudentFormData({ ...studentFormData, photo: file })
    }
  }

  const onStudentDrop = e => {
    const file = handleStudentDrop(e, showError)
    if (file) {
      setStudentFormData({ ...studentFormData, photo: file })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setUploading(true)

    if (!editingItem && !formData.image) {
      setError('Please select an image')
      setUploading(false)
      return
    }

    try {
      if (editingItem) {
        const updateData = {
          title: formData.title,
          category: formData.category,
        }
        const response = await updateGalleryItem(editingItem.id, updateData)
        if (response.success) {
          showSuccess('Gallery item updated successfully!')
          resetForm()
          setTimeout(() => {
            fetchGalleryItems()
            setView('list')
          }, 1000)
        }
      } else {
        const formDataToSend = new FormData()
        formDataToSend.append('category', formData.category)
        formDataToSend.append('title', formData.title)
        formDataToSend.append('image', formData.image)

        const response = await uploadGalleryItem(formDataToSend)
        if (response.success) {
          showSuccess('Gallery item uploaded successfully!')
          resetForm()
          setTimeout(() => {
            fetchGalleryItems()
            setView('list')
          }, 1000)
        }
      }
    } catch (err) {
      console.error('Error saving gallery item:', err)
      const errorMessage =
        err.response?.data?.message ||
        `Failed to ${editingItem ? 'update' : 'upload'} gallery item. Please try again.`
      setError(errorMessage)
      showError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleStudentSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setUploading(true)

    console.log('Student Form Data:', studentFormData)

    if (!editingStudent && !studentFormData.photo) {
      setError('Please select a photo')
      setUploading(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', studentFormData.name)
      formDataToSend.append('dateOfBirth', studentFormData.dateOfBirth)
      formDataToSend.append('joiningDate', studentFormData.joiningDate)
      if (studentFormData.photo) {
        formDataToSend.append('photo', studentFormData.photo)
      }

      console.log('Sending student data to API...')
      console.log('FormData entries:')
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1])
      }

      if (editingStudent) {
        const response = await updateStudent(editingStudent.id, formDataToSend)
        console.log('Update response:', response)
        if (response.success) {
          showSuccess('Student updated successfully!')
          resetStudentForm()
          setTimeout(() => {
            fetchStudents()
            setView('student-list')
          }, 1000)
        }
      } else {
        const response = await createStudent(formDataToSend)
        console.log('Create response:', response)
        if (response.success) {
          showSuccess('Student added successfully!')
          resetStudentForm()
          setTimeout(() => {
            fetchStudents()
            setView('student-list')
          }, 1000)
        } else {
          throw new Error(response.message || 'Failed to add student')
        }
      }
    } catch (err) {
      console.error('Error saving student:', err)
      console.error('Error details:', err.response?.data)
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        `Failed to ${editingStudent ? 'update' : 'add'} student. Please try again.`
      setError(errorMessage)
      showError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleEditStudent = student => {
    setEditingStudent(student)
    setStudentFormData({
      name: student.name || '',
      dateOfBirth: student.dateOfBirth || '',
      joiningDate: student.joiningDate || '',
      photo: null,
    })
    setStudentPreview(student.photo || null)
    setView('student-add')
  }

  const handleDeleteStudent = student => {
    setItemToDelete(student)
    setShowDeleteModal(true)
  }

  const resetStudentForm = () => {
    setStudentFormData({ name: '', dateOfBirth: '', joiningDate: '', photo: null })
    removeStudentImage()
    setEditingStudent(null)
    setError('')
    setSuccess('')
    const fileInput = document.getElementById('student-photo-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleEdit = item => {
    setEditingItem(item)
    setFormData({
      category: item.category || 'studentWork',
      title: item.title || '',
      image: null,
    })
    setPreview(item.url || null)
    setView('add')
  }

  const handleDelete = item => {
    setItemToDelete(item)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    setDeleting(true)
    setError('')
    setSuccess('')

    try {
      let response
      if (view.includes('student')) {
        response = await deleteStudent(itemToDelete.id)
        if (response.success) {
          showSuccess('Student deleted successfully!')
          setShowDeleteModal(false)
          setItemToDelete(null)
          fetchStudents()
        }
      } else {
        response = await deleteGalleryItem(itemToDelete.id)
        if (response.success) {
          showSuccess('Gallery item deleted successfully!')
          setShowDeleteModal(false)
          setItemToDelete(null)
          fetchGalleryItems()
        }
      }
    } catch (err) {
      console.error('Error deleting:', err)
      const errorMessage =
        err.response?.data?.message || `Failed to delete ${view.includes('student') ? 'student' : 'gallery item'}. Please try again.`
      setError(errorMessage)
      showError(errorMessage)
    } finally {
      setDeleting(false)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  const handleLogout = async () => {
    try {
      const headers = {}
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { headers })
      showSuccess('Logged out successfully!')
    } catch (err) {
      console.error('Logout API error:', err)
      showError('Error during logout, but you have been logged out locally.')
    } finally {
      setTimeout(() => {
        logout()
        navigate('/')
      }, 500)
    }
  }

  const resetForm = () => {
    setFormData({ category: 'studentWork', title: '', image: null })
    removeImage()
    setEditingItem(null)
    setError('')
    setSuccess('')
    const fileInput = document.getElementById('image-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const getCategoryLabel = category => {
    const labels = {
      studentWork: 'Student Work',
      programs: 'Programs',
      photos: 'Photos',
    }
    return labels[category] || category
  }

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {view.includes('student') ? 'Student Management' : 'Gallery Management'}
            </h1>
            <p className="text-gray-600 mt-1">
              {view.includes('student') ? 'Manage your students' : 'Manage your gallery items'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              setView('gallery-list')
              resetForm()
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all font-medium ${
              view === 'gallery-list'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <List size={20} />
            <span>Gallery List</span>
          </button>
          <button
            onClick={() => {
              setView('student-list')
              resetStudentForm()
              setSearchQuery('')
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all font-medium ${
              view === 'student-list'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <Users size={20} />
            <span>Student List</span>
          </button>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-sm"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg shadow-sm"
          >
            {success}
          </motion.div>
        )}

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {view === 'gallery-list' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Gallery Items</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {galleryItems.length} {galleryItems.length === 1 ? 'item' : 'items'} total
                  </p>
                </div>
                <button
                  onClick={() => setView('gallery-add')}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
                >
                  <Plus size={20} />
                  <span>Add New</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600 font-medium">Loading gallery items...</p>
                </div>
              ) : galleryItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <List className="text-gray-400" size={40} />
                  </div>
                  <p className="text-gray-600 text-lg font-medium mb-2">No gallery items found.</p>
                  <p className="text-gray-500 text-sm mb-4">
                    Get started by adding your first gallery item.
                  </p>
                  <button
                    onClick={() => setView('gallery-add')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
                  >
                    Add First Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galleryItems.map(item => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      getCategoryLabel={getCategoryLabel}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {view === 'student-list' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search students by name..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'} {searchQuery && 'found'}
                  </p>
                </div>
                <button
                  onClick={() => setView('student-add')}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium ml-4"
                >
                  <Plus size={20} />
                  <span>Add Student</span>
                </button>
              </div>

              {studentsLoading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600 font-medium">Loading students...</p>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <Users className="text-gray-400" size={40} />
                  </div>
                  <p className="text-gray-600 text-lg font-medium mb-2">
                    {searchQuery ? 'No students found matching your search.' : 'No students found.'}
                  </p>
                  {!searchQuery && (
                    <>
                      <p className="text-gray-500 text-sm mb-4">
                        Get started by adding your first student.
                      </p>
                      <button
                        onClick={() => setView('student-add')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
                      >
                        Add First Student
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredStudents.map((student, index) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      index={index}
                      onEdit={handleEditStudent}
                      onDelete={handleDeleteStudent}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {view === 'gallery-add' && (
            <GalleryForm
              editingItem={editingItem}
              formData={formData}
              imagePreview={imagePreview}
              isDragging={isDragging}
              uploading={uploading}
              onFormDataChange={setFormData}
              onImageChange={onImageChange}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={onDrop}
              onRemoveImage={() => {
                removeImage()
                setFormData({ ...formData, image: null })
              }}
              onSubmit={handleSubmit}
              onCancel={() => {
                resetForm()
                setView('gallery-list')
              }}
            />
          )}

          {view === 'student-add' && (
            <StudentForm
              editingStudent={editingStudent}
              formData={studentFormData}
              imagePreview={studentImagePreview}
              isDragging={studentIsDragging}
              uploading={uploading}
              onFormDataChange={setStudentFormData}
              onImageChange={onStudentImageChange}
              onDragOver={handleStudentDragOver}
              onDragLeave={handleStudentDragLeave}
              onDrop={onStudentDrop}
              onRemoveImage={() => {
                removeStudentImage()
                setStudentFormData({ ...studentFormData, photo: null })
              }}
              onSubmit={handleStudentSubmit}
              onCancel={() => {
                resetStudentForm()
                setView('student-list')
              }}
            />
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        item={itemToDelete}
        deleting={deleting}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        getCategoryLabel={view.includes('student') ? () => 'Student' : getCategoryLabel}
      />
    </div>
  )
}
