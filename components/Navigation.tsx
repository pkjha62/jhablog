
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface NavigationProps {
  onNavigate: (view: 'home' | 'create' | 'categories' | 'about' | 'auth') => void;
  currentView: string;
  currentUser: User | null;
  onSignOut: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentView, currentUser, onSignOut, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const handleNavClick = (view: any) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'py-3' : 'py-8 md:py-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className={`glass-panel rounded-[2rem] md:rounded-full px-5 py-2.5 transition-all duration-500 flex justify-between items-center ${scrolled ? 'shadow-2xl' : 'shadow-none'}`}>
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">P</div>
              <span className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase transition-colors">Prahant_Jha</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2">
              {[
                { id: 'home', label: 'Journal' },
                { id: 'categories', label: 'Topics' },
                { id: 'about', label: 'Identity' }
              ].map((link) => (
                <button 
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    currentView === link.id 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-xl' 
                    : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={onToggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-all mr-2"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
                )}
              </button>

              <button
                onClick={() => currentUser ? handleNavClick('create') : handleNavClick('auth')}
                className="group relative flex items-center justify-center h-10 px-6 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:pr-12 shadow-xl active:scale-95"
              >
                <span>{currentUser ? 'Compose' : 'Join'}</span>
                <svg className="absolute right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 12h16M4 6h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Drawer */}
      <div className={`fixed inset-0 z-[150] transition-all duration-500 lg:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-500 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
             <span className="font-black text-gray-900 dark:text-white uppercase tracking-tighter">Menu</span>
             <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
          <div className="p-10 flex-grow space-y-12">
            {['Home', 'Categories', 'About'].map((view) => (
              <button key={view} onClick={() => handleNavClick(view.toLowerCase() as any)} className="block text-4xl font-black text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors tracking-tighter italic">
                {view === 'Home' ? 'Journal' : view === 'Categories' ? 'Topics' : 'Identity'}
              </button>
            ))}
          </div>
          <div className="p-8 border-t border-gray-100 dark:border-white/5">
             {currentUser ? (
               <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black">{currentUser.name.charAt(0)}</div>
                 <div className="flex-grow">
                   <p className="font-black text-gray-900 dark:text-white leading-none">{currentUser.name}</p>
                   <button onClick={onSignOut} className="text-[10px] font-black text-red-500 mt-2 uppercase tracking-widest">Logout</button>
                 </div>
               </div>
             ) : (
               <button onClick={() => handleNavClick('auth')} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">Authenticate</button>
             )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
