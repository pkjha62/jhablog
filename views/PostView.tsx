
import React, { useEffect, useState, useCallback } from 'react';
import { Post, User } from '../types';

interface PostViewProps {
  post: Post;
  onBack: () => void;
  onDelete?: () => void;
  currentUser: User | null;
}

const PostView: React.FC<PostViewProps> = ({ post, onBack, onDelete, currentUser }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{author: string, text: string, date: string}[]>([
    { author: 'Elena Sterling', text: 'The depth of analysis here regarding the current landscape is unparalleled. Truly a visionary perspective.', date: 'Oct 28, 2024' }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePostComment = useCallback(() => {
    if (!comment.trim()) return;
    setComments([{ author: currentUser?.name || 'Anonymous Reader', text: comment, date: 'Just now' }, ...comments]);
    setComment('');
  }, [comment, currentUser, comments]);

  const openSocial = (platform: string, handle: string | undefined) => {
    if (!handle) return;
    const urls: any = {
      linkedin: `https://linkedin.com/in/${handle}`,
      x: `https://x.com/${handle}`,
      instagram: `https://instagram.com/${handle}`,
      email: `mailto:${handle}`
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="fixed top-0 left-0 w-full h-1 z-[110] pointer-events-none">
        <div className="h-full bg-indigo-600 transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.8)]" style={{ width: `${readingProgress}%` }}></div>
      </div>

      <header className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-gray-900 dark:bg-black overflow-hidden">
        <img src={post.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 scale-105 animate-float" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-black/30"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center reveal active">
          <button onClick={onBack} className="mb-12 inline-flex items-center space-x-3 text-white hover:scale-105 transition-all group">
            <div className="w-12 h-12 rounded-2xl border-2 border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-all shadow-2xl">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Feed</span>
          </button>
          
          <div className="mb-8">
            <span className="px-8 py-3 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] shadow-2xl">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white mb-12 leading-[0.95] tracking-tighter serif italic">
            {post.title}
          </h1>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-5 bg-white/10 dark:bg-black/40 backdrop-blur-2xl rounded-[1.5rem] px-8 py-4 border border-white/20 shadow-2xl">
                <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-xl">{post.author.charAt(0)}</div>
                <div className="text-left">
                   <p className="text-xs font-black text-white uppercase tracking-widest leading-none">{post.author}</p>
                   <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-1.5">{post.date} • {post.readTime}</p>
                </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        <aside className="hidden xl:block col-span-1 pt-40">
           <div className="sticky top-48 flex flex-col items-center space-y-12">
             <div className="flex flex-col items-center space-y-3">
                <button className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all shadow-xl hover:shadow-red-500/20 group">
                   <svg className="w-7 h-7 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Applaud</span>
             </div>
             <div className="flex flex-col items-center space-y-3">
                <button className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/20 group">
                   <svg className="w-7 h-7 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Relay</span>
             </div>
           </div>
        </aside>

        <div className="col-span-1 lg:col-span-8 lg:col-start-2 xl:col-start-3 pt-20 md:pt-40">
          <div className="prose prose-xl md:prose-2xl prose-indigo dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-[1.8] font-medium reveal active">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} className="mb-12 first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-indigo-600 first-letter:leading-none serif italic">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-32 p-10 md:p-16 bg-gray-50 dark:bg-white/5 rounded-[3rem] border border-gray-100 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-10 reveal">
             <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
               <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl">{post.author.charAt(0)}</div>
               <div>
                  <h4 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">{post.author}</h4>
                  <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Senior Architecture Strategist</p>
               </div>
             </div>
             <div className="flex space-x-4">
                {['linkedin', 'email'].map(plt => (
                  <button key={plt} onClick={() => openSocial(plt, (post.authorSocials as any)?.[plt])} className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-xl hover:-translate-y-1">
                    {plt === 'linkedin' ? <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
                  </button>
                ))}
             </div>
          </div>

          <section className="mt-40 pb-40 reveal">
             <div className="flex items-center justify-between mb-16">
                <h3 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter italic serif leading-none">The Debate.</h3>
                <div className="px-6 py-2.5 bg-indigo-50 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-white/10">{comments.length} Thoughts</div>
             </div>

             <div className="bg-gray-50 dark:bg-white/5 p-10 md:p-12 rounded-[4rem] border border-gray-100 dark:border-white/10 mb-20 shadow-2xl shadow-indigo-100/10 transition-all focus-within:ring-4 focus-within:ring-indigo-600/5">
               <textarea rows={4} placeholder={currentUser ? "Broadcast your unique perspective..." : "Authorize to join the collective debate."} value={comment} disabled={!currentUser} onChange={(e) => setComment(e.target.value)} className="w-full bg-transparent border-none p-0 focus:ring-0 text-2xl font-medium text-gray-700 dark:text-gray-300 placeholder-gray-200 dark:placeholder-white/5 resize-none italic" />
               <div className="flex justify-end pt-10 border-t border-gray-200 dark:border-white/10 mt-10">
                 <button onClick={handlePostComment} disabled={!currentUser || !comment.trim()} className="px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-black rounded-3xl shadow-2xl hover:bg-black dark:hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-30 text-[10px] uppercase tracking-[0.3em]">Publish Thought</button>
               </div>
             </div>
             
             <div className="space-y-24 pl-6 md:pl-10 border-l-2 border-indigo-50 dark:border-white/5">
               {comments.map((c, i) => (
                 <div key={i} className="group reveal active">
                   <div className="flex items-center space-x-6 mb-8">
                     <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-white/5 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black shrink-0 border border-indigo-100 dark:border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                       {c.author.charAt(0)}
                     </div>
                     <div>
                       <h5 className="font-black text-gray-900 dark:text-white leading-none uppercase tracking-widest text-base">{c.author}</h5>
                       <span className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-[0.3em] mt-2 inline-block italic">{c.date}</span>
                     </div>
                   </div>
                   <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium transition-colors group-hover:text-gray-900 dark:group-hover:text-white italic">
                     {c.text}
                   </p>
                 </div>
               ))}
             </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default PostView;
