
import React, { useState, useMemo, useEffect } from 'react';
import { Post, BlogCategory, User } from '../types';
import PostCard from '../components/PostCard';

interface HomeProps {
  posts: Post[];
  onSelectPost: (id: string) => void;
  onDeletePost: (id: string) => void;
  initialCategory?: string;
  onNavigateToCreate?: () => void;
  currentUser: User | null;
}

const Home: React.FC<HomeProps> = ({ posts, onSelectPost, onDeletePost, initialCategory, onNavigateToCreate, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'All');

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  const featuredPost = filteredPosts.length > 0 && activeCategory === 'All' && searchQuery === '' ? filteredPosts[0] : null;
  const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  const categories = ['All', ...Object.values(BlogCategory)];

  return (
    <div className="pt-32 md:pt-48 pb-20">
      {/* Featured Narrative */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-20 md:mb-32 reveal">
          <div onClick={() => onSelectPost(featuredPost.id)} className="group cursor-pointer relative w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-gray-900 dark:bg-black shadow-2xl transition-all">
            <div className="aspect-[4/5] sm:aspect-[21/9]">
              <img src={featuredPost.coverImage} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 transition-transform duration-[3s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-black via-transparent to-transparent"></div>
              
              <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-end max-w-5xl">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-5 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] shadow-2xl">Editor's Focus</span>
                  <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{featuredPost.category}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-8xl font-black text-white mb-8 leading-[1] tracking-tighter serif italic">
                  {featuredPost.title}
                </h1>
                <p className="hidden md:block text-xl text-white/70 mb-12 line-clamp-2 max-w-3xl font-medium leading-relaxed italic">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center font-black text-white text-xs ring-1 ring-white/20">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black uppercase tracking-tighter text-sm">{featuredPost.author}</p>
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-1">{featuredPost.date} • {featuredPost.readTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Modern Filter Engine */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20 border-b border-gray-100 dark:border-white/5 pb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 italic leading-none serif">The Archive.</h2>
            <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Navigating the digital landscape.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 w-full xl:w-auto">
            <div className="relative group w-full lg:w-80">
              <input 
                type="text"
                placeholder="Search Narratives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4.5 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl shadow-gray-200/20 dark:shadow-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all text-xs font-black uppercase tracking-widest placeholder-gray-300 dark:placeholder-white/10 dark:text-white"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex space-x-1 p-1 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-x-auto scrollbar-hide shadow-xl shadow-gray-200/20 dark:shadow-none min-w-0">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10 scale-105' 
                    : 'text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Narrative Matrix */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {gridPosts.map((post, idx) => (
              <div key={post.id} className="reveal" style={{ transitionDelay: `${(idx % 3) * 150}ms` }}>
                <PostCard 
                  post={post} 
                  onClick={onSelectPost} 
                  onDelete={currentUser?.role === 'admin' || currentUser?.id === post.authorId ? onDeletePost : undefined} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl grayscale opacity-50">🏜️</div>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic serif">Empty Results.</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-4">No content matched your current parameters.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-10 px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black dark:hover:bg-gray-200 transition-all shadow-2xl active:scale-95"
            >
              Reset Terminal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
