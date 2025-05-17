import { ItineraryItem } from './state'

export const formatTime = (time: string) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

export const generateMockSuggestions = (interests: string[]): Omit<ItineraryItem, 'id'>[] => {
  const suggestions: Omit<ItineraryItem, 'id'>[] = []

  if (interests.includes('museums')) {
    suggestions.push({
      title: 'Museum of Modern Art',
      description: 'Explore contemporary art collections',
      time: '10:00',
      day: 1,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945'
    })
  }

  if (interests.includes('food')) {
    suggestions.push({
      title: 'Local Food Tour',
      description: 'Taste authentic local cuisine',
      time: '13:00',
      day: 1,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'
    })
  }

  if (interests.includes('nature')) {
    suggestions.push({
      title: 'Botanical Gardens',
      description: 'Stroll through beautiful gardens',
      time: '15:00',
      day: 1,
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae'
    })
  }

  return suggestions
}

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const getDayLabel = (day: number) => {
  const date = new Date()
  date.setDate(date.getDate() + day - 1)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
} 