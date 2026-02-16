import React from 'react';

interface SidebarProps {
  activeTab: 'dashboard' | 'settings' | 'history';
  setActiveTab: (tab: 'dashboard' | 'settings' | 'history') => void;
  onLock: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLock }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'DASHBOARD' },
    { id: 'history', icon: 'fa-terminal', label: 'SYSTEM GUIDE' },
    { id: 'settings', icon: 'fa-gears', label: 'SETTINGS' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#0f172a] border-r border-cyan-900/30 p-6">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(8,145,178,0.3)]">
          <i className="fa-solid fa-ghost text-white text-xl"></i>
        </div>
        <span className="font-orbitron font-bold text-xl tracking-wider text-cyan-400">AEGIS</span>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all border ${
              activeTab === item.id 
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(8,145,178,0.1)]' 
              : 'text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            <span className="font-bold text-xs tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-cyan-900/30">
        <button 
          onClick={onLock}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/30"
        >
          <i className="fa-solid fa-lock"></i>
          <span className="font-bold text-xs tracking-widest uppercase">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
