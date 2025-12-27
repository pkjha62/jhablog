
import React, { useState, useEffect, useCallback } from 'react';
import { Post, User } from './types';
import Navigation from './components/Navigation';
import Home from './views/Home';
import PostView from './views/PostView';
import EditorView from './views/EditorView';
import CategoriesView from './views/CategoriesView';
import AboutView from './views/AboutView';
import AuthView from './views/AuthView';
import { getPosts, removePost, getCurrentUser, setCurrentUser } from './utils/storage';

type ViewState = 
  | { type: 'home'; initialCategory?: string }
  | { type: 'post'; id: string }
  | { type: 'create' }
  | { type: 'categories' }
  | { type: 'about' }
  | { type: 'auth' };

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const init = async () => {
      const storedPosts = getPosts();
      const user = getCurrentUser();
      setPosts(storedPosts);
      setCurrentUserState(user);
      setTimeout(() => setLoading(false), 800);
    };
    init();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const refreshPosts = useCallback(() => {
    setPosts(getPosts());
    setView({ type: 'home' });
  }, []);

  const handleSignOut = useCallback(() => {
    setCurrentUser(null);
    setCurrentUserState(null);
    setView({ type: 'home' });
  }, []);

  const handleAuthSuccess = useCallback((user: User) => {
    setCurrentUserState(user);
    setView({ type: 'home' });
  }, []);

  const handleDeletePost = useCallback((id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    const canDelete = currentUser?.role === 'admin' || currentUser?.id === post.authorId;
    if (!canDelete) return alert("Unauthorized Access.");

    if (window.confirm("Permanent Erasure: Are you sure?")) {
      removePost(id);
      setPosts(getPosts());
      if (view.type === 'post' && view.id === id) setView({ type: 'home' });
    }
  }, [posts, currentUser, view]);

  const handleNavigate = useCallback((target: string) => {
    setView({ type: target as any });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToCategory = useCallback((category: string) => {
    setView({ type: 'home', initialCategory: category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openSocial = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const currentPost = view.type === 'post' ? posts.find(p => p.id === view.id) : null;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <Navigation 
        currentView={view.type} 
        onNavigate={handleNavigate} 
        currentUser={currentUser}
        onSignOut={handleSignOut}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-grow">
        {loading ? (
          <div className="fixed inset-0 bg-white dark:bg-slate-950 z-[200] flex flex-col items-center justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 border-4 border-indigo-600/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] animate-pulse">Securing Terminal Connection...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-1000">
            {view.type === 'home' && (
              <Home 
                posts={posts} 
                onSelectPost={(id) => setView({ type: 'post', id })} 
                onDeletePost={handleDeletePost}
                initialCategory={view.initialCategory}
                onNavigateToCreate={() => setView(currentUser ? { type: 'create' } : { type: 'auth' })}
                currentUser={currentUser}
              />
            )}
            {view.type === 'post' && currentPost && (
              <PostView 
                post={currentPost} 
                onBack={() => setView({ type: 'home' })} 
                onDelete={() => handleDeletePost(currentPost.id)}
                currentUser={currentUser}
              />
            )}
            {view.type === 'create' && (
              <EditorView onCancel={() => setView({ type: 'home' })} onPostSaved={refreshPosts} currentUser={currentUser} />
            )}
            {view.type === 'categories' && <CategoriesView onSelectCategory={navigateToCategory} />}
            {view.type === 'about' && <AboutView />}
            {view.type === 'auth' && <AuthView onAuthSuccess={handleAuthSuccess} onCancel={() => setView({ type: 'home' })} />}
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-[#050505] text-gray-500 dark:text-gray-400 py-16 border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-500/20">P</div>
                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Prahant_Jha</span>
              </div>
              <p className="max-w-sm text-sm font-medium leading-relaxed">
                Defining the standard of digital expression. A proprietary ecosystem designed for the modern architect of thought.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  { id: 'linkedin', url: 'https://linkedin.com/in/prashant-jha-a18834378', color: 'hover:bg-[#0077b5]' },
                  { id: 'x', url: 'https://x.com/Prashan00369179', color: 'hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black' },
                  { id: 'instagram', url: 'https://www.instagram.com/pk_jha62/', color: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]' },
                  { id: 'whatsapp', url: 'https://wa.me/916200852372', color: 'hover:bg-[#25D366]' }
                ].map((social) => (
                  <button key={social.id} onClick={() => openSocial(social.url)} className={`w-11 h-11 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 transition-all transform hover:-translate-y-1 ${social.color} hover:text-white shadow-sm hover:shadow-xl`}>
                    <span className="sr-only">{social.id}</span>
                    {social.id === 'linkedin' && <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
                    {social.id === 'x' && <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                    {social.id === 'instagram' && <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
                    {social.id === 'whatsapp' && <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.984-.365-1.739-.757-2.874-2.513-2.96-2.63-.086-.117-.693-.923-.693-1.762 0-.839.435-1.25.59-1.416.155-.165.337-.206.45-.206.113 0 .225.001.322.005.101.004.237-.038.37.283.144.351.492 1.196.535 1.284.042.088.07.191.011.31-.059.12-.088.191-.176.299-.088.106-.184.237-.263.318-.088.088-.18.184-.078.36.102.176.451.745.967 1.205.666.593 1.226.777 1.402.865.176.088.279.073.383-.045.103-.118.441-.515.559-.691.117-.176.234-.148.395-.088.161.06.1.47 1.021.52.921.05 1.53.46 1.61.593.08.133.08.77-.064 1.175zM12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 21.167c-5.054 0-9.167-4.113-9.167-9.167s4.113-9.167 9.167-9.167 9.167 4.113 9.167 9.167-4.113 9.167-9.167 9.167z"/></svg>}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Categories', 'About', 'Journal'].map(item => (
                  <li key={item}>
                    <button onClick={() => setView({ type: item.toLowerCase() as any })} className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] mb-8">Access</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setView({ type: 'auth' })} className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">Sign In</button></li>
                <li><button onClick={() => setView({ type: 'auth' })} className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">Register</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <p>© 2024 Prahant_Jha Blog Core v3.0</p>
            <p className="mt-4 md:mt-0 flex items-center">
              Owned & Authored by <span className="text-gray-900 dark:text-white mx-1.5 font-black">Prashant Jha</span>
              <span className="mx-2 opacity-30">•</span>
              <button onClick={() => openSocial('mailto:pkjhaprashantjha@gmail.com')} className="text-indigo-500 hover:underline lowercase tracking-normal font-bold">pkjhaprashantjha@gmail.com</button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
