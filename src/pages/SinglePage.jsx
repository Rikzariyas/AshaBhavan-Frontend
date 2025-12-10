import Home from './Home'
import About from './About'
import Management from './Management'
import DirectorProfile from './DirectorProfile'
import Campus from './Campus'
import Courses from './Courses'
import Gallery from './Gallery'
import Contact from './Contact'
import VideoSection from './VideoSection'

export default function SinglePage() {
  return (
    <>
      <Home />
      <About />
      <DirectorProfile />
      <Management />
      <Campus />
      <Courses />
      <Gallery />
      <VideoSection />
      <Contact />
    </>
  )
}
