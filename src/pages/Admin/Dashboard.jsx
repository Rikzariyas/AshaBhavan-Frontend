import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Plus, List } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { API_BASE_URL } from '../../constants'
import axios from 'axios'
import Toast, { useToast } from '../../components/Toast'
import { useGallery } from '../../hooks/useGallery'
import { useImageUpload } from '../../hooks/useImageUpload'
import DeleteModal from '../../components/admin/DeleteModal'
import GalleryCard from '../../components/admin/GalleryCard'
import GalleryForm from '../../components/admin/GalleryForm'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { isAdmin, adminToken, logout } = useStore()
  const { showSuccess, showError } = useToast()
  const [view, setView] = useState('list')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toasts, setToasts] = useState([])

  // Form state
  const [formData, setFormData] = useState({
    category: 'studentWork',
    title: '',
    image: null,
  })

  // Custom hooks
  const {
    galleryItems,
    loading,
    fetchGalleryItems,
    deleteGalleryItem,
    updateGalleryItem,
    uploadGalleryItem,
  } = useGallery(adminToken)
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
      const response = await deleteGalleryItem(itemToDelete.id)
      if (response.success) {
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

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-600 mt-1">Manage your gallery items</p>
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
              setView('list')
              resetForm()
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all font-medium ${
              view === 'list'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
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
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all font-medium ${
              view === 'add'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
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
          {view === 'list' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Gallery Items</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {galleryItems.length} {galleryItems.length === 1 ? 'item' : 'items'} total
                  </p>
                </div>
                <button
                  onClick={() => setView('add')}
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
                    onClick={() => setView('add')}
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

          {view === 'add' && (
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
                setView('list')
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
        getCategoryLabel={getCategoryLabel}
      />
    </div>
  )
}
