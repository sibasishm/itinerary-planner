import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
} from '@dnd-kit/core';
import { DayColumn } from './day-column';
import { useItineraryStore } from '@/lib/state';
import { useState } from 'react';
import { ItineraryItem } from './itinerary-item';

export function ItineraryBoard() {
	const { items, moveItem } = useItineraryStore();
	const [activeId, setActiveId] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id.toString());
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		const activeId = active.id as string;
		const overId = over.id as string;

		if (overId.startsWith('day-')) {
			const day = parseInt(overId.split('-')[1]);
			moveItem(activeId, day);
		}

		setActiveId(null);
	};

	const handleDragCancel = () => {
		setActiveId(null);
	};

	const days = [1, 2, 3, 4, 5]; // Example: 5-day itinerary
	const activeItem = items.find(item => item.id === activeId);

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
		>
			<div className='flex gap-4 p-4 overflow-x-auto min-h-[600px]'>
				{days.map(day => (
					<DayColumn
						key={day}
						day={day}
						items={items.filter(item => item.day === day)}
					/>
				))}
			</div>
			<DragOverlay>
				{activeId && activeItem ? <ItineraryItem item={activeItem} /> : null}
			</DragOverlay>
		</DndContext>
	);
}
