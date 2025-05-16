import { useState } from 'react';
import { motion } from 'framer-motion';
import { useItineraryStore } from '@/lib/state';

export function AIRecommendationPanel() {
	const [interests, setInterests] = useState<string[]>([]);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const { fetchSuggestions, suggestions, isLoading } = useItineraryStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await fetchSuggestions({ interests, startDate, endDate });
	};

	const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInterests(
			value
				.split(',')
				.map(i => i.trim())
				.filter(Boolean)
		);
	};

	return (
		<div className='bg-white rounded-lg shadow-md p-6'>
			<h2 className='text-2xl font-bold mb-4'>AI Recommendations</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Interests (comma-separated)
					</label>
					<input
						type='text'
						className='w-full px-3 py-2 border border-gray-300 rounded-md'
						placeholder='e.g., museums, food, nature'
						onChange={handleInterestChange}
					/>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Start Date
						</label>
						<input
							type='date'
							className='w-full px-3 py-2 border border-gray-300 rounded-md'
							value={startDate}
							onChange={e => setStartDate(e.target.value)}
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							End Date
						</label>
						<input
							type='date'
							className='w-full px-3 py-2 border border-gray-300 rounded-md'
							value={endDate}
							onChange={e => setEndDate(e.target.value)}
						/>
					</div>
				</div>
				<button
					type='submit'
					disabled={isLoading}
					className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50'
				>
					{isLoading ? 'Loading...' : 'Get Suggestions'}
				</button>
			</form>

			{suggestions.length > 0 && (
				<div className='mt-6'>
					<h3 className='text-lg font-semibold mb-3'>Suggested Activities</h3>
					<div className='space-y-3'>
						{suggestions.map(item => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className='bg-gray-50 p-4 rounded-md'
							>
								<div className='flex items-start justify-between'>
									<div>
										<h4 className='font-medium'>{item.title}</h4>
										<p className='text-sm text-gray-600 mt-1'>
											{item.description}
										</p>
									</div>
									<span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
										Suggested
									</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
