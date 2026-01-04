
import React from 'react';
import { Map, Target, TrendingUp, Sparkles, BookCheck, ShieldAlert, Award } from 'lucide-react';
import { User, ExamPrep } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarArea } from 'recharts';

const MOCK_EXAMS: ExamPrep[] = [
  { 
    subject: 'Final Physics Exam', 
    examDate: 'Dec 12, 2023', 
    readiness: 72, 
    topics: [
      { name: 'Dynamics', mastery: 85 },
      { name: 'Waves', mastery: 60 },
      { name: 'Thermodynamics', mastery: 75 },
      { name: 'Quantum Basics', mastery: 40 },
      { name: 'Circuits', mastery: 90 }
    ] 
  }
];

const ExamPrepPage: React.FC<{ user: User }> = ({ user }) => {
  const currentExam = MOCK_EXAMS[0];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-poppins font-bold">Summit Roadmaps</h1>
          <p className="text-slate-400 mt-2">Predictive analysis and strategy for upcoming exams.</p>
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Avg Readiness</p>
            <p className="text-lg font-bold">72%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[3rem] space-y-8 min-h-[500px]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Target className="text-cyan-400" />
              Knowledge Shield: {currentExam.subject}
            </h2>
            <div className="text-xs font-bold text-slate-500 bg-white/5 px-4 py-1.5 rounded-full">
              Exam in 24 Days
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentExam.topics}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                  <RadarArea
                    name="Mastery"
                    dataKey="mastery"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Priority Topics</h4>
              <div className="space-y-4">
                {currentExam.topics.sort((a,b) => a.mastery - b.mastery).slice(0, 3).map((topic, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-cyan-500/20 transition-all">
                    <div className="flex items-center gap-3">
                      <ShieldAlert size={16} className={topic.mastery < 50 ? 'text-amber-500' : 'text-cyan-400'} />
                      <span className="font-medium">{topic.name}</span>
                    </div>
                    <span className="text-xs font-bold">{topic.mastery}% Mastery</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-cyan-500 text-white font-bold rounded-2xl shadow-xl shadow-cyan-500/10 hover:bg-cyan-400 transition-all">
                Generate Study Milestone
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="glass p-8 rounded-[3rem] space-y-6">
             <h3 className="text-xl font-bold flex items-center gap-3">
               <Sparkles size={20} className="text-amber-400" />
               AI Strategy
             </h3>
             <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl text-xs leading-relaxed text-amber-200/70">
               "Based on your 'Quantum Basics' quiz performance, spending 15 mins daily on visual simulations could boost your readiness to 85% by next week."
             </div>
             <div className="space-y-4 pt-2">
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                 <p className="text-xs text-slate-400">Target: 3 hours focus/week</p>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                 <p className="text-xs text-slate-400">Goal: Unlock 'Mastermind' badge</p>
               </div>
             </div>
           </div>

           <div className="glass p-8 rounded-[3rem] border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                  <BookCheck size={18} className="text-teal-400" />
                  Resources
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Flashcards', 'Practice Tests', 'Summary Notes', 'Video Labs'].map((item, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    {item}
                  </div>
                ))}
              </div>
           </div>

           <div className="glass p-8 rounded-[3.5rem] bg-gradient-to-br from-cyan-500 to-blue-600 text-white space-y-2 relative overflow-hidden">
             <Award className="absolute -bottom-4 -right-4 w-20 h-20 opacity-20" />
             <p className="text-xs font-bold uppercase tracking-widest opacity-80">Next Unlock</p>
             <p className="text-xl font-bold">Summit Certificate</p>
             <p className="text-[10px] opacity-70 italic">Achieve 90%+ readiness in all topics.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPrepPage;
