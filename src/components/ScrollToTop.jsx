import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight

      // Calculate progress (0 to 100)
      const progress =
        scrollableHeight > 0 ? Math.min(100, Math.round((scrollTop / scrollableHeight) * 100)) : 0

      setScrollProgress(progress)

      // Show button when page is scrolled down 300px
      if (scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', calculateScrollProgress)
    // Calculate on initial load
    calculateScrollProgress()

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // SVG circle calculations
  const size = 56 // Button size
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (scrollProgress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="relative">
            {/* Progress Circle */}
            <svg
              className="transform -rotate-90"
              width={size}
              height={size}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(255, 182, 193, 0.2)"
                strokeWidth={strokeWidth}
              />
              {/* Progress circle */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#FFB6C1"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="relative w-14 h-14 bg-asha-pink hover:bg-asha-pink-dark text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-asha-pink focus:ring-offset-2 flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ChevronUp size={24} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
