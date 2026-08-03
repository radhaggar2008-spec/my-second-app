import { EssentialItem, RoomCardData, SelectedElement, MaintenanceTask, MaterialColor } from '../types';

export const INITIAL_DAY1_ESSENTIALS: EssentialItem[] = [
  {
    id: 'e1',
    title: 'Electricity & Gas',
    subtitle: 'Connected & Verified',
    completed: true,
    icon: 'receipt_long'
  },
  {
    id: 'e2',
    title: 'Water Supply',
    subtitle: 'Active',
    completed: true,
    icon: 'water_drop'
  },
  {
    id: 'e3',
    title: 'Internet / Wi-Fi',
    subtitle: 'Technician scheduled for 2 PM',
    completed: false,
    icon: 'wifi'
  },
  {
    id: 'e4',
    title: 'Lock Change',
    subtitle: 'Smart lock installation pending',
    completed: false,
    icon: 'key'
  }
];

export const INITIAL_SAFETY_CHECKS = [
  { id: 's1', label: 'Outlet Covers Installed', checked: true },
  { id: 's2', label: 'Furniture Anchoring Kits', checked: false },
  { id: 's3', label: 'Blind Cord Safety', checked: false },
  { id: 's4', label: 'Corner Protectors', checked: true }
];

export const INITIAL_ROOM_CARDS: RoomCardData[] = [
  {
    id: 'r1',
    name: 'Playful Haven',
    tag: 'Kids Room',
    progress: 80,
    description: 'Furniture assembly complete. Storage boxes organized.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0zY3oScmBGRTkg8Lt8h7EE1NIZFNVbuVql92wRdEcl_LtsQbcKLP5-SkPYRFA6x3nIOquBU5UisJchZjZJMDQmN4PyMyqiyf60CBNSffggUWIuEY9ViJoRC8CoH8NR-amZGXio7jMo6cJRP1D2DLyUQ5yB6iYTO9kHEreWsVQ-zPR8dS1N0D7CLdVzKn9Q3yh-o5TvcMcJCZgMSOoyBQGmwE_iej1G5yDIBLHORbqeJoBg4V6a-Yv4w',
    tabKey: 'kids-room'
  },
  {
    id: 'r2',
    name: "Grandparents' Retreat",
    tag: 'Guest Suite',
    progress: 30,
    description: 'Bedframe delivered. Layout for accessibility finalized.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuumg7Vtqbl1wJgTtKmaorw4FFaPp98pazS5qPF3xGypg-K46CVHvxq-mZ2-TamWUHdfVSHiQtrmc9I-9Fk4P7ajzkueBj33bugOlg0FB-knu1_eOawXx6S99j8cEqQ7h4JtqeEE5Xvs-YYV3Szia8BlYYSf4RFYPGJoU_PmXf9SKcZUsEh0hR3dJi-5M8qdm4CUDCEINrzVD2U551FWtUlWFgJvpUf3DMIu0Y1ruXTEfCdIa2i8Qmbw',
    tabKey: 'master-suite'
  },
  {
    id: 'r3',
    name: 'Primary Sanctuary',
    tag: 'Master Suite',
    progress: 50,
    description: 'Closet system installation in progress. Curtains selected and ordered.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFl_qnZVH2dEyu5URe1nQ4n613pz6NJDSVEySlp8VSIrR9hxMoLO43GBX1eJGbjGLOlS8cRgchVRFRV8A2lp1x5fNDUuI6aSaU9Uq_kVdYtQhWXsyl9Le7aKXmXormO7GOgWkKaIPSKBMZyH6asY_UDbneQx_iukLDZYDbNyfmPQbNUG0Yw7g4NKns1yF3gyY-QuqD-HirUXv2FtElS9mG81n_DslnhbBVjIpFXGBR5PYAgCgSSI_SbQ',
    tabKey: 'master-suite'
  }
];

