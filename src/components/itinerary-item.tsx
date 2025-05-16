import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { ItineraryItem as ItineraryItemType } from '@/lib/state';
import Image from 'next/image';

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
	};

	return (
		<motion.div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md cursor-move hover:shadow-lg transition-all border border-gray-100 ${
				isDragging ? 'opacity-50 shadow-xl scale-105' : ''
			}`}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			{item.image && (
				<div className='relative w-full h-32 mb-3 rounded-md overflow-hidden'>
					<Image
						src={item.image}
						alt={item.title}
						fill
						className='object-cover'
					/>
				</div>
			)}
			<div className='flex items-start justify-between'>
				<div>
					<h3 className='font-semibold text-lg text-gray-800'>{item.title}</h3>
					<p className='text-gray-600 text-sm mt-1'>{item.description}</p>
					<div className='text-indigo-600 text-xs mt-2 font-medium'>
						{item.time}
					</div>
				</div>
				{item.isSuggested && (
					<span className='bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium'>
						Suggested
					</span>
				)}
			</div>
		</motion.div>
	);
}
