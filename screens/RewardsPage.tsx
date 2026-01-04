
import React from 'react';
import { Trophy, Star, Shield, Zap, Heart, Award, Gift } from 'lucide-react';
import { User } from '../types';

interface RewardsPageProps {
  user: User;
}

const RewardsPage: React.FC<RewardsPageProps> = ({ user }) => {
  const badges = [
    { name: 'Early Bird', icon: '☀️', status: 'unlocked', desc: 'Arrived before 8 AM for 5 days.' },
    { name: 'Helpful Hero', icon: '🤝', status: 'unlocked', desc: 'Endorsed by 3 peers for assistance.' },
    { name: 'Deep Thinker', icon: '🧠', status: 'locked', desc: 'Spend 20 hours in focus sessions.' },
    { name: 'Top Scorer', icon: '🎯', status: 'unlocked', desc: 'Scored 90%+ in 3 consecutive tests.' },
    { name: 'Social Butterfly', icon: '🦋', status: 'locked', desc: 'Participate in 5 group projects.' },
    { name: 'Zen Master', icon: '🧘', status: 'unlocked', desc: 'Completed 10 mindfulness tasks.' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alice Wong', points: 15400, avatar: 'https://picsum.photos/32/32?random=1' },
    { rank: 2, name: 'Alex Johnson', points: 12450, avatar: 'https://picsum.photos/32/32?random=2', current: true },
    { rank: 3, name: 'Marcus Smith', points: 11200, avatar: 'https://picsum.photos/32/32?random=3' },
    { rank: 4, name: 'Elena Gilbert', points: 9800, avatar: 'https://picsum.photos/32/32?random=4' },
    { rank: 5, name: 'Peter Parker', points: 8700, avatar: 'https://picsum.photos/32/32?random=5' },
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex p-4 bg-amber-500/10 rounded-full mb-2">
          <Trophy size={48} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
        </div>
        <h1 className="text-4xl font-poppins font-bold">Your Achievement Shelf</h1>
        <p className="text-slate-400">Celebrate every small win. Growth is a marathon, not a sprint.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Badge Shelf */}
        <div className="xl:col-span-2 glass p-8 rounded-[3rem] space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Award className="text-cyan-400" />
              Special Badges
            </h2>
            <div className="text-xs font-bold text-slate-500 uppercase bg-white/5 px-3 py-1 rounded-full">4 / 12 Unlocked</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {badges.map((badge, i) => (
              <div 
                key={i} 
                className={`group p-6 rounded-[2rem] border transition-all flex flex-col items-center text-center space-y-4 cursor-pointer relative overflow-hidden ${
                  badge.status === 'unlocked' 
                  ? 'bg-gradient-to-b from-white/5 to-white/0 border-white/10 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10' 
                  : 'bg-white/2 border-dashed border-white/5 opacity-40'
                }`}
              >
                <div className={`text-4xl mb-2 transition-transform duration-500 ${badge.status === 'unlocked' ? 'group-hover:scale-125' : ''}`}>
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{badge.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">{badge.desc}</p>
                </div>
                {badge.status === 'unlocked' && (
                  <div className="absolute top-2 right-2">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard & Next Rewards */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[3rem] space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Star className="text-purple-400" />
              Hall of Fame
            </h2>
            <div className="space-y-4">
              {leaderboard.map((player) => (
                <div 
                  key={player.rank} 
                  className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
                    player.current ? 'bg-cyan-500/10 border border-cyan-500/20 shadow-lg shadow-cyan-500/5' : 'hover:bg-white/5'
                  }`}
                >
                  <span className={`w-6 text-center font-bold ${
                    player.rank === 1 ? 'text-amber-400' : 
                    player.rank === 2 ? 'text-slate-300' : 
                    player.rank === 3 ? 'text-amber-700' : 'text-slate-500'
                  }`}>
                    {player.rank}
                  </span>
                  <img src={player.avatar} className="w-10 h-10 rounded-xl" alt={player.name} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{player.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{player.points.toLocaleString()} Points</p>
                  </div>
                  {player.current && <span className="text-[10px] px-2 py-0.5 bg-cyan-500 text-white rounded-full font-bold">You</span>}
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-all">
              See Full Rankings
            </button>
          </div>

          <div className="glass p-8 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 space-y-6 relative overflow-hidden group">
            <Gift className="absolute -bottom-4 -right-4 w-24 h-24 text-indigo-500 opacity-10 group-hover:rotate-12 transition-transform" />
            <h2 className="text-xl font-bold">Next Milestone</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">15,000</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Points for Digital Avatar Pack</p>
                </div>
                <p className="text-xs text-indigo-400 font-bold">83%</p>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[83%] rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
