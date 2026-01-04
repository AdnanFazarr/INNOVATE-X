
import React from 'react';
import { 
  Flame, 
  Target, 
  Zap, 
  Calendar as CalendarIcon, 
  Trophy,
  ArrowUpRight,
  Lightbulb,
  BookOpen,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const performanceData = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 78 },
  { name: 'Wed', score: 72 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 92 },
  { name: 'Sat', score: 88 },
  { name: 'Sun', score: 95 },
];

const attendanceData = [
  { name: 'Present', value: 92 },
  { name: 'Absent', value: 8 },
];

const COLORS = ['#06b6d4', 'rgba(255, 255, 255, 0.05)'];

const StudentDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
            Keep shining, Alex! ✨
          </h1>
          <p className="text-slate-400 mt-2 flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-400" />
            AI Tip: You're 15% more productive in the mornings. Try tackling math early!
          </p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-6 py-3 rounded-3xl flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <Flame size={20} className="text-orange-500 fill-orange-500/20" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Daily Streak</p>
              <p className="text-xl font-bold">12 Days</p>
            </div>
          </div>
          <div className="glass px-6 py-3 rounded-3xl flex items-center gap-3 border-cyan-500/20">
            <div className="p-2 bg-cyan-500/10 rounded-xl">
              <Zap size={20} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Reward Points</p>
              <p className="text-xl font-bold">2,450</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Progress Chart */}
        <div className="lg:col-span-2 glass p-6 rounded-[2.5rem] relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold">Growth Momentum</h3>
              <p className="text-sm text-slate-400">Weekly engagement and participation trend</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 text-xs font-bold rounded-full border border-teal-500/20">
              <ArrowUpRight size={14} />
              +12.4%
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Circular Attendance Stats */}
        <div className="glass p-6 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6">
          <h3 className="text-xl font-semibold w-full text-left px-2">Consistency Pulse</h3>
          <div className="relative h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">92%</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Attendance</span>
            </div>
          </div>
          
          {/* Calendar Heatmap Preview */}
          <div className="grid grid-cols-7 gap-1 w-full px-4">
             {Array.from({length: 28}).map((_, i) => (
               <div key={i} className={`h-2 rounded-[2px] ${i < 20 ? 'bg-cyan-500/60 shadow-[0_0_5px_rgba(6,182,212,0.3)]' : 'bg-white/5'}`}></div>
             ))}
          </div>

          <div className="space-y-4 w-full px-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Target Level</span>
              <span className="font-semibold">95%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full w-[92%]"></div>
            </div>
            <p className="text-xs text-cyan-400 font-medium italic">
              "You're only 3 days away from the 'Steady Rock' badge!"
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Active Missions (Assignments) */}
        <div className="glass p-6 rounded-[2.5rem] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen size={20} className="text-purple-400" />
              Active Missions
            </h3>
            <button className="text-xs text-cyan-400 hover:underline">Manage All</button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Algebra Challenge', time: 'Today, 2 PM', progress: 80, status: 'Ready' },
              { title: 'Bio Research Paper', time: 'Tomorrow', progress: 45, status: 'In Flow' },
              { title: 'History Quiz Prep', time: 'Oct 24', progress: 0, status: 'Not Started' }
            ].map((task, idx) => (
              <div key={idx} className="group p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium group-hover:text-cyan-400 transition-colors">{task.title}</p>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">{task.progress}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full mb-3 overflow-hidden">
                   <div className="h-full bg-cyan-500 rounded-full transition-all duration-700" style={{width: `${task.progress}%`}}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {task.time}
                  </div>
                  <span className="italic">{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Roadmap Summary */}
        <div className="glass p-6 rounded-[2.5rem] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target size={20} className="text-amber-400" />
              Summit Roadmaps
            </h3>
            <button className="text-xs text-cyan-400 hover:underline">View Map</button>
          </div>
          <div className="space-y-6 py-2">
             <div className="relative pl-6 border-l-2 border-white/10 space-y-6">
                {[
                  { name: 'Physics Final', date: 'Dec 12', readiness: 72, color: 'border-cyan-500' },
                  { name: 'Literary Critique', date: 'Dec 15', readiness: 88, color: 'border-purple-500' }
                ].map((exam, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0a0a1a] border-2 ${exam.color}`}></div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-bold">{exam.name}</p>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{exam.date}</span>
                      </div>
                      <p className="text-xs text-slate-400">Readiness: <span className="text-cyan-400">{exam.readiness}%</span></p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
            <p className="text-[10px] text-purple-300 italic">"Focus on Physics Waves this week to hit 80% readiness."</p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass p-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border-cyan-500/10 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BrainCircuit size={120} />
          </div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles size={20} className="text-cyan-400" />
            AI Growth Path
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Based on your biology performance, we recommend checking out the 
            <strong> "Life Systems Lab"</strong> for 2x point bonus today.
          </p>
          <div className="space-y-4 pt-2">
            <div className="flex gap-4 items-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
              <p className="text-xs text-slate-400">Boost focus with Pomodoro Mode</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></div>
              <p className="text-xs text-slate-400">Join the 'Code Wizards' study pod</p>
            </div>
          </div>
          <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-cyan-50 transition-all shadow-xl shadow-cyan-500/10">
            Start Personalized Journey
          </button>
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <ShieldCheck size={12} className="text-cyan-400/50" />
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Bias-Safe AI Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Re-using icon imports locally for clarity
import { BrainCircuit, Sparkles, ShieldCheck } from 'lucide-react';

export default StudentDashboard;
