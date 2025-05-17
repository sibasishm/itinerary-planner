import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { debounce } from './utils'

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

const initialItems: Omit<ItineraryItem, 'id'>[] = [
  {
    title: 'Morning Coffee',
    description: 'Start your day with a local coffee shop visit',
    day: 1,
    time: '9:00',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
  },
  {
    title: 'City Tour',
    description: 'Explore the main attractions of the city',
    day: 1,
    time: '11:00',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df'
  },
  {
    title: 'Lunch Break',
    description: 'Enjoy local cuisine at a recommended restaurant',
    day: 2,
    time: '13:00',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
  }
]

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set, get) => ({
      items: initialItems.map(item => ({ ...item, id: crypto.randomUUID() })),
      suggestions: [],
      isLoading: false,
      addItem: (item) => {
        set((state) => ({
          items: [...state.items, { ...item, id: crypto.randomUUID() }]
        }))
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },
      moveItem: (id, day) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, day } : item
          )
        }))
      },
      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, ...updates } : item
          )
        }))
      },
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        console.log('State rehydrated:', state)
      }
    }
  )
)

// Auto-save on state changes
const autoSave = debounce(() => {
  const state = useItineraryStore.getState()
  localStorage.setItem('itinerary-storage', JSON.stringify({ state: { items: state.items } }))
}, 500)

useItineraryStore.subscribe((state) => {
  autoSave()
}) 