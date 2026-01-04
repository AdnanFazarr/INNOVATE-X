
import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  TrendingUp, 
  Heart, 
  ShieldCheck, 
  Target,
  RefreshCw,
  Info
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

const skillData = [
  { subject: 'Consistency', A: 85, B: 110, fullMark: 150 },
  { subject: 'Participation', A: 78, B: 130, fullMark: 150 },
  { subject: 'Wellbeing', A: 92, B: 130, fullMark: 150 },
  { subject: 'Focus', A: 65, B: 100, fullMark: 150 },
  { subject: 'Curiosity', A: 95, B: 90, fullMark: 150 },
  { subject: 'Teamwork', A: 70, B: 85, fullMark: 150 },
];

const AIInsightsPage: React.FC<{ user: any }> = ({ user }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshInsights = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            Gemini Flash Engine v3.0
          </div>
          <h1 className="text-4xl font-poppins font-bold">Holistic Growth Forecast</h1>
          <p className="text-slate-400">Deep behavioral analysis & predictive success mapping.</p>
        </div>
        <button 
          onClick={refreshInsights}
          className="p-4 rounded-2xl glass border-white/10 hover:border-cyan-500/30 transition-all group"
        >
          <RefreshCw size={24} className={`${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Map */}
        <div className="lg:col-span-2 glass p-8 rounded-[3rem] space-y-8 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <BrainCircuit className="text-cyan-400" />
              Cognitive Profile
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-3 h-3 rounded bg-cyan-500"></div> Current
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-3 h-3 rounded bg-white/10"></div> Peer Avg
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                <Radar
                  name="Current"
                  dataKey="A"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Peer Avg"
                  dataKey="B"
                  stroke="rgba(255,255,255,0.1)"
                  fill="rgba(255,255,255,0.05)"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
            <p className="text-sm italic text-slate-300 leading-relaxed">
              "Your 'Curiosity' score is in the 95th percentile globally! This indicates a high potential for research-oriented careers in STEM or Creative Direction."
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[3rem] space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Target className="text-purple-400" />
              Growth Actions
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Improve Focus', val: 65, color: 'bg-rose-400', tip: 'Try silencing notifications after 7 PM.' },
                { label: 'Wellbeing', val: 92, color: 'bg-teal-400', tip: 'Excellent balance. Maintain your current sleep cycle.' },
                { label: 'Consistency', val: 85, color: 'bg-cyan-400', tip: 'Almost at gold tier. Just 2 more days of attendance.' },
              ].map((item, i) => (
                <div key={i} className="space-y-2 group cursor-help">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-300">{item.label}</span>
                    <span className="font-bold">{item.val}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000 shadow-lg`} style={{ width: `${item.val}%` }}></div>
                  </div>
                  <div className="hidden group-hover:block animate-in fade-in slide-in-from-top-1">
                    <p className="text-[10px] text-slate-500 mt-1">{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-[3rem] bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="text-teal-400" />
              <h3 className="font-bold">Mood Harmony</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We've noticed you're highly engaged during collaborative sessions. Consider taking a peer-mentoring role next week.
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <ShieldCheck size={14} className="text-teal-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Privacy-First Insights</span>
            </div>
          </div>

          <div className="glass p-8 rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center space-y-4 opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer">
             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
               <Info size={20} />
             </div>
             <p className="text-xs font-bold uppercase tracking-widest">Export Growth Portfolio</p>
             <p className="text-[10px] text-slate-500">Share your non-academic achievements with university admissions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPage;
