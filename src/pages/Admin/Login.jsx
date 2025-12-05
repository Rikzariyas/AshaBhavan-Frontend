import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { ADMIN_CONSTANTS, API_BASE_URL } from '../../constants'
import axios from 'axios'
import Toast, { useToast } from '../../components/Toast'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [toasts, setToasts] = useState([])
  const navigate = useNavigate()
  const { setAdmin } = useStore()
  const { showSuccess, showError } = useToast()

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

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: credentials.username,
        password: credentials.password,
      })

      if (response.data.success && response.data.data?.token) {
        // Store the token and set admin status
        setAdmin(response.data.data.token)
        showSuccess('Login successful!')
        setTimeout(() => {
          navigate('/admin')
        }, 500)
      } else {
        const errorMsg = 'Login failed. Please check your credentials.'
        setError(errorMsg)
        showError(errorMsg)
      }
    } catch (err) {
      console.error('Login error:', err)
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid credentials. Please try again.'
      setError(errorMsg)
      showError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-asha-pink/10 to-asha-yellow/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-asha-green rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={e => setCredentials({ ...credentials, username: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asha-green focus:border-transparent outline-none transition-all"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asha-green focus:border-transparent outline-none transition-all pr-12"
                placeholder="Enter password"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-asha-green text-white py-3 rounded-lg font-semibold hover:bg-asha-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </motion.button>
        </form>

        {/* Toast Notifications */}
        <Toast toasts={toasts} removeToast={removeToast} />
      </motion.div>
    </div>
  )
}
