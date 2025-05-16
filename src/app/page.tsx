'use client';

import { ItineraryBoard } from '@/components/itinerary-board';
import { AIRecommendationPanel } from '@/components/ai-recommendation-panel';

export default function Home() {
	return (
		<main className='min-h-screen bg-gray-100'>
			<div className='container mx-auto py-8 px-4'>
				<h1 className='text-3xl font-bold mb-8 text-center'>
					Interactive Itinerary Board
				</h1>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-2'>
						<ItineraryBoard />
					</div>
					<div>
						<AIRecommendationPanel />
					</div>
				</div>
			</div>
		</main>
	);
}
