import { useState } from 'react';
import { MaintenanceTask } from '../types';

interface ExteriorViewProps {
  maintenanceLog: MaintenanceTask[];
  onOpenAddReminder: () => void;
}

export function ExteriorView({ maintenanceLog, onOpenAddReminder }: ExteriorViewProps) {
  const [hvacFilterChecked, setHvacFilterChecked] = useState(true);
  const [debrisCleared, setDebrisCleared] = useState(true);
  const [activeSeason, setActiveSeason] = useState<'all' | 'spring' | 'summer' | 'fall' | 'winter'>('all');

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-8 space-y-12 pb-32 md:pb-16">
      {/* Hero Section: Exterior Overview */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div className="md:col-span-7 space-y-3">
          <span className="font-label-sm text-xs uppercase tracking-widest text-indigo-600 font-semibold block">
            OUTDOOR FOUNDATIONS
          </span>
          <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Curb Appeal & Structural Integrity
          </h2>
          <p className="font-body-lg text-xs md:text-sm text-slate-600 max-w-2xl">
            Your home's exterior is its first impression and its primary defense. Mastering the balance between aesthetic charm and mechanical maintenance ensures long-term comfort and value.
          </p>
        </div>
        <div className="md:col-span-5 h-64 md:h-72 relative rounded-xl overflow-hidden shadow-xs group border border-slate-200">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGm0dLflchPiFmbJlExuJKAaFQwy8fGs16nnVP8QTI93nCz8EUPUh5hCdx4ChDB_XYsFYOx9tqbYjniXiZHWE_t-CzNhiYclSnf49ZuLblxxZISMjlgh8W1pFDezin05q-oRDFADb1NY_EyI-c_eL85HQWf4N_4GggB5Zy7ew-KWqJ8fCcPfS-0Onu7P-WXpI_sNp2kN6dmDeyiddTMeD7BlH69aFh-WIyuGub50UlNlr0OOkO5PzUOQ')`,
            }}
          />
        </div>
      </section>

      {/* Utility Bento Grid */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-headline-lg text-xl md:text-2xl font-bold text-slate-900">
            Utility Infrastructure
          </h3>
          <span className="font-label-md text-xs text-indigo-600 uppercase tracking-wider font-bold">
            Critical Maintenance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HVAC Card */}
          <div className="sleek-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                <span className="material-symbols-outlined text-2xl">
                  cloud_download
                </span>
              </div>
              <h4 className="font-headline-md text-lg font-bold text-slate-900 mb-1">
                Climate Systems
              </h4>
              <p className="text-slate-500 text-xs mb-4">
                Ensure seasonal efficiency with quarterly filter swaps and compressor clearance.
              </p>
            </div>

            <ul className="space-y-2.5 border-t border-slate-100 pt-4">
              <li
                onClick={() => setHvacFilterChecked(!hvacFilterChecked)}
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900"
              >
                <span className={`material-symbols-outlined text-base ${hvacFilterChecked ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {hvacFilterChecked ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                Replace filters every 90 days
              </li>
              <li
                onClick={() => setDebrisCleared(!debrisCleared)}
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900"
              >
                <span className={`material-symbols-outlined text-base ${debrisCleared ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {debrisCleared ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                Clear debris around external unit
              </li>
            </ul>
          </div>

          {/* Plumbing Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between border border-slate-800">
            <div>
              <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center mb-4 text-indigo-400">
                <span className="material-symbols-outlined text-2xl">
                  water_damage
                </span>
              </div>
              <h4 className="font-headline-md text-lg font-bold text-white mb-1">
                Water & Waste
              </h4>
              <p className="text-slate-400 text-xs">
                Identify main shut-off valves and inspect external hose bibs before winter freeze.
              </p>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-xs font-medium text-slate-300">Next Main Inspection</span>
                <span className="text-[10px] font-bold bg-indigo-600 px-2.5 py-1 rounded-md text-white tracking-wider uppercase">
                  OCT 15
                </span>
              </div>
            </div>
          </div>

          {/* Electrical Panel */}
          <div className="sleek-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                <span className="material-symbols-outlined text-2xl">
                  electric_bolt
                </span>
              </div>
              <h4 className="font-headline-md text-lg font-bold text-slate-900 mb-1">
                Electrical Mains
              </h4>
              <p className="text-slate-500 text-xs mb-4">
                A clearly labeled panel is the first step in home safety and troubleshooting.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-xs text-indigo-600">info</span>
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                  Mapping Guide
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Use a marker to label zones: Kitchen Appliances, Outdoor Lighting, Garage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Landscaping 101: Interactive Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl p-6 md:p-8 items-center border border-slate-200 shadow-xs">
        <div className="space-y-4 relative z-10">
          <span className="font-label-sm text-xs uppercase tracking-wider text-indigo-600 font-bold">
            GARDEN INTELLIGENCE
          </span>
          <h3 className="font-headline-lg text-2xl md:text-3xl font-bold text-slate-900">
            Landscaping 101: Soil-First Approach
          </h3>
          <p className="text-xs md:text-sm text-slate-600">
            Sustainable curb appeal starts 6 inches below the surface. Before planting, understand your hardiness zone and soil pH to ensure growth without excessive chemicals.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-700 shrink-0">
                <span className="material-symbols-outlined text-lg">compost</span>
              </div>
              <div>
                <p className="font-label-md text-xs font-bold text-slate-900">
                  Soil Preparation
                </p>
                <p className="text-xs text-slate-500">
                  Amend local clay with organic compost to improve drainage and root penetration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700 shrink-0">
                <span className="material-symbols-outlined text-lg">filter_vintage</span>
              </div>
              <div>
                <p className="font-label-md text-xs font-bold text-slate-900">
                  Strategic Selection
                </p>
                <p className="text-xs text-slate-500">
                  Choose native perennials for low-maintenance seasonal interest and drought resistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[280px] lg:h-[360px] rounded-xl overflow-hidden group border border-slate-200">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIpH0pbRfZ2tnxOzHgm13lB6q0PjNQGgGoR4zRyqtaUkK7_uAwfon1vSfiA-XyTzvmGoU9sLDWS5mhZ6G8Cy9w3Wy9SSQcs8iNOuctvcrvLW0EzBY3aifOoqAaQg-sPc44ANqx9KEzcR74TbRIiU4rm3DQG4k-eLbXr4c2x3F9hsXSlu_QueEvJmln-ISZ7y2rfnR3AX52PpJBwzj7dRs6KSqy1Jxn7h3M6yYX5U3QGJV1ivY_fMa0oQ"
            alt="Soil preparation flatlay"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-indigo-600 tracking-widest uppercase">
                PRO TIP
              </span>
              <span className="material-symbols-outlined text-indigo-600 text-sm">stars</span>
            </div>
            <p className="text-xs text-slate-700 italic font-medium">
              "Planting in 'drifts' of three or five creates a more natural, editorial look for your front flowerbeds."
            </p>
          </div>
        </div>
      </section>

      {/* Outdoor Living Environments */}
      <section className="space-y-6">
        <h3 className="font-headline-lg text-2xl md:text-3xl font-bold text-slate-900 text-center">
          Outdoor Living Environments
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="sleek-card overflow-hidden flex flex-col h-full group">
            <div className="h-40 overflow-hidden border-b border-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPOZ6Oo-yIcbPpa9nyjZs7hGgOGTBPfK3gFXZMZjEdwmrP2Sn0rW9hK8LCVkY7AfhmIsU1nizDdjXo5PvAs5YzfuVLcCV2XHlRKkv6C89IrTptTqyrQNsDtKHpft2k145SqdrthQEFjOjs8ldx-Idrt7IiHNXNreKPNUZwAtWrhjrskoj2MwDyaXAXX9vvRUSl0lBrct9uSeNvpYjg_A-QOZJ4BYLlhUHYwG7ps8_XJ_htxTReUeOy4A"
                alt="Hardscape"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h5 className="font-headline-md text-sm font-bold text-slate-900 mb-1">
                  Hardscape Integrity
                </h5>
                <p className="text-xs text-slate-500">
                  Seal concrete and pavers every two years to prevent salt damage and cracking.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sleek-card overflow-hidden flex flex-col h-full group">
            <div className="h-40 overflow-hidden border-b border-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTTKw2TK2KblTsv043W9UqNGA1uAg4z8mTSNLEy_LdBO8n-jNk6nvicPk9gWfJ1diaIVV0SycpbmswTlexT6nCbdG1iTJdpnzD11kyurD2-vRVgEQR9VgfGyhtQQm7KbB-795g87R9JfJF2iqSP1WJvb3jd9iEpArVkRf8mdHpGGGoHXk5uF0Gdqb655HllmkYn8QL5gCIMzIK_r6OWqyEefeXeKMdCTT8TKr7pdlIBdCH1fB4ukMWdA"
                alt="Deck Care"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h5 className="font-headline-md text-sm font-bold text-slate-900 mb-1">
                  Deck Preservation
                </h5>
                <p className="text-xs text-slate-500">
                  Check for loose fasteners and apply UV-protective stain to maintain wood elasticity.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="sleek-card overflow-hidden flex flex-col h-full group">
            <div className="h-40 overflow-hidden border-b border-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxJm4yEzUUnKF-u13gd3ULNjjQh2cY0lGwGOrTmuCmGh_rdlo1SLXoDaSUgvLGouA3_HYegnRV4x0ZKLKzCWxoCd7-TTXLcmDq3P2Tlm09jB0FTJFeRe9lwsCmqnWXxaTIYJxqJIBbroVCiI90TRmRT2hvByAnivDDPubnyDelRL6SmYqOUKFSJdxlDLfp9rIPsNGsTlb-HCpdnAJxtYJFenoApoV1fJRHY5vwF0-NXwoILyQvjrFtKA"
                alt="Outdoor Lighting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h5 className="font-headline-md text-sm font-bold text-slate-900 mb-1">
                  Ambient Systems
                </h5>
                <p className="text-xs text-slate-500">
                  Low-voltage LED systems provide safety without disrupting the nocturnal ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="sleek-card overflow-hidden flex flex-col h-full group">
            <div className="h-40 overflow-hidden border-b border-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOUPm4PzyDfOYgfiM9_NJTuCvQBP99yQ1_RXvClrNQHwsH7KiM21PbXsGFgAP5DpQklg3JtZdfgAHlhf7KV40L4mVME3olaKKqfpTZyMqFKhAS8xU-1rlpQZmtaNWwSSIb0Ih5HBgrF8U5rwNUzY3a8FDhoW2h4Tf6jJQRIA3Gnpy619Bx2EpAwmV8xRKm8TAAGWzz3LraJUdERzq3A3dBXt4mXVbJD9P7XOVO0xaw1Z-1gvTOiI7Fnw"
                alt="Drainage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h5 className="font-headline-md text-sm font-bold text-slate-900 mb-1">
                  Grading & Runoff
                </h5>
                <p className="text-xs text-slate-500">
                  Ensure soil slopes away from the foundation at a minimum 2-inch drop per 10 feet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Schedule Table */}
      <section className="sleek-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-2xl">
                calendar_today
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-xl font-bold text-slate-900">
                Seasonal Maintenance Log
              </h3>
              <p className="text-xs text-slate-500">
                Recommended intervals for exterior health.
              </p>
            </div>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
            {(['all', 'spring', 'summer', 'fall', 'winter'] as const).map((season) => (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize cursor-pointer transition-all ${
                  activeSeason === season
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-3 font-label-sm text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  System / Task
                </th>
                {(activeSeason === 'all' || activeSeason === 'spring') && (
                  <th className="py-3 px-3 font-label-sm text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Spring
                  </th>
                )}
                {(activeSeason === 'all' || activeSeason === 'summer') && (
                  <th className="py-3 px-3 font-label-sm text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Summer
                  </th>
                )}
                {(activeSeason === 'all' || activeSeason === 'fall') && (
                  <th className="py-3 px-3 font-label-sm text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Fall
                  </th>
                )}
                {(activeSeason === 'all' || activeSeason === 'winter') && (
                  <th className="py-3 px-3 font-label-sm text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Winter
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700">
              {maintenanceLog.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3 px-3 font-bold text-slate-900">{task.system}</td>
                  {(activeSeason === 'all' || activeSeason === 'spring') && (
                    <td className="py-3 px-3 text-slate-600">
                      {task.spring && task.spring !== '—' ? (
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-indigo-600 text-sm">circle</span>
                          {task.spring}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                  )}
                  {(activeSeason === 'all' || activeSeason === 'summer') && (
                    <td className="py-3 px-3 text-slate-600">
                      {task.summer && task.summer !== '—' ? (
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-indigo-600 text-sm">circle</span>
                          {task.summer}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                  )}
                  {(activeSeason === 'all' || activeSeason === 'fall') && (
                    <td className="py-3 px-3 text-slate-600">
                      {task.fall && task.fall !== '—' ? (
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-indigo-600 text-sm">circle</span>
                          {task.fall}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                  )}
                  {(activeSeason === 'all' || activeSeason === 'winter') && (
                    <td className="py-3 px-3 text-slate-600">
                      {task.winter && task.winter !== '—' ? (
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-indigo-600 text-sm">circle</span>
                          {task.winter}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        onClick={onOpenAddReminder}
        className="fixed bottom-24 md:bottom-12 right-6 md:right-12 w-12 h-12 bg-slate-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all z-40 group cursor-pointer border border-slate-700"
        title="Add Maintenance Entry"
      >
        <span className="material-symbols-outlined text-2xl">add_task</span>
        <span className="absolute right-14 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md border border-slate-700 font-semibold">
          Add Maintenance Entry
        </span>
      </button>
    </div>
  );
}
