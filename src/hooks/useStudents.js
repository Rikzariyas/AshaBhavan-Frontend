import { useState, useCallback } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../constants'

export function useStudents(adminToken) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const headers = {}
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.get(`${API_BASE_URL}/students`, { headers })

      if (response.data.success) {
        setStudents(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching students:', err)
      setError('Failed to load students. Please try again.')
      setStudents([])
    } finally {
      setLoading(false)
    }
  }, [adminToken])

  const deleteStudent = async studentId => {
    try {
      const headers = {}
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.delete(`${API_BASE_URL}/students/${studentId}`, { headers })
      return response.data
    } catch (err) {
      throw err
    }
  }

  const updateStudent = async (studentId, data) => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.patch(`${API_BASE_URL}/students/${studentId}`, data, {
        headers,
      })
      return response.data
    } catch (err) {
      throw err
    }
  }

  const createStudent = async formData => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`
      }

      const response = await axios.post(`${API_BASE_URL}/students`, formData, { headers })
      return response.data
    } catch (err) {
      throw err
    }
  }

  return {
    students,
    loading,
    error,
    fetchStudents,
    deleteStudent,
    updateStudent,
    createStudent,
  }
}
