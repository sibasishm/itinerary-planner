'use client';

import { ItineraryBoard } from '@/components/itinerary-board';

export default function Home() {
	return (
		<main className='min-h-screen bg-gray-100'>
			<div className='container mx-auto py-8'>
				<h1 className='text-3xl font-bold mb-8 text-center'>
					Interactive Itinerary Board
				</h1>
				<ItineraryBoard />
			</div>
		</main>
	);
}
