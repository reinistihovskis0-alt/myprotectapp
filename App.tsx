
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppConfig, UsageStats } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LockScreen from './components/LockScreen';
import Settings from './components/Settings';
import PasswordSetup from './components/PasswordSetup';

const DEFAULT_CONFIG: AppConfig = {
  blockAdultContent: true,
  blockEscortSites: true,
  blockShortVideos: true,
  youtubeDailyLimit: 45,
  isLocked: true,
  masterPassword: '',
  isStealthMode: true,
  deepFreezeActive: true
};

const INITIAL_STATS: UsageStats = {
  todayYoutube: 15,
  blockedAttempts: 892,
  threatLevel: 'CRITICAL',
  lastSync: new Date()
};

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('aegis_phantom_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });
  
  const [stats, setStats] = useState<UsageStats>(INITIAL_STATS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'history'>('dashboard');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('PHANTOM PROTOCOL ACTIVE.');

  useEffect(() => {
    localStorage.setItem('aegis_phantom_config', JSON.stringify(config));
  }, [config]);

  const handleUnlock = (password: string) => {
    if (password === config.masterPassword) {
      setIsUnlocked(true);
      return true;
    }
    return false;
  };

  const updateConfig = (newConfig: Partial<AppConfig>) => setConfig(prev => ({ ...prev, ...newConfig }));

  // App Deactivation Logic (Simulated Anti-Uninstall)
  const deactivateShield = (password: string) => {
    if (password === config.masterPassword) {
      localStorage.removeItem('aegis_phantom_config');
      window.location.reload();
      return true;
    }
    return false;
  };

  const handleInitialSetup = (pwd: string) => {
    updateConfig({ masterPassword: pwd });
    setIsUnlocked(true); // Automatically unlock after setting password
  };

  if (!config.masterPassword) return <PasswordSetup onComplete={handleInitialSetup} />;
  
  if (!isUnlocked) return <LockScreen onUnlock={handleUnlock} isStealth={config.isStealthMode} />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#020617] text-slate-200 pb-20 md:pb-0 font-mono">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLock={() => setIsUnlocked(false)} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-full">
        <header className="flex items-center justify-between mb-8 border-b border-cyan-900/30 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(8,145,178,0.4)]">
              <i className="fa-solid fa-ghost text-white text-xl animate-pulse"></i>
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-orbitron font-bold text-cyan-400 tracking-widest">PHANTOM AEGIS</h1>
              <p className="text-[10px] text-cyan-500 uppercase tracking-tighter">Authorized System Access</p>
            </div>
          </div>
          <button onClick={() => setIsUnlocked(false)} className="p-3 text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all border border-cyan-500/20">
            <i className="fa-solid fa-power-off text-xl"></i>
          </button>
        </header>

        <div className="bg-cyan-950/20 border border-cyan-500/30 p-4 rounded-lg mb-8 flex items-center gap-4">
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-bold text-cyan-500">MODE</span>
             <span className="text-xl font-bold text-cyan-400 leading-none">FREEZE</span>
          </div>
          <div className="h-10 w-px bg-cyan-500/30"></div>
          <div className="flex-1">
            <span className="text-[10px] uppercase font-bold text-slate-500">Status Report:</span>
            <p className="text-sm italic text-cyan-100 uppercase tracking-widest">"{aiInsight}"</p>
          </div>
        </div>

        {/* Tab Rendering Logic */}
        {activeTab === 'dashboard' && <Dashboard stats={stats} config={config} />}
        {activeTab === 'settings' && <Settings config={config} onUpdate={updateConfig} onDeactivate={deactivateShield} />}
        {activeTab === 'history' && (
          <div className="glass p-8 rounded-2xl space-y-8 border-cyan-500/20">
            <div className="text-center">
               <h3 className="text-2xl font-orbitron font-bold text-cyan-500 mb-2">DEPLOYMENT LOGS</h3>
               <p className="text-sm text-slate-400">Security state and anti-uninstall diagnostics.</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-900/80 p-6 rounded-xl border border-rose-500/30">
                <h4 className="text-rose-400 font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-user-secret"></i>
                  STEALTH IDENTITY
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The app is disguised on your system as:
                  <div className="mt-3 p-3 bg-black rounded border border-rose-500/20 font-bold text-rose-500">
                    NAME: System Diagnostics<br/>
                    ICON: Standard Gear
                  </div>
                </p>
              </div>

              <div className="bg-slate-900/80 p-6 rounded-xl border border-cyan-500/30">
                <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved"></i>
                  REQUIRED DNS CONFIG
                </h4>
                <div className="bg-black p-4 rounded border border-cyan-900 flex items-center justify-between mb-2">
                  <code className="text-cyan-500 font-bold text-xs break-all">adult-filter-dns.cleanbrowsing.org</code>
                </div>
                <p className="text-[10px] text-slate-500 italic">This must be set in your phone's Private DNS settings for 100% effectiveness.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-cyan-900/50 flex justify-around items-center h-20 md:hidden z-40 px-6 pb-2">
        <NavButton active={activeTab === 'dashboard'} icon="fa-chart-pie" label="DASH" onClick={() => setActiveTab('dashboard')} />
        <NavButton active={activeTab === 'history'} icon="fa-terminal" label="LOGS" onClick={() => setActiveTab('history')} />
        <NavButton active={activeTab === 'settings'} icon="fa-gears" label="SETTINGS" onClick={() => setActiveTab('settings')} />
      </nav>
    </div>
  );
};

const NavButton = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-cyan-400' : 'text-slate-600'}`}>
    <div className={`w-12 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-cyan-500/10 shadow-[0_0_15px_rgba(8,145,178,0.3)]' : ''}`}>
      <i className={`fa-solid ${icon} text-lg`}></i>
    </div>
    <span className="text-[9px] font-bold tracking-[0.2em]">{label}</span>
  </button>
);

export default App;
