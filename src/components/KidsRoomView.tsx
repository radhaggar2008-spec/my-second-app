import { useState } from 'react';
import { MaterialColor, SelectedElement } from '../types';

interface KidsRoomViewProps {
  onOpenSuiteDesigner: () => void;
  selectedElements: SelectedElement[];
  onToggleElementInProject: (id: string) => void;
  onOpenAddItem: () => void;
  materialPalette: MaterialColor[];
}

export function KidsRoomView({
  onOpenSuiteDesigner,
  selectedElements,
  onToggleElementInProject,
  onOpenAddItem,
  materialPalette,
}: KidsRoomViewProps) {
  const [bedType, setBedType] = useState('Montessori Floor Bed');
  const [nightlightIntensity, setNightlightIntensity] = useState(65);
  const [safetyChecks, setSafetyChecks] = useState([
    { id: 's1', label: 'Outlet Covers Installed', checked: true },
    { id: 's2', label: 'Furniture Anchoring Kits', checked: false },
    { id: 's3', label: 'Blind Cord Safety', checked: false },
    { id: 's4', label: 'Corner Protectors', checked: true },
  ]);
  const [activeMaterial, setActiveMaterial] = useState<MaterialColor | null>(materialPalette[0]);

  const toggleSafetyCheck = (id: string) => {
    setSafetyChecks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedSafetyCount = safetyChecks.filter((c) => c.checked).length;
  const safetyPercentage = Math.round((checkedSafetyCount / safetyChecks.length) * 100);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 pt-8 pb-32 md:pb-16 space-y-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div className="md:w-1/2 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-label-sm text-xs uppercase tracking-wider font-semibold">
            CREATIVE SPACES
          </span>
          <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Designed for Play, Built for Safety.
          </h2>
          <p className="font-body-lg text-slate-600 max-w-lg text-sm md:text-base">
            Transforming your child's room into a sanctuary of imagination while ensuring every corner meets the highest safety standards.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpenSuiteDesigner}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-label-md text-xs font-semibold hover:bg-slate-800 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              Start Planning
            </button>
            <button
              onClick={() => alert('Safety Guide: All furniture over 24" must be anchored using anti-tip straps. Ensure electrical outlets have slide covers.')}
              className="border border-slate-200 bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl font-label-md text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Safety Guide
            </button>
          </div>
        </div>

        <div className="md:w-1/2 relative h-[320px] md:h-[360px] w-full rounded-xl overflow-hidden shadow-xs group border border-slate-200">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOtgQMCnitmbiGj42Px7cARrXXJT_CYMAqv3sRCnhskVRL2NBPr0VBajAVb7MNzX22sNVBQOv_TevosArIpl1cn6jgn8dEoUJsdkZo-JaxlhJorOTtN7gldTvdYTZCezsdfmgqzwt2BmOTEUHDXbzVUJW9XFHpRPX_3k_akALNFU9PLsULxDWfe4fFQsVHuIzgMo0gB36Q9LeOk__J2EZVRK7Lwe5wFZgGcfKpBh2u6KJCcwKqGI2NTw"
            alt="Children's room preview"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </section>

      {/* Bento Grid Planner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sleep Zone */}
        <div className="md:col-span-8 sleek-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline-md text-xl text-slate-900 font-bold mb-1">Sleep Zone</h3>
                <p className="text-slate-500 font-body-md text-xs">
                  Optimizing rest with mindful placements.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined text-2xl">bedtime</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="font-label-md text-[10px] text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                    Bed Type
                  </label>
                  <select
                    value={bedType}
                    onChange={(e) => setBedType(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-xs text-slate-900 font-semibold cursor-pointer"
                  >
                    <option value="Montessori Floor Bed">Montessori Floor Bed</option>
                    <option value="Standard Twin">Standard Twin</option>
                    <option value="Bunk Beds">Bunk Beds</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label-md text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Nightlight Intensity
                    </label>
                    <span className="text-xs font-bold text-indigo-600">{nightlightIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={nightlightIntensity}
                    onChange={(e) => setNightlightIntensity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <div className="rounded-xl overflow-hidden h-44 md:h-full relative border border-slate-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVR-_lYWyYd3ah8pl93tXTkGtviIrmc1C3ntkv9WmCgkSxo50dCg605C70qsR3nrnF0i4yJ4Gk57Ka9Apz523zra1A6SaRHl8zwj1OnAmmPBwN4bAkVbJGSa4MBW6CW4wHmgRgmveaxhzjfCNjs0kBfgIPGrCIIjmu0H-w2HbEtI3VU-MegyQeCMDuIKB-RE8C5TtGCKSUfIXrZge8icEuhPdVq7MZKRPeIwwEV1_-hFttMES61myzuQ"
                  alt="Sleep zone nook"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-slate-900/20 pointer-events-none transition-opacity"
                  style={{ opacity: (100 - nightlightIntensity) / 100 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Safety Pulse */}
        <div className="md:col-span-4 bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between border border-slate-800">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-white">Safety Check</h3>
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                <span className="material-symbols-outlined text-xl">verified_user</span>
              </div>
            </div>
            <ul className="space-y-3">
              {safetyChecks.map((check) => (
                <li
                  key={check.id}
                  onClick={() => toggleSafetyCheck(check.id)}
                  className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/80 p-2 rounded-xl transition-colors border border-transparent hover:border-slate-700/50"
                >
                  <input
                    type="checkbox"
                    checked={check.checked}
                    onChange={() => {}}
                    className="rounded border-slate-700 text-indigo-500 focus:ring-0 h-4 w-4 cursor-pointer accent-indigo-500"
                  />
                  <span className={`font-body-md text-xs font-medium ${check.checked ? 'text-white' : 'text-slate-400'}`}>
                    {check.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <p className="font-label-sm text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Completion Status
              </p>
              <span className="text-xs font-bold text-indigo-400">{safetyPercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${safetyPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Play Area */}
        <div className="md:col-span-5 sleek-card p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-headline-md text-xl text-slate-900 font-bold">Play Area</h3>
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <span className="material-symbols-outlined text-xl">toys</span>
            </div>
          </div>
          <p className="font-body-md text-xs text-slate-500 mb-4">
            Interactive storage and textured rugs for tactile learning.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-slate-100 px-3 py-1 rounded-md text-[11px] font-semibold text-slate-700 border border-slate-200">
              Wool Rug
            </span>
            <span className="bg-slate-100 px-3 py-1 rounded-md text-[11px] font-semibold text-slate-700 border border-slate-200">
              Low Shelves
            </span>
            <span className="bg-slate-100 px-3 py-1 rounded-md text-[11px] font-semibold text-slate-700 border border-slate-200">
              Craft Table
            </span>
          </div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlfVdkbv350oGyyXhPhqZqs3uoR_qOz29FgL0LhajEECwIFFzZZDahz_14tvv408j4_A_YimmO3HEohzqzebmt_ZQmpeTr2JCilh2_7ZHiehsC6pwZJg0w0s4hJhboRJNPLVlSrOBbH-WLscU8SSiZCwjL8WNadKt4I6XqrwyLvgPVxeZb0FQGiRbFCjezyAUa3fHr0RhyNqMaXV3FhcamJDLejMMgFDUSXDSVWyy9bD9sF6np7KH5aw"
            alt="Play area"
            className="w-full h-36 object-cover rounded-xl border border-slate-200"
          />
        </div>

        {/* Safe Materials Palette */}
        <div className="md:col-span-7 sleek-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-xl text-slate-900 font-bold mb-4">
              Safe Materials Palette
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {materialPalette.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat)}
                  className={`group cursor-pointer p-2.5 rounded-xl transition-all border ${
                    activeMaterial?.id === mat.id
                      ? 'border-indigo-600 bg-indigo-50/50'
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className="aspect-square rounded-lg mb-2 group-hover:scale-105 transition-transform border border-slate-200"
                    style={{ backgroundColor: mat.hex }}
                  />
                  <p className="font-label-sm text-xs text-center font-semibold text-slate-900">
                    {mat.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {activeMaterial && (
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-slate-900">{activeMaterial.name}: </span>
              {activeMaterial.description}
            </div>
          )}
        </div>
      </div>

      {/* Room Inventory Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-slate-900">
            Selected Elements
          </h2>
          <button
            onClick={onOpenAddItem}
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">add</span> Add Custom Item
          </button>
        </div>

        <div className="flex overflow-x-auto gap-5 pb-4 custom-scrollbar">
          {selectedElements.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] max-w-[280px] sleek-card overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden relative border-b border-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-slate-700 shadow-2xs border border-slate-200">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-label-md text-sm font-bold text-slate-900 mb-0.5">
                    {item.name}
                  </h4>
                  <p className="text-slate-500 text-xs font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex justify-between items-center">
                <span className="font-label-md text-sm font-bold text-indigo-600">
                  ${item.price}
                </span>
                <button
                  onClick={() => onToggleElementInProject(item.id)}
                  className={`material-symbols-outlined transition-colors cursor-pointer text-2xl ${
                    item.inProject
                      ? 'text-indigo-600 hover:text-indigo-800'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title={item.inProject ? 'In project (Click to remove)' : 'Add to project'}
                >
                  {item.inProject ? 'check_circle' : 'add_circle'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
