
import React from 'react';
import { 
  Heart, 
  Calendar, 
  Award, 
  MessageCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const ParentDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-8">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img src="https://picsum.photos/100/100?random=12" className="w-20 h-20 rounded-[2rem] border-2 border-cyan-500/20 shadow-xl" alt="Child" />
          <div className="absolute -bottom-2 -right-2 bg-cyan-500 p-1.5 rounded-full text-white shadow-lg">
            <Heart size={14} fill="currentColor" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-poppins font-bold">Leo's Journey</h1>
          <p className="text-slate-400 mt-1">Leo is feeling <strong>inspired</strong> and <strong>consistent</strong> today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Wellbeing Indicator */}
        <div className="glass p-8 rounded-[3rem] bg-gradient-to-br from-rose-500/5 to-transparent space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <Heart className="text-rose-400" />
            Social Wellbeing
          </h2>
          <div className="flex items-center justify-center p-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-white/5"></div>
              <div className="absolute inset-0 rounded-full border-8 border-rose-400 border-t-transparent border-r-transparent -rotate-12"></div>
              <span className="text-4xl font-bold text-rose-400">9/10</span>
            </div>
          </div>
          <p className="text-xs text-center text-slate-500 italic">"Leo collaborated exceptionally well in the Science fair prep."</p>
        </div>

        {/* Progress Overview */}
        <div className="glass p-8 rounded-[3rem] space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <TrendingUp className="text-teal-400" />
            Learning Consistency
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Attendance</span>
              <span className="font-bold text-teal-400">98%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Task Completion</span>
              <span className="font-bold text-cyan-400">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Participation</span>
              <span className="font-bold text-purple-400">74%</span>
            </div>
          </div>
          <button className="w-full py-4 bg-white/5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
            Full Growth Report
          </button>
        </div>

        {/* Support Suggestions */}
        <div className="glass p-8 rounded-[3rem] bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20 space-y-6 relative overflow-hidden group">
          <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-cyan-500 opacity-10 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold">Support Tips</h2>
          <div className="space-y-4">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm leading-relaxed">
               Leo has been very curious about <strong>Renewable Energy</strong>. A visit to the science museum this weekend would be very motivating!
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm leading-relaxed">
               Positive Reinforcement: "Leo, I noticed you finished your math goals early. Great focus!"
             </div>
          </div>
          <button className="w-full py-4 bg-cyan-500 text-white rounded-2xl font-bold shadow-xl shadow-cyan-500/20 hover:bg-cyan-400 transition-all">
            Send Encouragement ❤️
          </button>
        </div>
      </div>

      <div className="glass p-8 rounded-[3rem] space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <MessageCircle className="text-indigo-400" />
          Teacher Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white/5 rounded-3xl space-y-3">
            <div className="flex justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase">Mr. Henderson</span>
              <span className="text-[10px] text-slate-500">2 Hours Ago</span>
            </div>
            <p className="text-sm">"Leo showed great initiative today by helping a peer debug their code."</p>
          </div>
          <div className="p-6 bg-white/5 rounded-3xl space-y-3 opacity-50">
             <div className="flex justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase">Ms. Aris</span>
              <span className="text-[10px] text-slate-500">Yesterday</span>
            </div>
            <p className="text-sm">"Creative writing piece on 'Lunar Cities' was very imaginative."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
