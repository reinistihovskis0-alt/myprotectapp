import React, { useState, useEffect } from 'react';
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
    try {
      const saved = localStorage.getItem('aegis_phantom_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure critical fields exist
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load config", e);
    }
    return DEFAULT_CONFIG;
  });
  
  const [stats] = useState<UsageStats>(INITIAL_STATS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'history'>('dashboard');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [aiInsight] = useState<string>('PHANTOM PROTOCOL ACTIVE.');

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

  const deactivateShield = (password: string) => {
    if (password === config.masterPassword) {
      localStorage.removeItem('aegis_phantom_config');
      window.location.reload();
      return true;
    }
    return false;
  };

  const handleInitialSetup = (pwd: string) => {
    const newConfig = { ...config, masterPassword: pwd, isLocked: true };
    setConfig(newConfig);
    setIsUnlocked(true); 
  };

  if (!config.masterPassword) {
    return <PasswordSetup onComplete={handleInitialSetup} />;
  }
  
  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} isStealth={config.isStealthMode} />;
  }

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
              <h1 className="text-xl md:text-3xl font-orbitron font-bold text-cyan-400 tracking-widest uppercase">Phantom Aegis</h1>
              <p className="text-[10px] text-cyan-500 uppercase tracking-tighter font-bold">Authorized System Access Only</p>
            </div>
          </div>
          <button onClick={() => setIsUnlocked(false)} className="p-3 text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all border border-cyan-500/20">
            <i className="fa-solid fa-power-off text-xl"></i>
          </button>
        </header>

        <div className="bg-cyan-950/20 border border-cyan-500/30 p-4 rounded-lg mb-8 flex items-center gap-4">
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-bold text-cyan-500">PROTECTION</span>
             <span className="text-xl font-bold text-cyan-400 leading-none">ACTIVE</span>
          </div>
          <div className="h-10 w-px bg-cyan-500/30"></div>
          <div className="flex-1">
            <span className="text-[10px] uppercase font-bold text-slate-500">Shield Status:</span>
            <p className="text-sm italic text-cyan-100 uppercase tracking-widest font-bold">"{aiInsight}"</p>
          </div>
        </div>

        {activeTab === 'dashboard' && <Dashboard stats={stats} config={config} />}
        {activeTab === 'settings' && <Settings config={config} onUpdate={updateConfig} onDeactivate={deactivateShield} />}
        {activeTab === 'history' && (
          <div className="glass p-8 rounded-3xl space-y-8 border border-cyan-500/20">
            <div className="text-center">
               <h3 className="text-2xl font-orbitron font-bold text-cyan-500 mb-2">SYSTEM MANUAL</h3>
               <p className="text-sm text-slate-400">Advanced Operation & Deactivation Guide</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30">
                <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2 uppercase text-xs">
                  <i className="fa-solid fa-key"></i>
                  Secret Entry
                </h4>
                <div className="text-xs text-slate-400 leading-relaxed">
                  To open the secret dashboard from the "Hardware Diagnostic" screen:
                  <ol className="list-decimal ml-4 mt-2 space-y-1 text-cyan-100">
                    <li>Locate the top header text: "System Hardware Diagnostic".</li>
                    <li><span className="font-bold text-cyan-400">Triple-tap</span> (3 times quickly) on that text.</li>
                    <li>Enter your password in the hidden prompt.</li>
                  </ol>
                </div>
              </div>

              <div className="bg-slate-900/80 p-6 rounded-2xl border border-rose-500/30">
                <h4 className="text-rose-400 font-bold mb-3 flex items-center gap-2 uppercase text-xs">
                  <i className="fa-solid fa-trash-can"></i>
                  Complete Deletion
                </h4>
                <div className="text-xs text-slate-400 leading-relaxed">
                  To remove this app permanently:
                  <ol className="list-decimal ml-4 mt-2 space-y-1 text-rose-100">
                    <li>Go to <span className="text-rose-400 font-bold">SETTINGS</span>.</li>
                    <li>Scroll to <span className="text-rose-400 font-bold">CRITICAL OVERRIDE</span>.</li>
                    <li>Click wipe and enter password.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-cyan-900/50 flex justify-around items-center h-20 md:hidden z-40 px-6 pb-2">
        <NavButton active={activeTab === 'dashboard'} icon="fa-chart-pie" label="DASH" onClick={() => setActiveTab('dashboard')} />
        <NavButton active={activeTab === 'history'} icon="fa-terminal" label="GUIDE" onClick={() => setActiveTab('history')} />
        <NavButton active={activeTab === 'settings'} icon="fa-gears" label="SETTINGS" onClick={() => setActiveTab('settings')} />
      </nav>
    </div>
  );
};

const NavButton = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-cyan-400' : 'text-slate-600'}`}>
    <div className={`w-12 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-cyan-500/10 shadow-[0_0_15px_rgba(8,145,178,0.3)]' : ''}`}>
      <i className={`fa-solid ${icon} text-lg`}></i>
    </div>
    <span className="text-[9px] font-black tracking-[0.2em]">{label}</span>
  </button>
);

export default App;
