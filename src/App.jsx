import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SinglePage from './pages/SinglePage'
import AdminLogin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import { useStore } from './store/useStore'

function ProtectedRoute({ children }) {
  const { isAdmin } = useStore()
  return isAdmin ? children : <Navigate to="/admin/login" replace />
}

function HashHandler() {
  const location = useLocation()

  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const hash = location.hash.substring(1) // Remove #
        const element = document.getElementById(hash)
        if (element) {
          const offset = 80 // Navbar height
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
          return true
        }
      }
      return false
    }

    // Try immediately
    if (!scrollToHash()) {
      // If element not found, try after a short delay (for page load)
      const timeout = setTimeout(() => {
        scrollToHash()
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [location.hash])

  return null
}

function App() {
  return (
    <Router>
      <HashHandler />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SinglePage />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/gallery" element={<Navigate to="/#gallery" replace />} />
            <Route path="/courses" element={<Navigate to="/#courses" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App
