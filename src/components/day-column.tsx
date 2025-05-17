'use client';

import { useDroppable } from '@dnd-kit/core';
import { ItineraryItem } from './itinerary-item';
import { useItineraryStore } from '@/lib/store';

interface Props {
	day: number;
}

export function DayColumn({ day }: Props) {
	const { setNodeRef } = useDroppable({
		id: `day-${day}`,
	});

	const items = useItineraryStore(state =>
		state.items.filter(item => item.day === day)
	);

	return (
		<div
			ref={setNodeRef}
			className='min-h-[200px] space-y-4 p-2 bg-indigo-50/50 rounded-lg'
		>
			{items.map(item => (
				<ItineraryItem key={item.id} item={item} />
			))}
			{items.length === 0 && (
				<div className='h-24 flex items-center justify-center text-gray-400 text-sm'>
					Drop activities here
				</div>
			)}
		</div>
	);
}
