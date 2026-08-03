import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onToggleMobileMenu: () => void;
}

export function Header({
  activeTab,
  onTabChange,
  onOpenSearch,
  onOpenSettings,
  onToggleMobileMenu,
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900 text-slate-100 flex justify-between items-center px-4 md:px-12 h-16 shadow-md transition-all duration-300 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden material-symbols-outlined text-slate-300 hover:text-white cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition-colors active:scale-95"
          title="Menu"
        >
          menu
        </button>
        <button
          onClick={() => onTabChange('dashboard')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-lg">layers</span>
          </div>
          <span className="font-headline-md text-xl font-bold tracking-tight text-white">
            Atelier<span className="text-indigo-400 font-light ml-1">Home</span>
          </span>
        </button>
      </div>

      {/* Desktop Main Navigation */}
      <nav className="hidden md:flex gap-1 items-center font-label-md bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/50">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onTabChange('kids-room')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'kids-room'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Kids Room
        </button>
        <button
          onClick={() => onTabChange('master-suite')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'master-suite'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Rooms & Suite
        </button>
        <button
          onClick={() => onTabChange('exterior')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'exterior'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Exterior
        </button>
        <button
          onClick={() => onTabChange('profile')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Profile
        </button>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700/80 transition-colors cursor-pointer"
          title="Search elements and guides"
        >
          <span className="material-symbols-outlined text-base">search</span>
          <span className="hidden sm:inline">Search...</span>
        </button>
        <button
          onClick={onOpenSettings}
          className="material-symbols-outlined text-slate-300 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer active:scale-95"
          title="Settings & Display Options"
        >
          settings
        </button>
      </div>
    </header>
  );
}
