
import React from 'react';
import { BlogCategory } from '../types';

interface CategoriesViewProps {
  onSelectCategory: (category: string) => void;
}

const CATEGORY_META: Record<string, { description: string, icon: string, color: string }> = {
  [BlogCategory.TECH]: { description: 'Hardware and digital frontiers.', icon: '💻', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  [BlogCategory.LIFESTYLE]: { description: 'Living in the connected age.', icon: '☕', color: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400' },
  [BlogCategory.AI]: { description: 'Evolution of machine intelligence.', icon: '🧠', color: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
  [BlogCategory.DESIGN]: { description: 'UX and visual storytelling.', icon: '🎨', color: 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400' },
  [BlogCategory.TRAVEL]: { description: 'Global nomad perspectives.', icon: '✈️', color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  [BlogCategory.BUSINESS]: { description: 'Entrepreneurship and finance.', icon: '📈', color: 'bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400' },
};

const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <div className="text-center max-w-4xl mx-auto mb-32 reveal active">
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter serif italic">Explore Sectors.</h1>
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium italic">Navigating the intersections of modern thought.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
        {Object.values(BlogCategory).map((cat) => (
          <div key={cat} onClick={() => onSelectCategory(cat)} className="group cursor-pointer bg-white dark:bg-slate-900 p-12 md:p-16 rounded-[3.5rem] border border-gray-100 dark:border-white/5 shadow-2xl hover:shadow-indigo-500/15 transition-all duration-700 transform hover:-translate-y-3">
            <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl mb-12 transition-all group-hover:scale-110 group-hover:rotate-3 shadow-inner ${CATEGORY_META[cat]?.color}`}>
              {CATEGORY_META[cat]?.icon || '📄'}
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors serif italic">{cat}</h3>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10 italic">
              {CATEGORY_META[cat]?.description}
            </p>
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">
              Access Archives
              <svg className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesView;
