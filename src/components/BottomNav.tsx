import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-slate-900 border-t border-slate-800 flex justify-around items-center px-4 py-2.5 shadow-lg">
      <button
        onClick={() => onTabChange('dashboard')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'dashboard'
            ? 'text-indigo-400 font-semibold scale-105'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'dashboard' ? "'FILL' 1" : "'FILL' 0" }}
        >
          dashboard
        </span>
        <span className="font-label-sm text-[11px] leading-tight mt-0.5">Dashboard</span>
      </button>

      <button
        onClick={() => onTabChange('kids-room')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'kids-room' || activeTab === 'master-suite'
            ? 'text-indigo-400 font-semibold scale-105'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'kids-room' || activeTab === 'master-suite' ? "'FILL' 1" : "'FILL' 0" }}
        >
          weekend
        </span>
        <span className="font-label-sm text-[11px] leading-tight mt-0.5">Rooms</span>
      </button>

      <button
        onClick={() => onTabChange('exterior')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'exterior'
            ? 'text-indigo-400 font-semibold scale-105'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'exterior' ? "'FILL' 1" : "'FILL' 0" }}
        >
          home_repair_service
        </span>
        <span className="font-label-sm text-[11px] leading-tight mt-0.5">Exterior</span>
      </button>

      <button
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'profile'
            ? 'text-indigo-400 font-semibold scale-105'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
        >
          person
        </span>
        <span className="font-label-sm text-[11px] leading-tight mt-0.5">Profile</span>
      </button>
    </nav>
  );
}
