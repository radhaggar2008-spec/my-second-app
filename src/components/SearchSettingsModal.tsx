import { useState } from 'react';
import { ActiveTab } from '../types';

interface SearchSettingsModalProps {
  mode: 'search' | 'settings' | null;
  onClose: () => void;
  onTabChange: (tab: ActiveTab) => void;
}

export function SearchSettingsModal({
  mode,
  onClose,
  onTabChange,
}: SearchSettingsModalProps) {
  if (!mode) return null;

  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = [
    { title: 'Day 1 Essentials Checklist', category: 'Dashboard', tab: 'dashboard' as ActiveTab },
    { title: 'Playful Haven (Kids Room)', category: 'Room Planners', tab: 'kids-room' as ActiveTab },
    { title: 'Montessori Floor Bed Setup', category: 'Kids Room', tab: 'kids-room' as ActiveTab },
    { title: 'Safety Check & Outlet Covers', category: 'Kids Safety', tab: 'kids-room' as ActiveTab },
    { title: 'The Master Sanctuary Suite', category: 'Master Suite', tab: 'master-suite' as ActiveTab },
    { title: 'Closet Systems for Two', category: 'Organization', tab: 'master-suite' as ActiveTab },
    { title: 'HVAC & Climate Inspection', category: 'Exterior', tab: 'exterior' as ActiveTab },
    { title: 'Landscaping 101 Guide', category: 'Exterior', tab: 'exterior' as ActiveTab },
  ].filter(
    (item) =>
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {mode === 'search' ? (
          <div>
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
              <input
                type="text"
                autoFocus
                placeholder="Search rooms, guides, checklists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto custom-scrollbar space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Search Results ({searchResults.length})
              </p>
              {searchResults.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">
                  No matching guides or sections found for "{searchQuery}".
                </p>
              ) : (
                searchResults.map((res, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onTabChange(res.tab);
                      onClose();
                    }}
                    className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center cursor-pointer transition-colors shadow-2xs"
                  >
                    <div>
                      <p className="font-label-md text-xs font-bold text-slate-900">
                        {res.title}
                      </p>
                      <span className="text-[10px] text-indigo-600 font-bold uppercase">
                        {res.category}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-xs text-slate-400">
                      arrow_forward_ios
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
              <h3 className="font-headline-md text-lg text-white font-bold">
                Applet Settings
              </h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="font-label-md text-xs font-bold text-slate-900">
                  Theme Palette: Sleek Modern Slate & Indigo
                </p>
                <p className="text-xs text-slate-500">
                  Designed with high-contrast slate cards, rounded layouts, and subtle indigo accents.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-700">
                  <span className="text-slate-500">Application Version</span>
                  <span className="font-mono text-indigo-600 font-bold">v2.5.0-Sleek</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-700">
                  <span className="text-slate-500">Local Persistence</span>
                  <span className="text-emerald-600 font-bold">Active ✓</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-2xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
