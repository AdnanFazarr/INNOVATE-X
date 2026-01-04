
import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Clock, CheckCircle2, ChevronRight, Zap, BrainCircuit, ExternalLink, Loader2 } from 'lucide-react';
import { User, Assignment } from '../types';
import { GoogleGenAI } from "@google/genai";

const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: '1', title: 'Calculus Derivatives', subject: 'Mathematics', dueDate: 'Tomorrow, 5 PM', status: 'in-progress', difficulty: 'High', progress: 65, aiTip: 'AI suggests: Review the chain rule before starting the final section.' },
  { id: '2', title: 'Shakespearean Sonnets', subject: 'Literature', dueDate: 'Friday', status: 'pending', difficulty: 'Medium', progress: 0, aiTip: 'AI Suggests: You usually write better after a 10-min break.' },
  { id: '3', title: 'Cell Biology Lab Report', subject: 'Science', dueDate: 'Oct 28', status: 'completed', difficulty: 'Low', progress: 100, aiTip: 'Great job! Mastery confirmed in Mitochondrial functions.' },
];

const AssignmentsPage: React.FC<{ user: User }> = ({ user }) => {
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [isPrioritizing, setIsPrioritizing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [groundingSources, setGroundingSources] = useState<{title: string, uri: string}[]>([]);

  const runAiPrioritization = async () => {
    setIsPrioritizing(true);
    setAiSuggestion(null);
    setGroundingSources([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        As an expert study coach, analyze these assignments for ${user.name}:
        ${JSON.stringify(assignments)}
        
        1. Prioritize them based on deadlines, difficulty, and current progress.
        2. Suggest which one to tackle first and why.
        3. Use Google Search to find 2-3 highly relevant, up-to-date study resources or news articles for the "High" difficulty subjects to help the student prepare.
        
        Provide a concise, motivational response.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      setAiSuggestion(text);

      // Extract grounding sources
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const sources = chunks
          .filter((chunk: any) => chunk.web)
          .map((chunk: any) => ({
            title: chunk.web.title,
            uri: chunk.web.uri
          }));
        setGroundingSources(sources);
      }
    } catch (error) {
      console.error("AI Prioritization failed", error);
      setAiSuggestion("The AI is taking a quick break. Please try again in a moment for your personalized path.");
    } finally {
      setIsPrioritizing(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-poppins font-bold">Learning Missions</h1>
          <p className="text-slate-400 mt-2">Break down goals, achieve flow, earn rewards.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={runAiPrioritization}
            disabled={isPrioritizing}
            className="glass px-6 py-3 rounded-2xl text-sm font-bold text-cyan-400 border-cyan-500/30 flex items-center gap-2 hover:bg-cyan-500/10 transition-all disabled:opacity-50"
          >
            {isPrioritizing ? <Loader2 size={18} className="animate-spin" /> : <BrainCircuit size={18} />}
            AI Prioritize
          </button>
          <div className="glass px-4 py-3 rounded-2xl text-xs font-bold text-purple-400 border-purple-500/20 hidden md:block">
            Current Flow: 42 mins
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          {/* AI Suggestion Box */}
          {(aiSuggestion || isPrioritizing) && (
            <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border-cyan-500/20 animate-in zoom-in duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Sparkles size={120} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
                <Sparkles size={24} className="text-cyan-400" />
                AI Golden Path
              </h3>
              
              {isPrioritizing ? (
                <div className="flex items-center gap-3 text-slate-400 py-4">
                  <Loader2 size={24} className="animate-spin text-cyan-400" />
                  <p>Analyzing your missions and finding the best resources...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-slate-200 leading-relaxed text-sm whitespace-pre-wrap">
                    {aiSuggestion}
                  </div>
                  
                  {groundingSources.length > 0 && (
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recommended Study Resources</p>
                      <div className="flex flex-wrap gap-3">
                        {groundingSources.map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-cyan-400 hover:bg-white/10 transition-all"
                          >
                            <ExternalLink size={12} />
                            {source.title.length > 25 ? source.title.substring(0, 25) + '...' : source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {assignments.map((assignment) => (
            <div key={assignment.id} className="glass p-6 rounded-[2rem] hover:border-cyan-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <BookOpen size={80} />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      assignment.difficulty === 'High' ? 'bg-amber-500/20 text-amber-500' : 
                      assignment.difficulty === 'Medium' ? 'bg-purple-500/20 text-purple-500' : 'bg-teal-500/20 text-teal-500'
                    }`}>
                      {assignment.difficulty} Complexity
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{assignment.subject}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{assignment.title}</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Due In</p>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <Clock size={14} className="text-cyan-400" />
                      {assignment.dueDate}
                    </p>
                  </div>
                  <button className={`p-3 rounded-2xl transition-all ${
                    assignment.status === 'completed' ? 'bg-teal-500/10 text-teal-400' : 'bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-white'
                  }`}>
                    {assignment.status === 'completed' ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span>Mission Progress</span>
                    <span className="text-cyan-400">{assignment.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${assignment.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-start gap-3">
                  <Sparkles size={16} className="text-cyan-400 mt-0.5 animate-pulse" />
                  <p className="text-xs text-slate-300 italic">{assignment.aiTip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem] space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Zap size={20} className="text-amber-400" />
              Quick Focus Labs
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Unlock a "Flow State" with AI-curated focus music and task grouping.
            </p>
            <div className="space-y-4">
              {['25m Pomodoro', 'Deep Work Block', 'Flash Review'].map((mode, i) => (
                <button key={i} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-left hover:bg-white/10 transition-all flex justify-between items-center group">
                  <span className="font-medium text-sm">{mode}</span>
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={16} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
             <h3 className="font-bold text-purple-400 mb-2 uppercase tracking-widest text-xs">Mission Mastery</h3>
             <div className="flex items-center gap-4">
               <div className="text-4xl font-bold">12</div>
               <div className="text-xs text-slate-400">Assignments completed without stress this month. You're in the top 5%!</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
