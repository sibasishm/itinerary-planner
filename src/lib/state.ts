import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ItineraryItem {
  id: string
  title: string
  description: string
  day: number
  time: string
  image?: string
  isSuggested?: boolean
}

export interface SuggestionParams {
  interests: string[]
  startDate: string
  endDate: string
}

interface ItineraryState {
  items: ItineraryItem[]
  suggestions: ItineraryItem[]
  isLoading: boolean
  addItem: (item: Omit<ItineraryItem, 'id'>) => void
  removeItem: (id: string) => void
  moveItem: (id: string, day: number) => void
  updateItem: (id: string, updates: Partial<ItineraryItem>) => void
  fetchSuggestions: (params: SuggestionParams) => Promise<void>
}

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set) => ({
      items: [],
      suggestions: [],
      isLoading: false,
      addItem: (item) => set((state) => ({
        items: [...state.items, { ...item, id: crypto.randomUUID() }]
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      moveItem: (id, day) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, day } : item
        )
      })),
      updateItem: (id, updates) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, ...updates } : item
        )
      })),
      fetchSuggestions: async (params) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
          })
          const data = await response.json()
          set({
            suggestions: data.map((item: Omit<ItineraryItem, 'id' | 'isSuggested'>) => ({
              ...item,
              id: crypto.randomUUID(),
              isSuggested: true
            }))
          })
        } catch (error) {
          console.error('Failed to fetch suggestions:', error)
        } finally {
          set({ isLoading: false })
        }
      }
    }),
    {
      name: 'itinerary-storage',
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        console.log('State rehydrated:', state)
      }
    }
  )
) 