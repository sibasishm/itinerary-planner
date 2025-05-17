'use client';

import { useState } from 'react';
import {
	DndContext,
	DragStartEvent,
	DragEndEvent,
	DragOverlay,
	useSensor,
	useSensors,
	PointerSensor,
	TouchSensor,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { DayColumn } from './day-column';
import { ItineraryItem } from './itinerary-item';
import { useItineraryStore } from '@/lib/store';
import { getDayLabel } from '@/lib/utils';

export function ItineraryBoard() {
	const [activeId, setActiveId] = useState<string | null>(null);
	const items = useItineraryStore(state => state.items);
	const moveItem = useItineraryStore(state => state.moveItem);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id.toString());
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = items.findIndex(item => item.id === active.id);
			const newIndex = items.findIndex(item => item.id === over.id);
			const newItems = arrayMove(items, oldIndex, newIndex);
			moveItem(active.id.toString(), newItems[newIndex].day);
		}

		setActiveId(null);
	};

	const activeItem = items.find(item => item.id === activeId);

	return (
		<div className='space-y-4'>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{[1, 2, 3].map(day => (
						<div key={day} className='bg-white rounded-lg shadow-sm p-4'>
							<h2 className='text-lg font-semibold text-indigo-900 mb-4'>
								{getDayLabel(day)}
							</h2>
							<SortableContext
								items={items
									.filter(item => item.day === day)
									.map(item => item.id)}
							>
								<DayColumn day={day} />
							</SortableContext>
						</div>
					))}
				</div>
				<DragOverlay>
					{activeItem && <ItineraryItem item={activeItem} />}
				</DragOverlay>
			</DndContext>
		</div>
	);
}
