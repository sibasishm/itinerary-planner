import { create } from 'zustand'

export interface ItineraryItem {
  id: string
  title: string
  description: string
  day: number
  time: string
}

interface ItineraryState {
  items: ItineraryItem[]
  addItem: (item: Omit<ItineraryItem, 'id'>) => void
  removeItem: (id: string) => void
  moveItem: (id: string, day: number) => void
  updateItem: (id: string, updates: Partial<ItineraryItem>) => void
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  items: [],
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
  }))
})) 