import { ActiveTab, EssentialItem, RoomCardData } from '../types';
import { D3EssentialsProgressBar } from './D3EssentialsProgressBar';

interface DashboardViewProps {
  onTabChange: (tab: ActiveTab) => void;
  day1Essentials: EssentialItem[];
  onToggleEssential: (id: string) => void;
  onOpenAddReminder: () => void;
  onOpenSuiteDesigner: () => void;
  roomCards: RoomCardData[];
}

export function DashboardView({
  onTabChange,
  day1Essentials,
  onToggleEssential,
  onOpenAddReminder,
  onOpenSuiteDesigner,
  roomCards,
}: DashboardViewProps) {
  const completedCount = day1Essentials.filter((e) => e.completed).length;
  const essentialsPercentage = day1Essentials.length > 0
    ? Math.round((completedCount / day1Essentials.length) * 100)
    : 0;

  // Overall settling calculation
  const avgRoomProgress = roomCards.length > 0
    ? Math.round(roomCards.reduce((acc, r) => acc + r.progress, 0) / roomCards.length)
    : 50;
  const overallSettled = Math.round((essentialsPercentage * 0.4) + (avgRoomProgress * 0.6));

  const circumference = 282.7;
  const strokeDashoffset = circumference - (overallSettled / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-8 pb-32 md:pb-16">
      {/* Hero & Overall Progress */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div className="md:col-span-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            System Dashboard
          </div>
          <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Welcome Home, Radhika.
          </h2>
          <p className="font-body-lg text-slate-600 max-w-2xl text-base">
            Your settling journey is well underway. We've organized your essentials and room planners to help you find your rhythm in the new space.
          </p>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-end pt-2 md:pt-0">
          <div className="relative w-40 h-40 md:w-44 md:h-44 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 p-2 shadow-inner">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth="7"
              />
              <circle
                className="progress-ring-circle transition-all duration-700 ease-out"
                cx="50"
                cy="50"
                r="42"
                fill="transparent"
                stroke="url(#sleek-gradient)"
                strokeWidth="7"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={`${strokeDashoffset}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="sleek-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="font-headline-lg text-3xl font-extrabold text-slate-900">
                {overallSettled}%
              </span>
              <span className="font-label-sm text-[11px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                Settled
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Layout: Day 1 Essentials & Room Planners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Day 1 Essentials Checklist */}
        <aside className="md:col-span-1 sleek-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                </div>
                <h3 className="font-headline-md text-lg text-slate-900 font-bold">
                  Day 1 Essentials
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {completedCount}/{day1Essentials.length}
              </span>
            </div>

            {/* D3.js Essentials Checklist Progress Bar */}
            <D3EssentialsProgressBar
              completedCount={completedCount}
              totalCount={day1Essentials.length}
              percentage={essentialsPercentage}
            />

            <ul className="space-y-2.5">
              {day1Essentials.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onToggleEssential(item.id)}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer group border border-slate-200/60"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-grow">
                    <p className={`font-label-md text-xs font-medium text-slate-900 ${item.completed ? 'line-through text-slate-400' : ''}`}>
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
                  </div>
                  {item.icon && (
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 transition-colors text-lg">
                      {item.icon}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onOpenAddReminder}
            className="w-full mt-6 bg-slate-900 text-white py-2.5 rounded-xl font-label-md text-xs font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add</span> Add Reminder
          </button>
        </aside>

        {/* Room Planners Quick Access */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Room Card 1: Kids Room */}
          <div className="group sleek-card overflow-hidden flex flex-col h-full hover:border-slate-300 transition-all">
            <div
              className="h-40 bg-cover bg-center overflow-hidden transition-transform duration-500 group-hover:scale-105 relative"
              style={{ backgroundImage: `url('${roomCards[0].imageUrl}')` }}
            >
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide">
                    {roomCards[0].tag}
                  </span>
                  <span className="text-emerald-600 font-semibold text-xs bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    {roomCards[0].progress}% Done
                  </span>
                </div>
                <h4 className="font-headline-md text-lg text-slate-900 font-bold mb-1">
                  {roomCards[0].name}
                </h4>
                <p className="text-slate-600 font-body-md text-xs mb-4">
                  {roomCards[0].description}
                </p>
              </div>

              <div>
                <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${roomCards[0].progress}%` }}
                  />
                </div>
                <button
                  onClick={() => onTabChange('kids-room')}
                  className="text-indigo-600 font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all hover:text-indigo-800 cursor-pointer"
                >
                  Open Planner <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Room Card 2: Guest Suite */}
          <div className="group sleek-card overflow-hidden flex flex-col h-full hover:border-slate-300 transition-all">
            <div
              className="h-40 bg-cover bg-center overflow-hidden transition-transform duration-500 group-hover:scale-105 relative"
              style={{ backgroundImage: `url('${roomCards[1].imageUrl}')` }}
            >
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide">
                    {roomCards[1].tag}
                  </span>
                  <span className="text-emerald-600 font-semibold text-xs bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    {roomCards[1].progress}% Done
                  </span>
                </div>
                <h4 className="font-headline-md text-lg text-slate-900 font-bold mb-1">
                  {roomCards[1].name}
                </h4>
                <p className="text-slate-600 font-body-md text-xs mb-4">
                  {roomCards[1].description}
                </p>
              </div>

              <div>
                <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${roomCards[1].progress}%` }}
                  />
                </div>
                <button
                  onClick={() => onTabChange('master-suite')}
                  className="text-purple-600 font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all hover:text-purple-800 cursor-pointer"
                >
                  Open Planner <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Room Card 3: Master Suite */}
          <div className="group sleek-card overflow-hidden flex flex-col h-full sm:col-span-2 hover:border-slate-300 transition-all">
            <div className="flex flex-col md:flex-row h-full">
              <div
                className="md:w-1/2 h-48 md:h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 min-h-[180px] relative"
                style={{ backgroundImage: `url('${roomCards[2].imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide">
                      {roomCards[2].tag}
                    </span>
                    <span className="text-emerald-600 font-semibold text-xs bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {roomCards[2].progress}% Done
                    </span>
                  </div>
                  <h4 className="font-headline-md text-lg text-slate-900 font-bold mb-1">
                    {roomCards[2].name}
                  </h4>
                  <p className="text-slate-600 font-body-md text-xs mb-4">
                    {roomCards[2].description}
                  </p>
                </div>

                <div>
                  <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className="bg-slate-800 h-full rounded-full transition-all duration-500"
                      style={{ width: `${roomCards[2].progress}%` }}
                    />
                  </div>
                  <button
                    onClick={() => onTabChange('master-suite')}
                    className="text-slate-800 font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all hover:text-slate-950 cursor-pointer"
                  >
                    Open Planner <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary CTAs / Stat Row */}
      <section className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div
          onClick={() => alert("Delivery tracking: 3 items (Nordic Oak Storage, Checkered Rug, Lighting) arriving today between 2-4 PM.")}
          className="sleek-card flex items-center gap-4 p-5 cursor-pointer hover:border-indigo-300 transition-all"
        >
          <div className="bg-indigo-50 text-indigo-600 border border-indigo-100 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">local_shipping</span>
          </div>
          <div>
            <p className="font-label-md text-xs font-bold text-slate-900">Track Delivery</p>
            <p className="text-[11px] text-slate-500">3 items arriving today</p>
          </div>
        </div>

        <div
          onClick={() => alert("TaskRabbit Integration: 2 assembly helpers reserved for Saturday morning.")}
          className="sleek-card flex items-center gap-4 p-5 cursor-pointer hover:border-purple-300 transition-all"
        >
          <div className="bg-purple-50 text-purple-600 border border-purple-100 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">design_services</span>
          </div>
          <div>
            <p className="font-label-md text-xs font-bold text-slate-900">Hire Help</p>
            <p className="text-[11px] text-slate-500">TaskRabbit reserved</p>
          </div>
        </div>

        <div
          onClick={() => alert("Inventory Log: 84 total moving boxes logged, 52 unpacked.")}
          className="sleek-card flex items-center gap-4 p-5 cursor-pointer hover:border-slate-300 transition-all"
        >
          <div className="bg-slate-100 text-slate-700 border border-slate-200 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">inventory</span>
          </div>
          <div>
            <p className="font-label-md text-xs font-bold text-slate-900">Inventory</p>
            <p className="text-[11px] text-slate-500">84 boxes logged</p>
          </div>
        </div>

        <div
          onClick={onOpenSuiteDesigner}
          className="accent-gradient text-white flex items-center gap-4 p-5 rounded-xl cursor-pointer hover:opacity-95 transition-all shadow-xs"
        >
          <div className="bg-white/20 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-xl">add</span>
          </div>
          <div>
            <p className="font-label-md text-xs font-bold text-white">New Project</p>
            <p className="text-[11px] text-white/80">Plan a new space</p>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        onClick={onOpenAddReminder}
        className="fixed bottom-24 md:bottom-12 right-6 md:right-12 w-12 h-12 bg-slate-900 text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-slate-800 active:scale-95 transition-all z-40 group cursor-pointer border border-slate-700"
        title="Add Reminder or Task"
      >
        <span className="material-symbols-outlined text-xl">edit_note</span>
        <span className="absolute right-14 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md border border-slate-800 font-medium">
          Add Reminder
        </span>
      </button>
    </div>
  );
}
