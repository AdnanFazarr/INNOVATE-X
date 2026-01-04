
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Users, 
  AlertCircle, 
  TrendingUp, 
  MessageSquare, 
  Sparkles,
  MoreVertical,
  ChevronRight,
  BookOpen,
  Map
} from 'lucide-react';

const classPerformance = [
  { name: 'Class A', attendance: 95, participation: 88, examReady: 82 },
  { name: 'Class B', attendance: 82, participation: 75, examReady: 65 },
  { name: 'Class C', attendance: 91, participation: 94, examReady: 90 },
  { name: 'Class D', attendance: 87, participation: 80, examReady: 78 },
  { name: 'Class E', attendance: 78, participation: 62, examReady: 55 },
];

const studentAlerts = [
  { name: 'Emma Wilson', risk: 'Low', trend: 'down', message: 'Missing last 2 history classes.' },
  { name: 'James Kim', risk: 'Medium', trend: 'stable', message: 'Late for 3 days consecutively.' },
  { name: 'Sarah Chen', risk: 'High', trend: 'up', message: 'Exceptional participation spike!' }
];

const TeacherDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-poppins font-bold">Classroom Insights</h1>
          <p className="text-slate-400 mt-2">Nurturing growth across 5 active learning groups.</p>
        </div>
        <div className="flex gap-4">
          <button className="glass px-6 py-3 rounded-2xl bg-cyan-500 text-white font-bold hover:bg-cyan-400 transition-all">
            + Log Activity
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '142', icon: Users, color: 'text-blue-400' },
          { label: 'Avg. Attendance', value: '88%', icon: TrendingUp, color: 'text-teal-400' },
          { label: 'Mission Completion', value: '74%', icon: BookOpen, color: 'text-amber-400' },
          { label: 'Exam Readiness', value: '78%', icon: Map, color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl group hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <span className="text-xs text-slate-500 font-bold uppercase">Real-time</span>
            </div>
            <p className="text-2xl font-bold font-poppins">{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Exam Readiness Pulse */}
        <div className="glass p-8 rounded-[2.5rem] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Exam Readiness Pulse</h3>
            <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs focus:outline-none">
              <option>By Class</option>
              <option>By Topic</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                />
                <Bar dataKey="examReady" radius={[6, 6, 0, 0]} barSize={30}>
                  {classPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.examReady < 70 ? '#f59e0b' : '#a855f7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Predictor / Support Alerts */}
        <div className="glass p-8 rounded-[2.5rem] space-y-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles size={20} className="text-purple-400" />
              Support Alerts
            </h3>
            <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">Wellbeing-Oriented</div>
          </div>
          <div className="flex-1 space-y-4">
            {studentAlerts.map((alert, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                  alert.risk === 'High' ? 'bg-teal-500/10 text-teal-400' : 
                  alert.risk === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-400'
                }`}>
                  {alert.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">{alert.name}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      alert.risk === 'High' ? 'bg-teal-500/20 text-teal-500' : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      {alert.risk} Attention
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{alert.message}</p>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:text-white transition-all" />
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-white/5 border border-white/10 text-sm font-semibold rounded-2xl hover:bg-white/10 transition-all">
            View Holistic Risk Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
