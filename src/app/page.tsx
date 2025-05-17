'use client';

import { useEffect, useState } from 'react';
import { ItineraryBoard } from '@/components/itinerary-board';
import { AIRecommendationPanel } from '@/components/ai-recommendation-panel';
import { useItineraryStore } from '@/lib/store';

export default function Home() {
	const [isHydrated, setIsHydrated] = useState(false);
	const fetchSuggestions = useItineraryStore(state => state.fetchSuggestions);

	useEffect(() => {
		// Hydrate the store
		useItineraryStore.persist.rehydrate();
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (isHydrated) {
			fetchSuggestions({
				interests: ['museums', 'food', 'nature'],
				startDate: new Date().toISOString(),
				endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
			});
		}
	}, [fetchSuggestions, isHydrated]);

	if (!isHydrated) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50'>
				<div className='text-indigo-600'>Loading...</div>
			</div>
		);
	}

	return (
		<main className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50'>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-4xl font-bold text-indigo-900 mb-8 text-center'>
					Interactive Itinerary Board
				</h1>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					<div className='lg:col-span-3'>
						<ItineraryBoard />
					</div>
					<div className='lg:col-span-1'>
						<div className='sticky top-8'>
							<AIRecommendationPanel />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
