import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
  persist(
    set => ({
      // Admin authentication only
      isAdmin: false,
      adminToken: null,
      setAdmin: token => set({ isAdmin: true, adminToken: token }),
      logout: () => set({ isAdmin: false, adminToken: null }),
    }),
    {
      name: 'ashabhavan-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist auth state
      partialize: state => ({
        isAdmin: state.isAdmin,
        adminToken: state.adminToken,
      }),
    }
  )
)
