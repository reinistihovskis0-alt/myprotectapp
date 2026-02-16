import React, { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: (password: string) => boolean;
  isStealth: boolean;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, isStealth }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const [stats, setStats] = useState({ cpu: 12, ram: 45, net: 2.4 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 20) + 10,
        ram: Math.floor(Math.random() * 5) + 40,
        net: parseFloat((Math.random() * 5).toFixed(1))
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleHeaderClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setShowInput(true);
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUnlock(password)) {
      setError(true);
      setTimeout(() => setError(false), 1000);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#020617] flex flex-col p-6 z-50 font-mono overflow-hidden select-none">
      <div className="flex-1 flex flex-col">
        <div 
          onClick={handleHeaderClick}
          className="flex justify-between items-center mb-10 border-b border-slate-800 pb-4 active:bg-slate-800/20 transition-colors cursor-default"
        >
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-microchip text-slate-500"></i>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">System Hardware Diagnostic v4.2.0</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <DecoyCard label="CPU LOAD" value={`${stats.cpu}%`} sub="STABLE" color="sky" />
          <DecoyCard label="RAM USAGE" value={`${stats.ram}%`} sub="8.2GB USED" color="emerald" />
          <DecoyCard label="NETWORK" value={`${stats.net} MB/S`} sub="ENCRYPTED" color="amber" />
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex-1 overflow-hidden relative">
          <div className="text-[10px] text-emerald-500/70 space-y-1 mb-4">
            <p>> initializing hardware link...</p>
            <p>> kernel verified: 5.15.0-generic</p>
            <p>> checking sector integrity... 100% OK</p>
            <p>> background sync active</p>
          </div>
          <div className="h-full bg-black/40 rounded border border-slate-800/50 p-4 relative flex flex-col justify-center items-center">
             <div className="absolute top-0 left-0 w-full h-1 bg-sky-500/20 animate-scan pointer-events-none"></div>
             <i className="fa-solid fa-shield-virus text-slate-800 text-6xl opacity-20 mb-4"></i>
             <p className="text-[10px] text-slate-700 tracking-[0.5em] uppercase">Security Scanning...</p>
          </div>
        </div>
      </div>

      {showInput && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
           <div className="w-full max-w-md glass p-10 rounded-[3rem] border border-cyan-500/30 shadow-[0_0_50px_rgba(8,145,178,0.2)]">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-orbitron font-bold text-cyan-400 tracking-tighter uppercase">Phantom Override</h2>
                 <button onClick={() => setShowInput(false)} className="text-slate-500 hover:text-white p-2">
                    <i className="fa-solid fa-xmark text-xl"></i>
                 </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                 <input 
                   type="password"
                   autoFocus
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className={`w-full bg-black border p-5 rounded-2xl text-center tracking-[0.3em] font-bold outline-none transition-all ${
                     error ? 'border-rose-500 text-rose-500' : 'border-cyan-500/50 text-cyan-400 focus:border-cyan-400'
                   }`}
                   placeholder="••••••••••••"
                 />
                 <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-5 rounded-2xl shadow-[0_0_25px_rgba(8,145,178,0.4)] transition-all">
                    ACTIVATE INTERFACE
                 </button>
              </form>
           </div>
        </div>
      )}

      <style>{`
        @keyframes scan { from { top: 0; } to { top: 100%; } }
        .animate-scan { animation: scan 4s linear infinite; }
      `}</style>
    </div>
  );
};

const DecoyCard = ({ label, value, sub, color }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
    <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">{label}</p>
    <p className={`text-2xl font-bold text-${color}-500`}>{value}</p>
    <p className="text-[9px] text-slate-600 mt-1 uppercase tracking-tighter">{sub}</p>
  </div>
);

export default LockScreen;
