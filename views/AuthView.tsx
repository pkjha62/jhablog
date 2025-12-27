
import React, { useState } from 'react';
import { User } from '../types';
import { getUsers, saveUser, setCurrentUser } from '../utils/storage';

interface AuthViewProps {
  onAuthSuccess: (user: User) => void;
  onCancel: () => void;
  initialMode?: 'login' | 'signup' | 'admin';
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess, onCancel, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'admin'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const users = getUsers();
    if (mode === 'signup') {
      if (users.find(u => u.email === email)) return setError('User already exists.');
      const newUser: User = { id: Date.now().toString(), name, email, role: 'user', password };
      saveUser(newUser);
      setCurrentUser(newUser);
      onAuthSuccess(newUser);
    } else {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return setError('Invalid credentials.');
      if (mode === 'admin' && user.role !== 'admin') return setError('Access Denied.');
      setCurrentUser(user);
      onAuthSuccess(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-40 animate-in fade-in duration-1000">
      <div className="w-full max-w-xl relative">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="glass-panel relative rounded-[3.5rem] shadow-3xl overflow-hidden border border-white/20 dark:border-white/5 transition-colors duration-500">
          <div className="p-10 md:p-20">
            <div className="text-center mb-16">
               <span className="px-5 py-2 bg-indigo-50 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 text-[9px] font-black rounded-full uppercase tracking-[0.4em] mb-8 inline-block border border-indigo-100 dark:border-white/10">Secure Gateway</span>
               <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none serif">
                 {mode === 'signup' ? 'Join Us.' : 'Enter.'}
               </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'signup' && (
                <div className="reveal active">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-5">Identity</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-4 focus:ring-indigo-600/5 focus:bg-white dark:focus:bg-white/10 transition-all font-bold text-gray-900 dark:text-white outline-none" placeholder="Full Name" />
                </div>
              )}
              <div className="reveal active">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-5">Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-4 focus:ring-indigo-600/5 focus:bg-white dark:focus:bg-white/10 transition-all font-bold text-gray-900 dark:text-white outline-none" placeholder="Email Address" />
              </div>
              <div className="reveal active">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-5">Protocol</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-8 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-4 focus:ring-indigo-600/5 focus:bg-white dark:focus:bg-white/10 transition-all font-bold text-gray-900 dark:text-white outline-none" placeholder="••••••••" />
              </div>

              {error && (
                <div className="p-6 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-[2rem] text-[10px] font-black uppercase tracking-widest border border-red-100 dark:border-red-500/20 animate-shake">
                  {error}
                </div>
              )}

              <button type="submit" className="w-full py-6 bg-indigo-600 text-white font-black rounded-3xl shadow-3xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-[0.3em] text-[10px]">
                {mode === 'signup' ? 'Manifest Access' : 'Verify Identity'}
              </button>
            </form>

            <div className="mt-16 flex flex-col items-center space-y-6">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {mode === 'login' ? "New Identity?" : "Existing Citizen?"}
                <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="ml-3 text-indigo-600 dark:text-indigo-400 font-black hover:underline uppercase">Switch Protocol</button>
              </p>
              <button onClick={onCancel} className="text-[10px] text-gray-300 dark:text-gray-600 font-black uppercase tracking-widest hover:text-gray-900 dark:hover:text-white transition-colors">Abort Procedure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
