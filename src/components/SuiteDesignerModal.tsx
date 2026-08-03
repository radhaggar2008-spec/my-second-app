import { useState, MouseEvent } from 'react';

interface SuiteDesignerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlacedItem {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export function SuiteDesignerModal({ isOpen, onClose }: SuiteDesignerModalProps) {
  if (!isOpen) return null;

  const [selectedRoom, setSelectedRoom] = useState<'kids' | 'master' | 'guest'>('master');
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([
    { id: '1', name: 'King Bed & Frame', x: 120, y: 80, width: 140, height: 160, color: '#465343' },
    { id: '2', name: 'Left Nightstand', x: 60, y: 80, width: 45, height: 45, color: '#8e4d33' },
    { id: '3', name: 'Right Nightstand', x: 275, y: 80, width: 45, height: 45, color: '#8e4d33' },
    { id: '4', name: 'Closet Organizer System', x: 60, y: 300, width: 260, height: 50, color: '#504f4c' },
    { id: '5', name: 'Reading Armchair', x: 340, y: 200, width: 70, height: 70, color: '#feaa8a' },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const availableCatalog = [
    { name: 'Ottoman Bench', width: 120, height: 45, color: '#c9c6c2' },
    { name: 'Executive Desk', width: 110, height: 55, color: '#5e6b5a' },
    { name: 'Floor Lamp', width: 35, height: 35, color: '#feaa8a' },
    { name: 'Area Rug (8x10)', width: 220, height: 180, color: '#e5e2dd' },
  ];

  const handleMouseDown = (e: MouseEvent, item: PlacedItem) => {
    setDraggingId(item.id);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingId) return;
    const canvas = e.currentTarget.getBoundingClientRect();
    const newX = Math.max(10, Math.min(canvas.width - 60, e.clientX - canvas.left - dragOffset.x));
    const newY = Math.max(10, Math.min(canvas.height - 60, e.clientY - canvas.top - dragOffset.y));

    setPlacedItems((prev) =>
      prev.map((item) =>
        item.id === draggingId ? { ...item, x: newX, y: newY } : item
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const addItemToCanvas = (catItem: typeof availableCatalog[0]) => {
    const newItem: PlacedItem = {
      id: Date.now().toString(),
      name: catItem.name,
      x: 180,
      y: 180,
      width: catItem.width,
      height: catItem.height,
      color: catItem.color,
    };
    setPlacedItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setPlacedItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#fbf9f8] rounded-2xl max-w-5xl w-full border border-[#c4c8bf]/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#465343] text-white p-4 md:p-6 flex justify-between items-center shrink-0">
          <div>
            <span className="text-[10px] uppercase font-label-sm tracking-widest text-[#ddebd6]">
              INTERACTIVE 2D CANVAS
            </span>
            <h3 className="font-headline-md text-xl md:text-2xl font-semibold text-white">
              Suite Floorplan Designer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-y-auto">
          {/* Controls Sidebar */}
          <div className="w-full md:w-72 space-y-4 shrink-0">
            <div>
              <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-1">
                Select Suite Zone
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#efeded] p-1 rounded-lg border border-[#c4c8bf]/30">
                <button
                  onClick={() => setSelectedRoom('master')}
                  className={`py-1.5 text-xs font-label-md rounded cursor-pointer ${
                    selectedRoom === 'master'
                      ? 'bg-[#465343] text-white font-semibold'
                      : 'text-[#444842] hover:bg-white/50'
                  }`}
                >
                  Master
                </button>
                <button
                  onClick={() => setSelectedRoom('kids')}
                  className={`py-1.5 text-xs font-label-md rounded cursor-pointer ${
                    selectedRoom === 'kids'
                      ? 'bg-[#465343] text-white font-semibold'
                      : 'text-[#444842] hover:bg-white/50'
                  }`}
                >
                  Kids
                </button>
                <button
                  onClick={() => setSelectedRoom('guest')}
                  className={`py-1.5 text-xs font-label-md rounded cursor-pointer ${
                    selectedRoom === 'guest'
                      ? 'bg-[#465343] text-white font-semibold'
                      : 'text-[#444842] hover:bg-white/50'
                  }`}
                >
                  Guest
                </button>
              </div>
            </div>

            <div>
              <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-2 font-semibold">
                Add Elements to Canvas
              </label>
              <div className="space-y-2">
                {availableCatalog.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => addItemToCanvas(cat)}
                    className="p-2.5 bg-white rounded-lg border border-[#c4c8bf]/40 flex justify-between items-center hover:border-[#465343] cursor-pointer shadow-2xs transition-all"
                  >
                    <div>
                      <p className="font-label-md text-xs font-semibold text-[#1b1c1c]">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-[#504f4c]">
                        {Math.round(cat.width / 10)}" x {Math.round(cat.height / 10)}"
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[#465343] text-lg">
                      add_circle
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#f5f3f3] rounded-lg border border-[#c4c8bf]/30 text-xs text-[#504f4c] space-y-1">
              <p className="font-semibold text-[#465343] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">touch_app</span> How to use:
              </p>
              <p>Drag furniture boxes around the floorplan canvas to experiment with clearance and light flow.</p>
            </div>
          </div>

          {/* Interactive Canvas */}
          <div className="flex-grow flex flex-col space-y-2">
            <div className="flex justify-between items-center text-xs text-[#504f4c]">
              <span className="font-semibold text-[#465343]">
                Room Grid (20' x 16' scale)
              </span>
              <span>{placedItems.length} Elements On Grid</span>
            </div>

            <div
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="w-full h-[380px] bg-white rounded-xl border-2 border-dashed border-[#c4c8bf] relative overflow-hidden select-none shadow-inner"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #c4c8bf 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              {placedItems.map((item) => (
                <div
                  key={item.id}
                  onMouseDown={(e) => handleMouseDown(e, item)}
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    backgroundColor: item.color,
                  }}
                  className={`absolute rounded-lg shadow-md cursor-grab active:cursor-grabbing text-white p-2 flex flex-col justify-between transition-shadow ${
                    draggingId === item.id ? 'ring-2 ring-amber-500 shadow-xl z-30' : 'z-10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold truncate leading-tight">
                      {item.name}
                    </span>
                    <button
                      onClick={(e) => removeItem(item.id, e)}
                      className="text-white/80 hover:text-white hover:bg-black/20 rounded-full p-0.5 ml-1"
                      title="Remove from layout"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                  <span className="text-[9px] opacity-80 uppercase tracking-tighter">
                    {Math.round(item.width / 10)}" x {Math.round(item.height / 10)}"
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#efeded] p-4 md:p-6 border-t border-[#c4c8bf]/30 flex justify-between items-center shrink-0">
          <button
            onClick={() => setPlacedItems([])}
            className="text-xs font-label-md text-[#ba1a1a] hover:underline cursor-pointer"
          >
            Clear Canvas
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-xs font-label-md border border-[#747871] text-[#1b1c1c] hover:bg-[#e4e2e2] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Floorplan design saved to your profile!');
                onClose();
              }}
              className="px-5 py-2 rounded-lg text-xs font-label-md bg-[#465343] text-white hover:bg-[#3e4a3b] cursor-pointer shadow-xs"
            >
              Save Floorplan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
