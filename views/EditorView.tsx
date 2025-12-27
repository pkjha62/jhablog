
import React, { useState, useEffect } from 'react';
import { Post, BlogCategory, Source, AuthorSocials, User } from '../types';
import { generateBlogOutline, generateDraftContent, generatePostImage } from '../services/geminiService';
import { addPost } from '../utils/storage';

interface EditorViewProps {
  onCancel: () => void;
  onPostSaved: () => void;
  currentUser: User | null;
}

const EditorView: React.FC<EditorViewProps> = ({ onCancel, onPostSaved, currentUser }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(currentUser?.name || '');
  const [socials, setSocials] = useState<AuthorSocials>({ linkedin: '', twitter: '', instagram: '', email: currentUser?.email || '' });
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(BlogCategory.AI);
  const [tags, setTags] = useState<string[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    if (!currentUser) onCancel();
  }, [currentUser, onCancel]);

  const handleAISuggest = async () => {
    if (!title) return alert("Warning: Input a headline first.");
    setIsGenerating(true);
    try {
      setGenerationStep('Architecting Outline...');
      const outline = await generateBlogOutline(title);
      setGenerationStep('Synthesizing Data...');
      const draft = await generateDraftContent(title, outline);
      setContent(draft.content);
      setTags(draft.keywords);
      setSources(draft.sources);
    } catch (e) {
      alert("Error: Internal link failure.");
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleGenerateImage = async () => {
    if (!title) return alert("Headline required for synthesis.");
    setIsGeneratingImage(true);
    try {
      const img = await generatePostImage(title);
      if (img) setCoverImage(img);
    } catch (e) {
      alert("Visual synthesis failed.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim() || !author.trim() || !currentUser) return alert("Incomplete parameters.");
    setIsPublishing(true);
    try {
      const newPost: Post = {
        id: Date.now().toString(),
        title, content, excerpt: content.substring(0, 160).replace(/[#*`]/g, '') + '...',
        author, authorId: currentUser.id, authorSocials: socials,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        category, coverImage,
        readTime: `${Math.max(1, Math.ceil(content.split(' ').length / 225))} min read`,
        tags, seoKeywords: tags, sources
      };
      await new Promise(r => setTimeout(r, 1200));
      addPost(newPost);
      onPostSaved();
    } catch (e) {
      alert("Encryption error.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20 border-b border-gray-100 dark:border-white/5 pb-16">
        <div>
           <span className="px-5 py-2 bg-indigo-50 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 text-[9px] font-black rounded-full uppercase tracking-[0.4em] mb-6 inline-block">Architecture Suite</span>
           <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter italic serif leading-none">Draft Narrative.</h1>
        </div>
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <button onClick={onCancel} className="flex-grow lg:flex-none px-10 py-5 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/10 transition-all dark:text-white">Abort</button>
          <button onClick={handlePublish} disabled={isPublishing} className="flex-grow lg:flex-none px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] shadow-3xl hover:bg-black dark:hover:bg-gray-200 transition-all disabled:opacity-50">Publish</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-20 shadow-3xl border border-gray-100 dark:border-white/5">
            <div className="space-y-16">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-4xl md:text-6xl font-black text-gray-900 dark:text-white border-none focus:ring-0 p-0 placeholder-gray-100 dark:placeholder-white/5 leading-none serif italic" placeholder="The Headline..." />
              <div className="relative pt-16 border-t border-gray-50 dark:border-white/5">
                <button onClick={handleAISuggest} disabled={isGenerating} className="absolute -top-7 right-0 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center space-x-3">
                  <svg className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span>{isGenerating ? generationStep : 'Smart-Compose'}</span>
                </button>
                <textarea rows={15} value={content} onChange={(e) => setContent(e.target.value)} className="w-full text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed border-none focus:ring-0 p-0 resize-none serif placeholder-gray-100 dark:placeholder-white/5" placeholder="Begin composition..." />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-12 shadow-3xl border border-gray-100 dark:border-white/5 sticky top-40">
             <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-10 italic serif">Configuration.</h3>
             <div className="space-y-10">
               <div>
                 <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Content Sector</label>
                 <select value={category} onChange={(e) => setCategory(e.target.value as BlogCategory)} className="w-full h-14 rounded-2xl border-none bg-gray-50 dark:bg-white/5 px-6 font-black text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none">
                   {Object.values(BlogCategory).map(c => <option key={c} value={c} className="bg-white dark:bg-slate-900">{c}</option>)}
                 </select>
               </div>
               <div>
                 <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Proprietary Visuals</label>
                 <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-white/5 group shadow-inner">
                    <img src={coverImage} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" alt="Cover" />
                    <button onClick={handleGenerateImage} disabled={isGeneratingImage} className="absolute bottom-6 right-6 w-14 h-14 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shadow-3xl hover:scale-110 transition-all"><svg className={`w-7 h-7 ${isGeneratingImage ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></button>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EditorView;
