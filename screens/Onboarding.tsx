
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { ChevronRight, ArrowLeft, GraduationCap, Users, UserRound, ShieldCheck } from 'lucide-react';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');

  const handleNext = () => {
    if (step === 2 && role && name) {
      onComplete({
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        role: role,
        avatar: `https://picsum.photos/200/200?random=${name}`
      });
    } else {
      setStep(step + 1);
    }
  };

  const roles = [
    { type: UserRole.STUDENT, icon: GraduationCap, label: 'Student', desc: 'Track your growth and earn rewards.' },
    { type: UserRole.TEACHER, icon: Users, label: 'Teacher', desc: 'Manage classes with positive AI insights.' },
    { type: UserRole.PARENT, icon: UserRound, label: 'Parent', desc: 'Support your child’s wellbeing journey.' },
    { type: UserRole.ADMIN, icon: ShieldCheck, label: 'Admin', desc: 'Oversee institution-level analytics.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Abstract Background */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-600/5 via-transparent to-purple-600/5 pointer-events-none" />
      <div className="fixed w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -top-48 -left-48 animate-pulse pointer-events-none" />
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="glass p-12 rounded-[3.5rem] shadow-2xl space-y-12 animate-in fade-in zoom-in duration-1000">
          
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">T</div>
              <span className="font-poppins font-bold text-slate-300">TingStudIP</span>
            </div>
            <div className="flex gap-2">
              {[1, 2].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-cyan-400' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <h1 className="text-5xl font-poppins font-bold leading-tight">
                  Welcome to the <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Future of Learning.</span>
                </h1>
                <p className="text-xl text-slate-400 font-light">
                  A positive, supportive environment where every effort counts. 
                  Choose your role to start your journey.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((r) => (
                  <button
                    key={r.type}
                    onClick={() => {
                      setRole(r.type);
                      setStep(2);
                    }}
                    className="flex flex-col items-start p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-500/50 hover:bg-white/10 transition-all text-left group"
                  >
                    <div className="p-3 bg-white/5 rounded-2xl mb-4 group-hover:scale-110 group-hover:text-cyan-400 transition-all">
                      <r.icon size={28} />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{r.label}</h3>
                    <p className="text-sm text-slate-500 leading-tight">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-all text-sm font-bold uppercase tracking-widest"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <div className="space-y-4">
                <h2 className="text-4xl font-poppins font-bold">Personalize your journey.</h2>
                <p className="text-slate-400">How should we address you in the TingStudIP ecosystem?</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-700"
                  />
                </div>
                
                <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl flex items-start gap-4">
                  <div className="p-2 bg-cyan-500/20 rounded-xl text-cyan-400">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-cyan-400 mb-1 uppercase tracking-widest">Privacy Promise</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Your data is encrypted and used solely for providing positive motivation. We never use AI for punitive measures.
                    </p>
                  </div>
                </div>
              </div>

              <button 
                disabled={!name}
                onClick={handleNext}
                className="w-full py-5 rounded-[2rem] bg-white text-slate-900 font-bold text-lg shadow-2xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Launch Dashboard <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
