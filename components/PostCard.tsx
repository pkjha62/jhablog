
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: (id: string) => void;
  onDelete?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, onDelete }) => {
  return (
    <div 
      onClick={() => onClick(post.id)}
      className="group cursor-pointer flex flex-col h-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.15)] transition-all duration-700 overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] m-3">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 dark:from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="absolute top-5 left-5">
          <span className="px-4 py-2 bg-white/95 dark:bg-black/80 backdrop-blur-xl text-[9px] font-black text-indigo-600 dark:text-indigo-400 rounded-full uppercase tracking-[0.15em] shadow-lg">
            {post.category}
          </span>
        </div>
        
        {onDelete && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(post.id); }}
            className="absolute top-5 right-5 w-10 h-10 bg-red-500/10 backdrop-blur-xl text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100 border border-red-500/20 flex items-center justify-center"
            title="Remove Article"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        )}

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
           <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Read Perspective</span>
           <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-2xl">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
           </div>
        </div>
      </div>
      
      <div className="px-8 pb-10 pt-5 flex flex-col flex-grow">
        <div className="flex items-center text-[9px] font-black text-gray-400 dark:text-gray-500 mb-6 space-x-2 uppercase tracking-[0.2em]">
          <span>{post.date}</span>
          <span className="text-indigo-200 dark:text-indigo-900 opacity-30">•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-5 leading-tight tracking-tighter serif italic">
          {post.title}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-8 flex-grow font-medium leading-relaxed italic">
          {post.excerpt}
        </p>
        
        <div className="flex items-center space-x-4 mt-auto pt-8 border-t border-gray-50 dark:border-white/5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-black shadow-inner">
            {post.author.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tighter">{post.author}</span>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Narrative Architect</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
