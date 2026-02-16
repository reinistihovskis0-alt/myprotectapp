import React from 'react';
import { AppConfig, UsageStats } from '../types';

interface DashboardProps {
  stats: UsageStats;
  config: AppConfig;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, config }) => {
  const remaining = Math.max(config.youtubeDailyLimit - stats.todayYoutube, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YouTube Card */}
        <div className="glass p-8 rounded-3xl border border-rose-500/30 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <i className="fa-brands fa-youtube text-4xl text-rose-500/20"></i>
          </div>
          <h4 className="text-sm font-bold text-rose-500 uppercase tracking-widest mb-6">YouTube Curfew</h4>
          
          <div className="w-40 h-40 rounded-full border-4 border-slate-800 flex items-center justify-center mb-6">
              <div className="text-center">
                  <span className="text-4xl font-orbitron font-bold text-white block">{Math.ceil(remaining)}</span>
                  <span className="text-[10px] text-slate-500 font-bold">MINS LEFT</span>
              </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
               <p className="text-[10px] text-slate-500 uppercase font-bold">Limit</p>
               <p className="text-xl font-bold">{config.youtubeDailyLimit}m</p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
               <p className="text-[10px] text-slate-500 uppercase font-bold">Spent</p>
               <p className="text-xl font-bold text-rose-500">{Math.floor(stats.todayYoutube)}m</p>
            </div>
          </div>
        </div>

        {/* Neutralization Card */}
        <div className="glass p-8 rounded-3xl border border-sky-500/30">
          <h4 className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-6">Neutralization Log</h4>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-5xl font-orbitron font-bold text-white">{stats.blockedAttempts}</p>
              <p className="text-xs text-slate-500 mt-1 uppercase font-bold">Prohibited Requests Blocked</p>
            </div>
            <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center border border-sky-500/30">
              <i className="fa-solid fa-ban text-3xl text-sky-400"></i>
            </div>
          </div>
          
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 bg-rose-500/5 rounded-xl border border-rose-500/20">
                <div className="flex items-center gap-3">
                   <i className="fa-solid fa-venus text-rose-400"></i>
                   <span className="text-xs font-bold text-rose-200 uppercase">Escort Sites</span>
                </div>
                <span className="text-xs text-rose-500 font-bold">ACTIVE PURGE</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-sky-500/5 rounded-xl border border-sky-500/20">
                <div className="flex items-center gap-3">
                   <i className="fa-solid fa-film text-sky-400"></i>
                   <span className="text-xs font-bold text-sky-200 uppercase">Shorts/Reels</span>
                </div>
                <span className="text-xs text-sky-500 font-bold">FILTERED</span>
             </div>
          </div>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl border border-slate-800">
        <h4 className="text-sm font-bold mb-6 text-slate-400 uppercase tracking-[0.2em]">Active Protection Matrix</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusGridItem icon="fa-user-lock" label="Adult Gate" active={config.blockAdultContent} />
          <StatusGridItem icon="fa-people-arrows" label="Escort Purge" active={config.blockEscortSites} />
          <StatusGridItem icon="fa-stopwatch" label="YouTube Curfew" active={config.youtubeDailyLimit > 0} />
        </div>
      </div>
    </div>
  );
};

const StatusGridItem = ({ icon, label, active }: any) => (
  <div className={`p-4 rounded-2xl border flex items-center gap-4 ${active ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-rose-500/5 border-rose-500/30'}`}>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <p className="text-[10px] text-slate-500 uppercase font-bold">{label}</p>
      <p className={`text-sm font-bold uppercase ${active ? 'text-emerald-400' : 'text-rose-400'}`}>{active ? 'Enabled' : 'Bypassed'}</p>
    </div>
  </div>
);

export default Dashboard;
