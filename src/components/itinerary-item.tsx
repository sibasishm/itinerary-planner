import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { ItineraryItem as ItineraryItemType } from '@/lib/state';

interface Props {
	item: ItineraryItemType;
}

export function ItineraryItem({ item }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: item.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<motion.div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className='bg-white p-4 rounded-lg shadow-md cursor-move hover:shadow-lg transition-shadow'
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<h3 className='font-semibold text-lg'>{item.title}</h3>
			<p className='text-gray-600 text-sm mt-1'>{item.description}</p>
			<div className='text-gray-500 text-xs mt-2'>{item.time}</div>
		</motion.div>
	);
}
