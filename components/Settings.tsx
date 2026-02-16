import React, { useState } from 'react';
import { AppConfig } from '../types';

interface SettingsProps {
  config: AppConfig;
  onUpdate: (newConfig: Partial<AppConfig>) => void;
  onDeactivate: (pwd: string) => boolean;
}

const Settings: React.FC<SettingsProps> = ({ config, onUpdate, onDeactivate }) => {
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [deactivatePwd, setDeactivatePwd] = useState('');
  const [error, setError] = useState(false);

  const handleDeactivate = () => {
    if (!onDeactivate(deactivatePwd)) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <section className="glass p-8 rounded-3xl border border-rose-500/30">
        <h2 className="text-xl font-orbitron font-bold mb-8 text-rose-500 flex items-center gap-3 border-b border-rose-500/20 pb-4">
          <i className="fa-solid fa-shield-halved"></i>
          BLOCKING PROTOCOLS
        </h2>
        
        <div className="space-y-10">
          <ToggleItem title="Escort & Adult Shield" desc="Blocks solicitation portals and adult domains." enabled={config.blockAdultContent} onToggle={() => onUpdate({ blockAdultContent: !config.blockAdultContent })} color="rose" />
          <ToggleItem title="Dopamine Loop Block" desc="Prevents access to Shorts/Reels." enabled={config.blockShortVideos} onToggle={() => onUpdate({ blockShortVideos: !config.blockShortVideos })} color="sky" />
        </div>
      </section>

      <section className="glass p-8 rounded-3xl border border-cyan-500/30">
        <h2 className="text-xl font-orbitron font-bold mb-8 text-cyan-400 flex items-center gap-3 border-b border-cyan-500/20 pb-4">
          <i className="fa-brands fa-youtube"></i>
          TIME REGULATION
        </h2>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">YouTube Daily Limit</h3>
            <span className="text-3xl font-orbitron font-bold text-cyan-400">{config.youtubeDailyLimit}m</span>
          </div>
          <input type="range" min="0" max="120" step="5" value={config.youtubeDailyLimit} onChange={(e) => onUpdate({ youtubeDailyLimit: parseInt(e.target.value) })} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        </div>
      </section>

      <section className="glass p-8 rounded-3xl border border-rose-500/30">
        <h2 className="text-xl font-orbitron font-bold mb-8 text-rose-500 flex items-center gap-3 border-b border-rose-500/20 pb-4 uppercase">
          <i className="fa-solid fa-biohazard"></i>
          Critical Override
        </h2>
        
        {!showDeactivate ? (
          <button onClick={() => setShowDeactivate(true)} className="w-full bg-rose-600/10 border border-rose-500/40 text-rose-500 py-6 rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-rose-600 hover:text-white transition-all">
            Wipe System & Uninstall
          </button>
        ) : (
          <div className="space-y-6">
            <input type="password" value={deactivatePwd} onChange={(e) => setDeactivatePwd(e.target.value)} className="w-full bg-black border border-rose-900 p-5 rounded-xl text-center text-rose-500 font-bold outline-none" placeholder="ENTER MASTER PASSWORD" />
            <div className="flex gap-4">
              <button onClick={handleDeactivate} className="flex-1 bg-rose-600 text-white font-bold py-5 rounded-xl uppercase tracking-widest text-xs">CONFIRM WIPE</button>
              <button onClick={() => setShowDeactivate(false)} className="flex-1 bg-slate-800 text-white font-bold py-5 rounded-xl uppercase tracking-widest text-xs">ABORT</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const ToggleItem = ({ title, desc, enabled, onToggle, color }: any) => (
  <div className="flex items-center justify-between gap-6 group">
    <div className="flex-1">
      <h4 className={`text-lg font-bold uppercase ${enabled ? (color === 'rose' ? 'text-rose-400' : 'text-cyan-400') : 'text-slate-500'}`}>{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
    <button onClick={onToggle} className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all ${enabled ? (color === 'rose' ? 'bg-rose-600' : 'bg-cyan-600') : 'bg-slate-800'}`}>
      <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  </div>
);

export default Settings;
