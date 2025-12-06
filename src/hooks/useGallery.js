import { useState, useCallback } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../constants'

export function useGallery(adminToken) {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      setGalleryItems([])
    } finally {
      setLoading(false)
    }
  }, [adminToken])

  const deleteGalleryItem = async itemId => {
    try {
      const headers = {}
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.delete(`${API_BASE_URL}/gallery/${itemId}`, { headers })
      return response.data
    } catch (err) {
      throw err
    }
  }

  const updateGalleryItem = async (itemId, data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.patch(`${API_BASE_URL}/gallery/${itemId}`, data, { headers })
      return response.data
    } catch (err) {
      throw err
    }
  }

  const uploadGalleryItem = async formData => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.post(`${API_BASE_URL}/gallery/upload`, formData, { headers })
      return response.data
    } catch (err) {
      throw err
    }
  }

  return {
    galleryItems,
    loading,
    error,
    fetchGalleryItems,
    deleteGalleryItem,
    updateGalleryItem,
    uploadGalleryItem,
  }
}

