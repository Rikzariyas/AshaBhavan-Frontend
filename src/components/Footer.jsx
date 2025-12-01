import { Link, useLocation } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

export default function Footer() {
  const { contactInfo } = useStore()
  const location = useLocation()

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
  }

  const handleLinkClick = (e, sectionId) => {
    if (location.pathname === '/') {
      e.preventDefault()
      scrollToSection(sectionId)
    } else {
      // Navigate to home with hash
      window.location.href = `/#${sectionId}`
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">AshaBhavan Trust</h3>
            <p className="text-gray-400">
              Dedicated to providing quality education and holistic development
              to every student.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/courses" 
                  onClick={(e) => handleLinkClick(e, 'courses')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  onClick={(e) => handleLinkClick(e, 'gallery')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-asha-pink" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-400 hover:text-asha-pink transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-asha-pink" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400 hover:text-asha-pink transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-asha-pink" />
                <span className="text-gray-400">{contactInfo.address}</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AshaBhavan Trust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
