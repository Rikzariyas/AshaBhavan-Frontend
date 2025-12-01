import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DUMMY_IMAGES } from '../constants'

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Safety check: ensure images is an array
  const imageArray =
    Array.isArray(images) && images.length > 0 ? images : [DUMMY_IMAGES.PLACEHOLDER]

  useEffect(() => {
    if (imageArray.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % imageArray.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [imageArray.length])

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + imageArray.length) % imageArray.length)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % imageArray.length)
  }

  return (
    <div className="relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={imageArray[currentIndex] || DUMMY_IMAGES.PLACEHOLDER}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={e => {
              e.target.src = DUMMY_IMAGES.PLACEHOLDER
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {imageArray.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
