import { useState, FormEvent } from 'react';

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReminder: (title: string, subtitle: string, icon?: string) => void;
}

export function AddReminderModal({
  isOpen,
  onClose,
  onAddReminder,
}: AddReminderModalProps) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [icon, setIcon] = useState('task_alt');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddReminder(title.trim(), subtitle.trim() || 'Pending task', icon);
    setTitle('');
    setSubtitle('');
    onClose();
  };

  const iconOptions = [
    { value: 'task_alt', label: 'Checkmark' },
    { value: 'wifi', label: 'Wi-Fi / Internet' },
    { value: 'key', label: 'Lock / Security' },
    { value: 'water_drop', label: 'Plumbing' },
    { value: 'receipt_long', label: 'Utilities' },
    { value: 'local_shipping', label: 'Delivery' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#c4c8bf]/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#465343] text-white p-5 flex justify-between items-center">
          <h3 className="font-headline-md text-xl text-white font-semibold">
            Add New Task / Reminder
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-1 font-semibold">
              Task Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule HVAC Filter Change"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f5f3f3] border border-[#c4c8bf]/50 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#465343]"
            />
          </div>

          <div>
            <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-1 font-semibold">
              Subtitle / Details
            </label>
            <input
              type="text"
              placeholder="e.g. Technician arriving between 10am-12pm"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#f5f3f3] border border-[#c4c8bf]/50 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#465343]"
            />
          </div>

          <div>
            <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-1 font-semibold">
              Icon Symbol
            </label>
            <div className="grid grid-cols-3 gap-2">
              {iconOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setIcon(opt.value)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer ${
                    icon === opt.value
                      ? 'border-[#465343] bg-[#d9e7d2] text-[#131e11] font-semibold'
                      : 'border-[#c4c8bf]/40 bg-[#f5f3f3] text-[#444842]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{opt.value}</span>
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3 justify-end border-t border-[#c4c8bf]/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-label-md border border-[#747871] text-[#1b1c1c] hover:bg-[#efeded] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-label-md bg-[#465343] text-white hover:bg-[#3e4a3b] cursor-pointer shadow-xs"
            >
              Save Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
