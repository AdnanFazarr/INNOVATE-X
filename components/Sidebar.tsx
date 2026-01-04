
import React from 'react';
import { 
  LayoutDashboard, 
  Trophy, 
  BrainCircuit, 
  Users, 
  Calendar, 
  LogOut,
  Settings,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  Map
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onLogout }) => {
  const getMenuItems = () => {
    const common = [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'assignments', icon: BookOpen, label: 'Missions' },
      { id: 'exams', icon: Map, label: 'Exam Roadmaps' },
      { id: 'rewards', icon: Trophy, label: 'Rewards' },
      { id: 'insights', icon: BrainCircuit, label: 'AI Insights' },
    ];

    if (role === UserRole.TEACHER) {
      return [
        ...common,
        { id: 'classes', icon: Users, label: 'My Classes' },
        { id: 'schedule', icon: Calendar, label: 'Schedule' },
      ];
    }

    if (role === UserRole.ADMIN) {
      return [
        ...common,
        { id: 'analytics', icon: TrendingUp, label: 'Institution Data' },
        { id: 'compliance', icon: ShieldCheck, label: 'Privacy' },
      ];
    }

    return common;
  };

  return (
    <aside className="w-20 md:w-64 flex flex-col h-full bg-white/5 backdrop-blur-xl border-r border-white/10 p-4 transition-all duration-300">
      <div className="flex items-center gap-3 px-3 py-6 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <span className="hidden md:block font-poppins font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          TingStudIP
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {getMenuItems().map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={22} className={activeTab === item.id ? 'animate-pulse' : ''} />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="space-y-2 pt-6 border-t border-white/5">
        <button 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={22} />
          <span className="hidden md:block">Settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all"
        >
          <LogOut size={22} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
