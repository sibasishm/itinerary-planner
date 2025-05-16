import { useDroppable } from '@dnd-kit/core';
import { ItineraryItem } from './itinerary-item';
import { ItineraryItem as ItineraryItemType } from '@/lib/state';

interface Props {
	day: number;
	items: ItineraryItemType[];
}

export function DayColumn({ day, items }: Props) {
	const { setNodeRef } = useDroppable({
		id: `day-${day}`,
	});

	return (
		<div className='flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4'>
			<h2 className='text-xl font-bold mb-4'>Day {day}</h2>
			<div ref={setNodeRef} className='space-y-4 min-h-[200px]'>
				{items.map(item => (
					<ItineraryItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}
