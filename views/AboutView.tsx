
import React from 'react';

const AboutView: React.FC = () => {
  const suggestedNames = [
    { name: 'Vantage', vibe: 'Perspective & Analysis' },
    { name: 'Nexus', vibe: 'Connection & Tech' },
    { name: 'Aura', vibe: 'Lifestyle & Atmosphere' },
    { name: 'Node', vibe: 'Data & Networking' },
    { name: 'Sync', vibe: 'Harmony & Modernity' },
    { name: 'Pulse', vibe: 'Current Events & Trends' }
  ];

  const openSocial = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-32">
        <span className="px-6 py-2.5 bg-indigo-50 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-[0.4em] mb-10 inline-block border border-indigo-100 dark:border-white/10">The Manifesto</span>
        <h1 className="text-6xl md:text-9xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter leading-[0.9] serif italic">Modern Thought Meets <span className="text-indigo-600 dark:text-indigo-500">Expression.</span></h1>
        <p className="text-xl md:text-3xl text-gray-500 dark:text-gray-400 font-medium max-w-4xl mx-auto leading-relaxed italic">
          Prahant_Jha is a next-generation publishing ecosystem designed for the visionary architect. We build tools that amplify human creativity through seamless intelligent integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-40">
        {[
          { title: 'Intelligent Suite', text: 'Every article on Prahant_Jha can be refined using our proprietary Smart-Compose tools. From architectural outlines to real-time data verification, we help you find the core of your story.' },
          { title: 'World-Class Aesthetics', text: 'We prioritize reading experience above all. No distractions, no noise—just beautiful typography and cinematic visuals that elevate your narrative above the collective static.' }
        ].map((feat, i) => (
          <div key={i} className="bg-white dark:bg-white/5 p-12 md:p-16 rounded-[3rem] border border-gray-100 dark:border-white/10 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700 hover:-translate-y-2">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tight serif italic">{feat.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed font-medium italic">
              {feat.text}
            </p>
          </div>
        ))}
      </div>

      {/* Founder Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-24 border border-gray-100 dark:border-white/10 shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col xl:flex-row items-center gap-16 md:gap-24 relative z-10">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-[4rem] bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white text-8xl md:text-9xl font-black shadow-3xl shrink-0 group-hover:scale-105 transition-transform duration-700">
            PJ
          </div>
          <div className="text-center xl:text-left">
            <h3 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-none serif italic">Prashant Jha</h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-10">Founder & Principal Architect</p>
            <p className="text-gray-500 dark:text-gray-400 text-xl md:text-2xl font-medium leading-relaxed mb-12 max-w-2xl italic">
              Bridging the boundary between advanced technological systems and the raw power of human expression. Prahant_Jha is my vision for the future of digital media.
            </p>
            
            <div className="flex flex-wrap justify-center xl:justify-start gap-5">
              {[
                { label: 'Instagram', url: 'https://www.instagram.com/pk_jha62/', color: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]' },
                { label: 'LinkedIn', url: 'https://linkedin.com/in/prashant-jha-a18834378', color: 'hover:bg-[#0077b5]' },
                { label: 'Twitter / X', url: 'https://x.com/Prashan00369179', color: 'hover:bg-black dark:hover:bg-white dark:hover:text-black' },
                { label: 'WhatsApp', url: 'https://wa.me/916200852372', color: 'hover:bg-[#25D366]' }
              ].map(s => (
                <button key={s.label} onClick={() => openSocial(s.url)} className={`px-8 py-4.5 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest ${s.color} hover:text-white transition-all transform hover:-translate-y-2 shadow-sm hover:shadow-2xl border border-gray-100 dark:border-white/10`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
