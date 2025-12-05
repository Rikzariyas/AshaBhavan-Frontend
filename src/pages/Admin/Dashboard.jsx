import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Plus, List, Edit, Trash2, Upload, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { API_BASE_URL } from '../../constants'
import axios from 'axios'
import Toast, { useToast } from '../../components/Toast'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { isAdmin, adminToken, logout } = useStore()
  const { showSuccess, showError } = useToast()
  const [view, setView] = useState('list') // 'list' or 'add'
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toasts, setToasts] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    category: 'studentWork',
    title: '',
    image: null,
  })

  // Preview image
  const [imagePreview, setImagePreview] = useState(null)

  const fetchGalleryItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const headers = {}
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.get(`${API_BASE_URL}/gallery`, { headers })

      if (response.data.success) {
        // Flatten gallery items from all categories
        const allItems = []
        if (response.data.data.studentWork) {
          allItems.push(
            ...response.data.data.studentWork.map(item => ({ ...item, category: 'studentWork' }))
          )
        }
        if (response.data.data.programs) {
          allItems.push(
            ...response.data.data.programs.map(item => ({ ...item, category: 'programs' }))
          )
        }
        if (response.data.data.photos) {
          allItems.push(...response.data.data.photos.map(item => ({ ...item, category: 'photos' })))
        }
        setGalleryItems(allItems)
      }
    } catch (err) {
      console.error('Error fetching gallery items:', err)
      setError('Failed to load gallery items. Please try again.')
      // Set empty array on error to show empty state
      setGalleryItems([])
    } finally {
      setLoading(false)
    }
  }, [adminToken])

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
    } else {
      fetchGalleryItems()
    }
  }, [isAdmin, navigate, fetchGalleryItems])

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

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      showError('Please select a valid image file')
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        setFormData({ ...formData, image: file })
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        showError('Please drop a valid image file')
      }
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setUploading(true)

    // For editing, image is optional (can update other fields without changing image)
    if (!editingItem && !formData.image) {
      setError('Please select an image')
      setUploading(false)
      return
    }

    try {
      if (editingItem) {
        // Update existing item (API endpoint to be provided)
        // Update gallery item using PATCH /gallery/:id
        const updateData = new FormData()
        updateData.append('category', formData.category)
        updateData.append('title', formData.title)
        if (formData.image) {
          updateData.append('image', formData.image)
        }

        try {
          const headers = {
            'Content-Type': 'multipart/form-data',
          }
          if (adminToken) {
            headers.Authorization = `Bearer ${adminToken}`
          }

          const response = await axios.patch(
            `${API_BASE_URL}/gallery/${editingItem.id}`,
            updateData,
            { headers }
          )

          if (response.data.success) {
            showSuccess('Gallery item updated successfully!')
            resetForm()
            setTimeout(() => {
              fetchGalleryItems()
              setView('list')
            }, 1000)
          }
        } catch (updateErr) {
          // If update endpoint doesn't exist yet, show message
          if (updateErr.response?.status === 404 || updateErr.response?.status === 501) {
            setError(
              'Update API endpoint not available yet. Please use delete and add new instead.'
            )
          } else {
            throw updateErr
          }
        }
      } else {
        // Create new item
        const formDataToSend = new FormData()
        formDataToSend.append('category', formData.category)
        formDataToSend.append('title', formData.title)
        formDataToSend.append('image', formData.image)

        const headers = {
          'Content-Type': 'multipart/form-data',
        }
        if (adminToken) {
          headers.Authorization = `Bearer ${adminToken}`
        }

        const response = await axios.post(`${API_BASE_URL}/gallery/upload`, formDataToSend, {
          headers,
        })

        if (response.data.success) {
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

  const handleEdit = item => {
    setEditingItem(item)
    setFormData({
      category: item.category || 'studentWork',
      title: item.title || '',
      image: null,
    })
    setImagePreview(item.url || null)
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
      const headers = {}
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.delete(`${API_BASE_URL}/gallery/${itemToDelete.id}`, {
        headers,
      })

      if (response.data.success) {
        showSuccess('Gallery item deleted successfully!')
        setShowDeleteModal(false)
        setItemToDelete(null)
        fetchGalleryItems()
      }
    } catch (err) {
      console.error('Error deleting gallery item:', err)
      const errorMessage =
        err.response?.data?.message || 'Failed to delete gallery item. Please try again.'
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
      // Call logout API endpoint with Bearer token
      const headers = {}
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { headers })
      showSuccess('Logged out successfully!')
    } catch (err) {
      // Even if API call fails, we should still clear local state
      console.error('Logout API error:', err)
      showError('Error during logout, but you have been logged out locally.')
    } finally {
      // Always clear local state and navigate away
      setTimeout(() => {
        logout()
        navigate('/')
      }, 500)
    }
  }

  const resetForm = () => {
    setFormData({ category: 'studentWork', title: '', image: null })
    setImagePreview(null)
    setEditingItem(null)
    setError('')
    setSuccess('')
    // Reset file input
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

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setView('list')
              resetForm()
            }}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <List size={20} />
            <span>Gallery List</span>
          </button>
          <button
            onClick={() => {
              setView('add')
              resetForm()
            }}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
              view === 'add' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Plus size={20} />
            <span>Add Gallery</span>
          </button>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
          >
            {success}
          </motion.div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {view === 'list' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gallery Items</h2>
                <button
                  onClick={() => setView('add')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add New</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading gallery items...</p>
                </div>
              ) : galleryItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No gallery items found.</p>
                  <button
                    onClick={() => setView('add')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add First Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galleryItems.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-square bg-gray-100">
                        <img
                          src={item.url || item.thumbnail || '/images/placeholder.jpg'}
                          alt={item.title || 'Gallery image'}
                          className="w-full h-full object-cover"
                          onError={e => {
                            e.target.src = '/images/placeholder.jpg'
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            {getCategoryLabel(item.category)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">
                          {item.title || 'Untitled'}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {view === 'add' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="studentWork">Student Work</option>
                    <option value="programs">Programs</option>
                    <option value="photos">Photos</option>
                  </select>
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter gallery item title"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="space-y-1 text-center w-full">
                      {imagePreview ? (
                        <div className="relative inline-block">
                          <img src={imagePreview} alt="Preview" className="max-h-64 rounded-lg" />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null)
                              setFormData({ ...formData, image: null })
                            }}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>{imagePreview ? 'Change image' : 'Upload an image'}</span>
                          <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                            required={!editingItem && !imagePreview}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload size={20} />
                    <span>{uploading ? 'Uploading...' : editingItem ? 'Update' : 'Upload'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm()
                      setView('list')
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Delete Gallery Item</h3>
              <button
                onClick={cancelDelete}
                disabled={deleting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this gallery item? This action cannot be undone.
              </p>
              {itemToDelete && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={itemToDelete.url || itemToDelete.thumbnail || '/images/placeholder.jpg'}
                      alt={itemToDelete.title || 'Gallery image'}
                      className="w-20 h-20 object-cover rounded"
                      onError={e => {
                        e.target.src = '/images/placeholder.jpg'
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {itemToDelete.title || 'Untitled'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Category: {getCategoryLabel(itemToDelete.category)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
