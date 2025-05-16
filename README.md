# Interactive Itinerary Board

A modern web application for planning and organizing travel itineraries with
AI-powered suggestions.

## Features

- Drag and drop interface for organizing activities
- AI-powered activity suggestions based on interests
- Responsive design with smooth animations
- Persistent storage using localStorage
- TypeScript for type safety

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- dnd-kit (Drag and Drop)
- Framer Motion (Animations)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── suggestions/
│   │       └── route.ts    # API endpoint for AI suggestions
│   └── page.tsx            # Main page component
├── components/
│   ├── ai-recommendation-panel.tsx
│   ├── day-column.tsx
│   ├── itinerary-board.tsx
│   └── itinerary-item.tsx
└── lib/
    └── state.ts            # Zustand store
```

## AI Integration

The current implementation uses mock data for suggestions. To integrate with a
real AI service:

1. Create an account with OpenAI
2. Add your API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
3. Update the `/api/suggestions/route.ts` file to use the OpenAI API instead of
   mock data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
