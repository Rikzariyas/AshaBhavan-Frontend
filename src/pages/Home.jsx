import { motion } from 'framer-motion'
import ImageSlider from '../components/ImageSlider'
import { DUMMY_IMAGES } from '../constants'

export default function Home() {
  const displaySliderImages = DUMMY_IMAGES.SLIDER

  return (
    <div id="home" className="pt-20 min-h-screen">
      {/* Hero Section with Slider */}
      <section className="mb-16 px-2 sm:px-6 lg:px-8">
        <ImageSlider images={displaySliderImages} />
      </section>
    </div>
  )
}
