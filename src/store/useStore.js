import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
  persist(
    set => ({
      // Admin authentication - Only persist auth state
      isAdmin: false,
      adminToken: null,
      setAdmin: token => set({ isAdmin: true, adminToken: token }),
      logout: () => set({ isAdmin: false, adminToken: null }),

      // Dynamic data from API (will be populated when backend is ready)
      // For now, these are null - components will use constants as fallback
      sliderImages: null,
      headOfInstitute: null,
      aboutData: null,
      gallery: null,
      courses: null,
      courseVideos: null,
      contactInfo: null,

      // Update functions for API data
      updateSliderImages: images => set({ sliderImages: images }),
      updateHeadOfInstitute: data => set({ headOfInstitute: data }),
      updateAboutData: data => set({ aboutData: data }),
      updateGallery: data => set({ gallery: data }),
      updateCourses: courses => set({ courses }),
      updateCourseVideos: videos => set({ courseVideos: videos }),
      updateContactInfo: info => set({ contactInfo: info }),
    }),
    {
      name: 'ashabhavan-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist auth state, not all the data
      partialize: state => ({
        isAdmin: state.isAdmin,
        adminToken: state.adminToken,
      }),
    }
  )
)
