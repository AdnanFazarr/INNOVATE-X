
import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setActiveTab }) => {
  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-white/2 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks, rewards, or insights..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#0a0a1a]"></span>
        </button>

        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

        <div 
          className="flex items-center gap-3 cursor-pointer group hover:bg-white/5 p-1 pr-3 rounded-2xl transition-all"
          onClick={() => setActiveTab('profile')}
        >
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-cyan-500/30 transition-all"
            />
            <div className="absolute -bottom-1 -right-1 p-0.5 bg-cyan-500 rounded-full shadow-lg">
              <Sparkles size={10} className="text-white" />
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
            <p className="text-[10px] text-cyan-400/70 font-bold tracking-wider uppercase">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
