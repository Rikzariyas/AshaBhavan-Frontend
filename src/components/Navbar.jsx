import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Info, Images, Users, Phone, Shield, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import logo from '../assets/asha-logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const { isAdmin } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Detect active section based on scroll position
      const sections = ['home', 'about', 'courses', 'gallery', 'contact']
      const scrollPosition = window.scrollY + 100 // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Navbar height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    setIsOpen(false)
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    if (location.pathname === '/') {
      scrollToSection(sectionId)
    } else {
      // Navigate to home with hash, then scroll
      window.location.href = `/#${sectionId}`
    }
  }

  const navItems = [
    { path: '/', sectionId: 'home', label: 'Home', icon: Home },
    { path: '/about', sectionId: 'about', label: 'About', icon: Info },
    { path: '/courses', sectionId: 'courses', label: 'Courses', icon: BookOpen },
    { path: '/gallery', sectionId: 'gallery', label: 'Gallery', icon: Images },
    { path: '/contact', sectionId: 'contact', label: 'Contact', icon: Phone },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-asha-pink shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                scrollToSection('home')
              }
            }}
            className="flex items-center space-x-3"
          >
            <motion.img
              src={logo}
              alt="Asha Bhavan Logo"
              whileHover={{ scale: 1.05 }}
              className="h-12 w-auto sm:h-14"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:block text-xl sm:text-2xl font-bold text-asha-pink"
            >
              Asha Bhavan
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === '/' 
                ? activeSection === item.sectionId 
                : location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-asha-green text-white'
                      : 'text-gray-700 hover:bg-asha-pink/10 hover:text-asha-green'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              )
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-asha-green text-white hover:bg-asha-green/90"
              >
                <Shield size={18} />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === '/' 
                  ? activeSection === item.sectionId 
                  : location.pathname === item.path
                return (
                  <button
                    key={item.path}
                    onClick={(e) => handleNavClick(e, item.sectionId)}
                    className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors text-left ${
                      isActive
                        ? 'bg-asha-green text-white'
                        : 'text-gray-700 hover:bg-asha-pink/10 hover:text-asha-green'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-asha-green text-white"
                >
                  <Shield size={20} />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
