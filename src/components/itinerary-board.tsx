import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { DayColumn } from './day-column';
import { useItineraryStore } from '@/lib/state';

export function ItineraryBoard() {
	const { items, moveItem } = useItineraryStore();

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		const activeId = active.id as string;
		const overId = over.id as string;

		if (overId.startsWith('day-')) {
			const day = parseInt(overId.split('-')[1]);
			moveItem(activeId, day);
		}
	};

	const days = [1, 2, 3, 4, 5]; // Example: 5-day itinerary

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='flex gap-4 p-4 overflow-x-auto'>
				{days.map(day => (
					<DayColumn
						key={day}
						day={day}
						items={items.filter(item => item.day === day)}
					/>
				))}
			</div>
		</DndContext>
	);
}
