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
		<div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100'>
			<h2 className='text-2xl font-bold mb-4 text-gray-800'>
				AI Recommendations
			</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Interests (comma-separated)
					</label>
					<input
						type='text'
						className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors'
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
							className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors'
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
							className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors'
							value={endDate}
							onChange={e => setEndDate(e.target.value)}
						/>
					</div>
				</div>
				<button
					type='submit'
					disabled={isLoading}
					className='w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors font-medium'
				>
					{isLoading ? 'Loading...' : 'Get Suggestions'}
				</button>
			</form>

			{suggestions.length > 0 && (
				<div className='mt-6'>
					<h3 className='text-lg font-semibold mb-3 text-gray-800'>
						Suggested Activities
					</h3>
					<div className='space-y-3'>
						{suggestions.map(item => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className='bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
							>
								<div className='flex items-start justify-between'>
									<div>
										<h4 className='font-medium text-gray-800'>{item.title}</h4>
										<p className='text-sm text-gray-600 mt-1'>
											{item.description}
										</p>
									</div>
									<span className='bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium'>
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
