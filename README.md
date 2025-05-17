# Interactive Travel Itinerary Planner

A modern web app for planning travel itineraries with AI-powered suggestions.
Built for a frontend hackathon.

## Features

- 🎯 Drag-and-drop interface for organizing daily activities
- 🤖 AI-powered activity suggestions based on preferences
- 📱 Fully responsive design
- 💾 Auto-saves to localStorage
- ⌨️ Keyboard accessibility
- 🎨 Smooth animations with Framer Motion
- 🎯 Type-safe with TypeScript

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Drag & Drop**: dnd-kit
- **Animations**: Framer Motion
- **Type Safety**: TypeScript

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/itinerary-planner.git
cd itinerary-planner

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── suggestions/     # Mock AI suggestions API
│   └── page.tsx            # Main page
├── components/
│   ├── ItineraryBoard.tsx  # Main board component
│   ├── DayColumn.tsx       # Daily activity column
│   ├── ItineraryItem.tsx   # Activity card
│   └── AIRecommendationPanel.tsx
├── lib/
│   ├── store.ts           # Zustand store
│   └── utils.ts           # Helper functions
└── styles/
    └── globals.css        # Global styles
```

## Development

### Key Features Implementation

1. **Drag & Drop**

   - Uses dnd-kit for smooth drag operations
   - Supports both reordering and cross-day moves
   - Includes keyboard accessibility

2. **AI Suggestions**

   - Mock API with realistic delays
   - Preference-based filtering
   - Draggable suggestion cards

3. **State Management**

   - Zustand for global state
   - Persistent storage
   - Optimistic updates

4. **Responsive Design**
   - Mobile-first approach
   - Grid-based layout
   - Touch-friendly interactions

### Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this for your hackathon!

## Acknowledgments

- dnd-kit for the amazing drag-and-drop library
- Framer Motion for smooth animations
- Tailwind CSS for the utility-first approach
