import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DUMMY_DATA } from '../constants'

export const useStore = create(
  persist(
    set => ({
      // Admin authentication
      isAdmin: false,
      adminToken: null,
      setAdmin: token => set({ isAdmin: true, adminToken: token }),
      logout: () => set({ isAdmin: false, adminToken: null }),

      // Home page data - Using dummy data from constants
      sliderImages: DUMMY_DATA.GALLERY.programs.slice(0, 3),
      headOfInstitute: DUMMY_DATA.HEAD_OF_INSTITUTE,

      // About page data - Using dummy data from constants
      aboutData: DUMMY_DATA.ABOUT,

      // Gallery data - Using dummy data from constants
      gallery: DUMMY_DATA.GALLERY,

      // Faculties data - Using dummy data from constants
      faculties: DUMMY_DATA.FACULTIES,
      facultyVideos: DUMMY_DATA.FACULTY_VIDEOS,

      // Contact data - Using dummy data from constants
      contactInfo: DUMMY_DATA.CONTACT,

      // Update functions
      updateSliderImages: images => set({ sliderImages: images }),
      updateHeadOfInstitute: data => set({ headOfInstitute: data }),
      updateAboutData: data => set({ aboutData: data }),
      updateGallery: data => set({ gallery: data }),
      updateFaculties: faculties => set({ faculties }),
      updateContactInfo: info => set({ contactInfo: info }),
    }),
    {
      name: 'ashabhavan-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
