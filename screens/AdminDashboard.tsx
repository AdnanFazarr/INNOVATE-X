
import React from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Globe, 
  Settings2, 
  FileText,
  Activity,
  Heart
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { month: 'Jan', wellbeing: 65, attendance: 78, engagement: 45 },
  { month: 'Feb', wellbeing: 68, attendance: 82, engagement: 52 },
  { month: 'Mar', wellbeing: 75, attendance: 85, engagement: 61 },
  { month: 'Apr', wellbeing: 82, attendance: 88, engagement: 74 },
  { month: 'May', wellbeing: 85, attendance: 91, engagement: 82 },
  { month: 'Jun', wellbeing: 92, attendance: 94, engagement: 88 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-poppins font-bold">Institutional Overview</h1>
          <p className="text-slate-400 mt-2 flex items-center gap-2">
            <Globe size={16} /> Campus-wide wellbeing and reward efficacy metrics.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="glass px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-slate-300 hover:text-white transition-all">
            <FileText size={18} /> Export Compliance Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Wellbeing Index', value: '8.4/10', trend: '+0.5', icon: Heart, color: 'text-rose-400' },
          { label: 'Reward Adoption', value: '92%', trend: '+12%', icon: BarChart3, color: 'text-cyan-400' },
          { label: 'Safety Score', value: '99.9%', trend: 'Stable', icon: ShieldCheck, color: 'text-teal-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-6 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-4xl font-bold font-poppins">{stat.value}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[3rem] space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Impact Trends</h2>
            <div className="flex gap-4 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-cyan-500"></div> Wellbeing</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-purple-500"></div> Reward Impact</span>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'gray', fontSize: 12}} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="wellbeing" stroke="#06b6d4" strokeWidth={3} fill="url(#adminGrad)" />
                <Area type="monotone" dataKey="engagement" stroke="#a855f7" strokeWidth={3} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-[3rem] space-y-6">
           <h2 className="text-xl font-bold">Top Performing Labs</h2>
           <div className="space-y-6">
             {[
               { name: 'Physics Pod', pts: 15400, color: 'bg-cyan-500' },
               { name: 'Literary Hub', pts: 12100, color: 'bg-purple-500' },
               { name: 'Digital Art Studio', pts: 9800, color: 'bg-indigo-500' },
               { name: 'Eco-Green House', pts: 8200, color: 'bg-teal-500' }
             ].map((lab, i) => (
               <div key={i} className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="font-medium text-slate-300">{lab.name}</span>
                   <span className="text-xs text-slate-500">{lab.pts.toLocaleString()} pts</span>
                 </div>
                 <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                   <div className={`h-full ${lab.color} w-[${(lab.pts/20000)*100}%] rounded-full`}></div>
                 </div>
               </div>
             ))}
           </div>
           <button className="w-full py-4 mt-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-white/10 transition-all">
             <Settings2 size={16} /> Manage Campus Config
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
