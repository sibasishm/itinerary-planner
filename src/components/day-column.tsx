import { useDroppable } from '@dnd-kit/core';
import { ItineraryItem } from './itinerary-item';
import { ItineraryItem as ItineraryItemType } from '@/lib/state';

interface Props {
	day: number;
	items: ItineraryItemType[];
}

export function DayColumn({ day, items }: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id: `day-${day}`,
	});

	return (
		<div
			className={`flex-1 min-w-[300px] bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-lg transition-colors ${
				isOver ? 'bg-indigo-50/50' : ''
			}`}
		>
			<h2 className='text-xl font-bold mb-4 text-gray-800'>Day {day}</h2>
			<div
				ref={setNodeRef}
				className={`space-y-4 min-h-[500px] p-2 rounded-lg transition-colors ${
					isOver ? 'bg-indigo-100/30' : ''
				}`}
			>
				{items.map(item => (
					<ItineraryItem key={item.id} item={item} />
				))}
				{items.length === 0 && (
					<div className='h-full flex items-center justify-center text-gray-400 text-sm'>
						Drop items here
					</div>
				)}
			</div>
		</div>
	);
}
