import { NextResponse } from 'next/server'

const mockSuggestions = [
  {
    title: 'Visit the Louvre Museum',
    description: 'World\'s largest art museum and a historic monument in Paris',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989'
  },
  {
    title: 'Eiffel Tower Tour',
    description: 'Iconic iron lattice tower on the Champ de Mars in Paris',
    time: '2:00 PM',
    image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e'
  },
  {
    title: 'Seine River Cruise',
    description: 'Scenic boat tour along the Seine River',
    time: '4:00 PM',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
  }
]

export async function POST(request: Request) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return NextResponse.json(mockSuggestions)
} 