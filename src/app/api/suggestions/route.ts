import { NextResponse } from 'next/server'
import { generateMockSuggestions } from '@/lib/utils'

export async function POST(request: Request) {
  const { interests } = await request.json()

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const suggestions = generateMockSuggestions(interests)
  return NextResponse.json(suggestions)
} 