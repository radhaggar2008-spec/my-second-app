import { useState, FormEvent } from 'react';
import { SelectedElement } from '../types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: SelectedElement) => void;
}

export function AddItemModal({ isOpen, onClose, onAddItem }: AddItemModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('250');
  const [category, setCategory] = useState('Furniture');
  const [imageUrl, setImageUrl] = useState('');

  const sampleImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCAKO9h4mMl98GB5W9oQ8gkLI6u148vhlFriUReeyPkZXSiuSZNEGI_jxqRCMaRiAEe7jZefeVM4J82zOyBoLHwD987SiSi6ZOJgOiF0lyNZ2Ou05IVLuIjwZFkStYIYbmKnBARWh4-KP0AaJzNVm8Gk2v3gR3YL8avR50X_CntlMLeGz1rFrXFVbwz90ro54pC7aT7R0991hmothT_HhMu0-WXA3QZgtHyIA-Cl4ucnfdYWlJO8zMyBQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDxIaxfkdHZWPGnaECHISgFl1X7quQSn3IegJ3zpQO5MngXDD6OLWjnoZ_O4hYKKOlnEvYMtLCEGqcnq_aF9NzwAf8E5_9mvm2Bg6mxQEdaqUsBwIjb5iPUgu0a8SCekykemS_ZWvsesDXsHI_kKp8nHhxl_oWeRPL5omlPdDtkmgnRvUZUTCS94pjVzigSO4glnN-oAuNl_UVynEp119NUNBCc-M7obcN5bHAL5D4DUsd1N-SRP3YTQQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCteKdBMcu9SkmiJttZZVVyA0jrQlTawgpcVz6YFgbsKaPNdRZv9a2_oijl_-T2ix3wCV3z7zIBUFyb4iIFg8hhe3dJaXRp9m4TqPcuS8H_0dweYm2cs-Pr7kbNqk3X0_wO40CMlttRg6kRle24cK4Q4oxRxU09dPq2JLZS3ZyygGRc3M8YpEd3Jmj6nQIxdKKvpmDU6IT1GWwdz4R3VzDzXuDXwYeLPBfu6VslPCK87ChiF7baHmugCg',
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: SelectedElement = {
      id: 'custom_' + Date.now(),
      name: name.trim(),
      subtitle: subtitle.trim() || 'Custom selected item',
      price: Number(price) || 0,
      category,
      imageUrl: imageUrl.trim() || sampleImages[0],
      inProject: true,
    };

    onAddItem(newItem);
    setName('');
    setSubtitle('');
    setPrice('250');
    setImageUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#c4c8bf]/40 shadow-2xl overflow-hidden">
        <div className="bg-[#465343] text-white p-5 flex justify-between items-center">
          <h3 className="font-headline-md text-xl text-white font-semibold">
            Add Custom Element
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
              Item Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ergonomic Desk Chair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f5f3f3] border border-[#c4c8bf]/50 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#465343]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-1 font-semibold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#f5f3f3] border border-[#c4c8bf]/50 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#465343] cursor-pointer"
              >
                <option value="Furniture">Furniture</option>
                <option value="Textiles">Textiles</option>
                <option value="Lighting">Lighting</option>
                <option value="Seating">Seating</option>
                <option value="Decor">Decor</option>
              </select>
            </div>

            <div>
              <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-1 font-semibold">
                Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#f5f3f3] border border-[#c4c8bf]/50 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#465343]"
              />
            </div>
          </div>

          <div>
            <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-1 font-semibold">
              Subtitle / Specification
            </label>
            <input
              type="text"
              placeholder="e.g. Non-toxic, solid brass base"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#f5f3f3] border border-[#c4c8bf]/50 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#465343]"
            />
          </div>

          <div>
            <label className="font-label-sm text-xs text-[#504f4c] uppercase tracking-wider block mb-1 font-semibold">
              Image Selection
            </label>
            <div className="flex gap-2 mb-2">
              {sampleImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setImageUrl(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    imageUrl === img ? 'border-[#465343] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <input
              type="url"
              placeholder="Or paste image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#f5f3f3] border border-[#c4c8bf]/50 rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#465343]"
            />
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
              Add Element
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
