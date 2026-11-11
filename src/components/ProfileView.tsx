import { useState } from 'react';

interface ProfileViewProps {
  onExportData: () => void;
  onResetData: () => void;
}

export function ProfileView({ onExportData, onResetData }: ProfileViewProps) {
  const [highContrast, setHighContrast] = useState(false);
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-12 py-8 space-y-8 pb-32 md:pb-16">
      {/* Profile Header */}
      <div className="sleek-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-display-lg text-2xl font-bold shrink-0 shadow-2xs">
          RA
        </div>
        <div className="text-center md:text-left space-y-1 flex-grow">
          <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            PRIMARY HOMEOWNER
          </span>
          <h2 className="font-headline-lg text-2xl md:text-3xl text-slate-900 font-bold">
            Radhika
          </h2>
          <p className="font-body-md text-xs md:text-sm text-slate-500">
            142 Maplewood Avenue • 4 Bed, 3 Bath • Settled April 2026
          </p>
        </div>
      </div>

      {/* Settling Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="sleek-card p-4 text-center">
          <span className="block font-display-lg text-2xl md:text-3xl font-bold text-indigo-600">
            65%
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Home Settled</span>
        </div>
        <div className="sleek-card p-4 text-center">
          <span className="block font-display-lg text-2xl md:text-3xl font-bold text-purple-600">
            12
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Saved Elements</span>
        </div>
        <div className="sleek-card p-4 text-center">
          <span className="block font-display-lg text-2xl md:text-3xl font-bold text-slate-900">
            4
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Reminders</span>
        </div>
        <div className="sleek-card p-4 text-center">
          <span className="block font-display-lg text-2xl md:text-3xl font-bold text-slate-700">
            3
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Room Planners</span>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="sleek-card p-6 md:p-8 space-y-6">
        <h3 className="font-headline-md text-lg font-bold text-slate-900">
          Application Preferences
        </h3>

        <div className="space-y-4">
          {/* High Contrast */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-label-md text-xs font-bold text-slate-900">
                High Contrast Display
              </p>
              <p className="text-xs text-slate-500">
                Enhances border visibility and text contrast throughout all screens.
              </p>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                highContrast ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-2xs transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Measurement System */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <p className="font-label-md text-xs font-bold text-slate-900">
                Measurement System
              </p>
              <p className="text-xs text-slate-500">
                Used for floorplans, pathway clearance, and furniture sizing.
              </p>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setUnits('imperial')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  units === 'imperial'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Feet / Inches
              </button>
              <button
                onClick={() => setUnits('metric')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  units === 'metric'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Meters / cm
              </button>
            </div>
          </div>

          {/* Smart Notifications */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <p className="font-label-md text-xs font-bold text-slate-900">
                Seasonal Maintenance Alerts
              </p>
              <p className="text-xs text-slate-500">
                Receive timely reminders for HVAC, gutter cleaning, and garden prep.
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                notifications ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-2xs transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="sleek-card p-6 md:p-8 space-y-4">
        <h3 className="font-headline-md text-lg font-bold text-slate-900">
          Data & Export Options
        </h3>
        <p className="text-xs text-slate-500">
          Manage your saved room plans, custom elements, and checklist items.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onExportData}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Export Home Data (JSON)
          </button>
          <button
            onClick={onResetData}
            className="border border-red-200 text-red-600 bg-red-50/50 px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-red-100/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
            Reset Demo Data
          </button>
        </div>
      </div>
    </div>
  );
}
