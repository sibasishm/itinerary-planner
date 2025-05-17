'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ItineraryItem as ItineraryItemType } from '@/lib/store';
import Image from 'next/image';
import { formatTime } from '@/lib/utils';

interface Props {
	item: ItineraryItemType;
}

export function ItineraryItem({ item }: Props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: item.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className='bg-white rounded-lg shadow-sm p-4 cursor-grab active:cursor-grabbing touch-none'
		>
			<div className='flex gap-4'>
				{item.image && (
					<div className='relative w-20 h-20 flex-shrink-0'>
						<Image
							src={item.image}
							alt={item.title}
							fill
							className='object-cover rounded-md'
						/>
					</div>
				)}
				<div className='flex-1 min-w-0'>
					<div className='flex items-start justify-between gap-2'>
						<h3 className='font-medium text-gray-900 truncate'>{item.title}</h3>
						<span className='text-sm text-indigo-600 font-medium whitespace-nowrap'>
							{formatTime(item.time)}
						</span>
					</div>
					<p className='text-sm text-gray-500 mt-1 line-clamp-2'>
						{item.description}
					</p>
				</div>
			</div>
		</div>
	);
}
