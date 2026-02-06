// frontend/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // The "Elder Mode" State
  isSadhaMode: boolean;
  toggleSadhaMode: () => void;
  
  // Audio State (Muted by default)
  isMuted: boolean;
  toggleMute: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Default: Animations ON, Audio OFF
      isSadhaMode: false, 
      isMuted: true,

      toggleSadhaMode: () => set((state) => ({ isSadhaMode: !state.isSadhaMode })),
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    }),
    {
      name: 'reshimgaath-storage', // Saves to localStorage
    }
  )
);