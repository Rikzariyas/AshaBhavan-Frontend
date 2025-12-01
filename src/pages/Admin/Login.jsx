import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { ADMIN_CONSTANTS } from '../../constants'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setAdmin } = useStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Simple authentication (in production, use proper backend authentication with JWT)
    if (
      credentials.username === ADMIN_CONSTANTS.DEFAULT_USERNAME &&
      credentials.password === ADMIN_CONSTANTS.DEFAULT_PASSWORD
    ) {
      setAdmin('admin-token-' + Date.now())
      navigate('/admin')
    } else {
      setError(`Invalid credentials. Use: ${ADMIN_CONSTANTS.DEFAULT_USERNAME} / ${ADMIN_CONSTANTS.DEFAULT_PASSWORD}`)
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
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
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
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-asha-green text-white py-3 rounded-lg font-semibold hover:bg-asha-green/90 transition-colors"
          >
            Login
          </motion.button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>Username: {ADMIN_CONSTANTS.DEFAULT_USERNAME}</p>
          <p>Password: {ADMIN_CONSTANTS.DEFAULT_PASSWORD}</p>
        </div>
      </motion.div>
    </div>
  )
}
