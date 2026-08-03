import { useState } from 'react';

interface MasterSuiteViewProps {
  onOpenSuiteDesigner: () => void;
  onOpenAddReminder: () => void;
}

export function MasterSuiteView({
  onOpenSuiteDesigner,
  onOpenAddReminder,
}: MasterSuiteViewProps) {
  const [smartLightingValue, setSmartLightingValue] = useState(65);
  const [isSaved, setIsSaved] = useState(false);
  const [temperature, setTemperature] = useState(72);
  const [quickReminders, setQuickReminders] = useState([
    { id: 'r1', label: 'Secure area rugs', checked: true },
    { id: 'r2', label: 'Check nightlight bulbs', checked: false },
    { id: 'r3', label: 'Label drawer pulls', checked: false },
  ]);

  const toggleReminder = (id: string) => {
    setQuickReminders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-12 pb-32 md:pb-16">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-1">
            <span className="uppercase tracking-widest text-indigo-600 font-label-sm text-xs block font-semibold">
              REFINING THE PRIVATE SPACE
            </span>
            <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              The Master Sanctuary
            </h2>
            <p className="font-body-lg text-slate-600 pt-1 text-sm md:text-base">
              Curating a balanced environment for rest, productivity, and organization.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`px-5 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isSaved
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isSaved ? 'Project Saved ✓' : 'Save Project'}
            </button>
            <button
              onClick={() => alert('Layout link copied to clipboard!')}
              className="border border-slate-200 bg-white text-slate-700 px-5 py-2.5 rounded-xl font-label-md text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
            >
              Share Layout
            </button>
          </div>
        </div>

        {/* Bento Grid: Visual Inspiration */}
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-12 md:col-span-8 h-[360px] md:h-[420px] relative rounded-2xl overflow-hidden group shadow-xs border border-slate-200">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYWyh5VEk1cHxc2WHC9FTe20c29iFtclsgQiY-Pc9F_BH9WanLDVQAUbIH43Q2WA6r3W-U1zks83UNDq-iCM8FBkaUCueY3ssXohAATu8OFtzBv9JIpOrwX1u4hsX8WdfsKOPf43dtWI9EmkJIRCVUtO8IKVQ9-HLyQnrpxZmfvqpkK0exfk2fQca6ZnfTGudJhqZT10OI9ccbMq1noXaIACGvOLxodFdxIeCavK5JGpTuoFAA3daA-A')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white max-w-lg">
              <span className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                CURRENTLY VIEWING
              </span>
              <h3 className="font-headline-lg text-2xl md:text-3xl font-bold mt-2 text-white">
                Soft Textures & Ambient Glow
              </h3>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 h-[420px] flex flex-col gap-6">
            <div className="flex-1 sleek-card p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
                  <span className="material-symbols-outlined text-2xl">lightbulb</span>
                </div>
                <h4 className="font-headline-md text-lg font-bold text-slate-900">Smart Lighting</h4>
                <p className="font-body-md text-xs text-slate-500">
                  Circadian systems that dim to warm ambers at sunset.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs text-slate-600 font-semibold">
                  <span>Sunset Warmth</span>
                  <span className="text-indigo-600">{smartLightingValue}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={smartLightingValue}
                  onChange={(e) => setSmartLightingValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between border border-indigo-950/50 shadow-xs">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-indigo-300 mb-2">
                  <span className="material-symbols-outlined text-2xl">waves</span>
                </div>
                <h4 className="font-headline-md text-lg font-bold text-white">Acoustic Panels</h4>
                <p className="font-body-md text-xs text-slate-300">
                  Textured wool wraps to dampen household noise for deep sleep.
                </p>
              </div>
              <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-indigo-300">
                PREMIUM UPGRADE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Climate & Movement Controls */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Ease of Movement Section */}
        <div className="md:col-span-8 sleek-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-2xl">directions_walk</span>
            </div>
            <h3 className="font-headline-md text-xl font-bold text-slate-900">Ease of Movement</h3>
          </div>

          <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-slate-200 group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv3IvTOc7nTXI59ZaEjJbzpic5oswRnCD14G0EmNQBIxQbqvxzQsC-a7KCnIxOIAke9kgVUGhgZjR5dmOL8U8sIpMbzUx8esvR7yclDtu4VR8iwCkg700OXGiasgMzQIySTYw1LzPyWvihvN1XL4raCgHK5RLEjubk3LoZLX8Df35Kohox3RRqdAnHw8stWRMCD1qluLxK92IUUqlg1xkDro7QKDObb_wGPFmGpO88tYW2DsofLTIkiQ"
              alt="Living Room Planning"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
              <span className="text-white font-label-md text-xs bg-slate-900/80 px-3.5 py-1.5 rounded-lg backdrop-blur-xs border border-white/10 font-medium">
                Optimal Pathway View (36" Clearance)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-label-md text-xs text-slate-900 mb-1.5 font-bold">
                Pathway Clearance
              </h4>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[92%]" />
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">92% Compliance - 36" wide throughout</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-label-md text-xs text-slate-900 mb-1.5 font-bold">
                Lighting Level
              </h4>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[85%]" />
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">85% Compliance - High CRI LEDs installed</p>
            </div>
          </div>
        </div>

        {/* Climate & Quick Reminders */}
        <div className="md:col-span-4 space-y-6">
          {/* Smart Temperature Hub */}
          <div className="sleek-card p-6 flex flex-col justify-between h-[270px]">
            <div>
              <p className="text-[10px] text-indigo-600 uppercase tracking-widest font-bold mb-1">
                Environment
              </p>
              <h4 className="font-headline-md text-lg font-bold text-slate-900">Smart Temperature Hub</h4>
            </div>

            <div className="flex items-center justify-center my-2">
              <div className="relative w-24 h-24 rounded-full border-4 border-indigo-600 flex items-center justify-center shadow-xs bg-slate-50">
                <span className="text-2xl font-display-lg font-bold text-slate-900">{temperature}°</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-medium text-slate-500">Humidity: 45%</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setTemperature((t) => Math.max(60, t - 1))}
                  className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => setTemperature((t) => Math.min(85, t + 1))}
                  className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Quick Reminders */}
          <div className="sleek-card p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-label-md text-xs font-bold text-slate-900 uppercase tracking-wider">
                Quick Reminders
              </h3>
              <button onClick={onOpenAddReminder} className="text-xs font-bold text-indigo-600 hover:underline">
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {quickReminders.map((r) => (
                <label
                  key={r.id}
                  onClick={() => toggleReminder(r.id)}
                  className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={r.checked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                  />
                  <span className={`text-xs font-medium text-slate-700 ${r.checked ? 'line-through text-slate-400' : ''}`}>
                    {r.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Storage & Organization */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full font-label-sm text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            Storage & Efficiency
          </div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-slate-900">
            Closet Systems for Two
          </h2>
          <p className="font-body-lg text-xs md:text-sm text-slate-600">
            Symmetrical organization tailored for individual needs. Integrated valet rods, velvet-lined jewelry drawers, and backlit shelving for effortless mornings.
          </p>
          <ul className="space-y-3 pt-2">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-indigo-600 mt-0.5 text-xl">
                check_circle
              </span>
              <div>
                <p className="font-label-md text-xs font-bold text-slate-900">Double Valet Rails</p>
                <p className="font-body-md text-xs text-slate-500">
                  Separate heights for long dresses and structured blazers.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-indigo-600 mt-0.5 text-xl">
                check_circle
              </span>
              <div>
                <p className="font-label-md text-xs font-bold text-slate-900">Invisible Drawers</p>
                <p className="font-body-md text-xs text-slate-500">
                  Handle-less push-to-open technology for a clean aesthetic.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 gap-6">
          <div className="h-72 md:h-80 rounded-2xl overflow-hidden shadow-xs border border-slate-200">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUjZRC6l7gqtPgm5WhpS1jdjMmJYaJj06TFqAyp9unREnBUlyvNoSDtHi0S3ZKu8CJDIpYGWav6oOBBMJJyEf52DuWfanOHt7QpvPg6BXxpMpgwXTfy2Q1UaYbLeJEwyrcxF67rZ85CmD5GzbT4ud0WdtPaXx7OqfGY10rplxPNVHCnl1vBx7fnIRfsHWoRUoiFlq8ibm2JLyQ0MW_4dHctzUUnCIKOng9c1KXjvcHk_j_TGh3GlxvvQ"
              alt="Organized closet drawers"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="h-72 md:h-80 rounded-2xl overflow-hidden shadow-xs border border-slate-200 md:mt-8">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIDzYQPtBbtHD0tYn-N1bjnPlV5-wypLX2mG2wKb8SMOPKBbIsPxFVf5dYBgLbSjXFFIp7mZ6Xewgw__TprmV5Vd4msurZtDqmAQZBvzRV6GC9KTcwPwhO5EKW9wAPnHXNr83ORS0J1a4EK1ejjcoXdT2DNDt88nwGle2O1SblpULX9j9ZayLyO0QZIK9EhNKBpG8xJyMxufSGFTefPKUvLnH9sbtbvQ2soMTHMAX2xmNYJpF0Mw8vDw"
              alt="Backlit closet shelving"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Section: The Workspace */}
      <section className="bg-white rounded-2xl p-6 md:p-8 space-y-8 border border-slate-200 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-slate-900">
            The Integrated Workspace
          </h2>
          <p className="font-body-lg text-xs md:text-sm text-slate-500">
            A dedicated "Focus Niche" that vanishes into the decor when the day is done. Minimal footprint, maximum clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Desk Concept 1 */}
          <div className="sleek-card p-6 flex flex-col justify-between">
            <div>
              <div className="h-44 rounded-xl overflow-hidden mb-4 border border-slate-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5av-RCbjq6pT-vLDVRrC13QHq2J1tGI0RLS8VI029C9Cl46qpCenQTkimUz2Tt2j0rzzLvuzFK-KmD00yOLG9TgNrRmrPlLgSQi2bwQ4Sfn4-byDpXFZ6W9aW7YKcsWh6oi-Hzo8n_PqmeurZVUpnd6qF6SB3Lu6S9ZuSawAbH5zVEY7Z-aqZpKNs-edZxoYJYMP_795r9KF4N6unzpDC6bNYcCWLD7wD4Lj8irIfHLkX1dYWyJp4SA"
                  alt="Floating Niche"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="font-label-md text-[10px] uppercase text-indigo-600 font-bold tracking-wider">
                CONCEPT 01
              </h5>
              <h4 className="font-headline-md text-lg font-bold text-slate-900 mb-1">
                The Floating Niche
              </h4>
              <p className="font-body-md text-xs text-slate-500">
                Wall-mounted walnut shelving that provides a professional backdrop for video calls without occupying floor space.
              </p>
            </div>
            <button
              onClick={onOpenSuiteDesigner}
              className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 text-left cursor-pointer"
            >
              Configure in Designer →
            </button>
          </div>

          {/* Desk Concept 2 */}
          <div className="sleek-card p-6 flex flex-col justify-between">
            <div>
              <div className="h-44 rounded-xl overflow-hidden mb-4 border border-slate-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkf_zpxLpeWqUmZkwDs-aiK-ppTBQ_YE7fwn2ya0F4UHyp4TPWEE69VwZHhrqmh82BGd6UENfQUuRxGNw2J9YhFyoP8RukW4w_KUtr0-__DAu0vnxSL5pvuwSt6HB3cAk5wCgaXpowZbHSbW1eLiXH3YU9zHJbdx8fI24S2w0lzmFTO4I2p3TQjq43iPWwnK0x6vcN534lBDTnDNmuYzyQD803C35uum7TddTyhVL_K0TGQVy-xrOCpg"
                  alt="Dual-Purpose Vanity"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="font-label-md text-[10px] uppercase text-indigo-600 font-bold tracking-wider">
                CONCEPT 02
              </h5>
              <h4 className="font-headline-md text-lg font-bold text-slate-900 mb-1">
                Dual-Purpose Vanity
              </h4>
              <p className="font-body-md text-xs text-slate-500">
                A sophisticated marble-topped surface that functions as both a morning beauty station and an afternoon creative hub.
              </p>
            </div>
            <button
              onClick={onOpenSuiteDesigner}
              className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 text-left cursor-pointer"
            >
              Configure in Designer →
            </button>
          </div>

          {/* Desk Concept 3 */}
          <div className="sleek-card p-6 flex flex-col justify-between">
            <div>
              <div className="h-44 rounded-xl overflow-hidden mb-4 border border-slate-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC84HsFxOUylyT5kLa3kN85azoVMo7m8qs9yU-f8unOGNyb8zt2SUjvF2RmCfed3OND7VJQEA5VZkD_FhBFE76toO2Ls_vVaBvAw7P30EuAo8qvhj2IpLFfCAyVVqpQdgEmYENTUNySnt2Cxiwi4sUW_wXg79xnp-GrskU38oP1qYbLZ2Qm3DctjinJPH9U-P1kzR_oFvvVS3cXValJTFSparwpOVYCBQgN6GF9g8TyzU2VqJXJ_FRQlg"
                  alt="The Hidden Cloffice"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="font-label-md text-[10px] uppercase text-indigo-600 font-bold tracking-wider">
                CONCEPT 03
              </h5>
              <h4 className="font-headline-md text-lg font-bold text-slate-900 mb-1">
                The Hidden Cloffice
              </h4>
              <p className="font-body-md text-xs text-slate-500">
                Smart cabinetry that conceals monitors and tech, allowing for a total mental transition from work to rest.
              </p>
            </div>
            <button
              onClick={onOpenSuiteDesigner}
              className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 text-left cursor-pointer"
            >
              Configure in Designer →
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Floorplan Banner */}
      <section className="relative overflow-hidden rounded-2xl h-[320px] flex items-center justify-center p-6 text-center bg-slate-900 border border-slate-800 shadow-md">
        <div className="relative z-10 bg-slate-800/80 backdrop-blur-md border border-slate-700/80 p-8 rounded-2xl max-w-xl text-white space-y-3">
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-white">
            Start Your Floorplan
          </h2>
          <p className="font-body-lg text-xs md:text-sm text-slate-300">
            Drag and drop elements into our interactive 2D editor to visualize your new suite layout.
          </p>
          <button
            onClick={onOpenSuiteDesigner}
            className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-label-md text-xs hover:bg-slate-100 transition-all font-bold shadow-xs cursor-pointer active:scale-95"
          >
            Open Suite Designer
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white rounded-2xl py-8 px-6 md:px-8 mt-12 border border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-2 max-w-sm">
            <h2 className="font-headline-md text-xl font-bold text-slate-900">
              Atelier Home
            </h2>
            <p className="font-body-md text-xs text-slate-500">
              The modern companion for settling in and styling your life. Designed for those who value peace, function, and aesthetic integrity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-xs">
            <div className="space-y-2">
              <h5 className="font-label-md text-xs text-indigo-600 uppercase font-bold tracking-wider">
                Resources
              </h5>
              <ul className="space-y-1.5 text-slate-600 font-medium">
                <li><a href="#" className="hover:text-slate-900">Style Guide</a></li>
                <li><a href="#" className="hover:text-slate-900">Vendor Directory</a></li>
                <li><a href="#" className="hover:text-slate-900">Measurement Tips</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-label-md text-xs text-indigo-600 uppercase font-bold tracking-wider">
                Support
              </h5>
              <ul className="space-y-1.5 text-slate-600 font-medium">
                <li><a href="#" className="hover:text-slate-900">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms of Use</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 mt-6 border-t border-slate-100 text-center md:text-left text-xs text-slate-400">
          © 2026 Atelier Home Design Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