export const INITIAL_SELECTED_ELEMENTS: SelectedElement[] = [
  {
    id: 'el1',
    name: 'Nordic Oak Storage',
    subtitle: 'Anti-tip hardware included',
    price: 340,
    category: 'Furniture',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAKO9h4mMl98GB5W9oQ8gkLI6u148vhlFriUReeyPkZXSiuSZNEGI_jxqRCMaRiAEe7jZefeVM4J82zOyBoLHwD987SiSi6ZOJgOiF0lyNZ2Ou05IVLuIjwZFkStYIYbmKnBARWh4-KP0AaJzNVm8Gk2v3gR3YL8avR50X_CntlMLeGz1rFrXFVbwz90ro54pC7aT7R0991hmothT_HhMu0-WXA3QZgtHyIA-Cl4ucnfdYWlJO8zMyBQ',
    inProject: true
  },
  {
    id: 'el2',
    name: 'Checkered Cloud Rug',
    subtitle: 'Non-toxic, Washable',
    price: 185,
    category: 'Textiles',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxIaxfkdHZWPGnaECHISgFl1X7quQSn3IegJ3zpQO5MngXDD6OLWjnoZ_O4hYKKOlnEvYMtLCEGqcnq_aF9NzwAf8E5_9mvm2Bg6mxQEdaqUsBwIjb5iPUgu0a8SCekykemS_ZWvsesDXsHI_kKp8nHhxl_oWeRPL5omlPdDtkmgnRvUZUTCS94pjVzigSO4glnN-oAuNl_UVynEp119NUNBCc-M7obcN5bHAL5D4DUsd1N-SRP3YTQQ',
    inProject: true
  },
  {
    id: 'el3',
    name: 'Stable Glow Lamp',
    subtitle: 'Tip-proof weighted base',
    price: 120,
    category: 'Lighting',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCteKdBMcu9SkmiJttZZVVyA0jrQlTawgpcVz6YFgbsKaPNdRZv9a2_oijl_-T2ix3wCV3z7zIBUFyb4iIFg8hhe3dJaXRp9m4TqPcuS8H_0dweYm2cs-Pr7kbNqk3X0_wO40CMlttRg6kRle24cK4Q4oxRxU09dPq2JLZS3ZyygGRc3M8YpEd3Jmj6nQIxdKKvpmDU6IT1GWwdz4R3VzDzXuDXwYeLPBfu6VslPCK87ChiF7baHmugCg',
    inProject: false
  },
  {
    id: 'el4',
    name: 'High-Support Armchair',
    subtitle: 'Extra-firm cushions & high-set arms',
    price: 1250,
    category: 'Seating',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfttFDmWkpBjcLCHCLxRnIR-fPrfrSwU4NnYsqb2e2jXRGQMMcQ1G3iWNS99DVHKa7h5DbGTTLIqP-GvopaOP2hwaUXt5Le0xFXCM3us2IrbaJZz4IpXVjCe3LUZNlJIe7j5TJc9MROUy5b1Y9g6vmuIZzLgmxmkqNByecV0be1osvxdFdnyBbB6haeJ9S7KNb9dXTUNMeSTm2qgAznNyrxDhXTYmHfWZ1ho7xswgdtwJRGMTptBTliw',
    inProject: true
  }
];

export const MATERIAL_PALETTE: MaterialColor[] = [
  {
    id: 'm1',
    name: 'Clay Terracotta',
    hex: '#ffdbce',
    bgClass: 'bg-[#ffdbce]',
    description: 'Warm earth tone that induces a cozy, grounded sensory atmosphere.'
  },
  {
    id: 'm2',
    name: 'Sage Leaf',
    hex: '#d9e7d2',
    bgClass: 'bg-[#d9e7d2]',
    description: 'Restorative organic green supporting relaxed focus and lower heart rates.'
  },
  {
    id: 'm3',
    name: 'Warm Birch',
    hex: '#e4e2e2',
    bgClass: 'bg-[#e4e2e2]',
    description: 'Natural light timber tone providing non-reflective visual comfort.'
  },
  {
    id: 'm4',
    name: 'Cotton Linen',
    hex: '#e5e2dd',
    bgClass: 'bg-[#e5e2dd]',
    description: 'Breathable, hypoallergenic texture with tactile softness.'
  }
];

export const MAINTENANCE_LOG: MaintenanceTask[] = [
  {
    id: 'm1',
    system: 'Gutters & Downspouts',
    spring: 'Clear debris',
    summer: '—',
    fall: 'Full clean',
    winter: '—'
  },
  {
    id: 'm2',
    system: 'Lawn & Garden',
    spring: 'Aerate / Fertilize',
    summer: 'Pruning',
    fall: 'Soil Prep',
    winter: 'Mulching'
  },
  {
    id: 'm3',
    system: 'HVAC Compressor',
    spring: 'Inspection',
    summer: '—',
    fall: '—',
    winter: 'Winterize'
  },
  {
    id: 'm4',
    system: 'Exterior Siding',
    spring: 'Soft Wash',
    summer: '—',
    fall: 'Seal gaps',
    winter: '—'
  }
];
