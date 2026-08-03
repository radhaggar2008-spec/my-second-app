export type ActiveTab = 'dashboard' | 'kids-room' | 'master-suite' | 'exterior' | 'profile';

export interface EssentialItem {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  icon?: string;
}

export interface RoomCardData {
  id: string;
  name: string;
  tag: string;
  progress: number;
  description: string;
  imageUrl: string;
  tabKey: ActiveTab;
}

export interface SelectedElement {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  imageUrl: string;
  category: string;
  inProject?: boolean;
}

export interface MaintenanceTask {
  id: string;
  system: string;
  spring?: string;
  summer?: string;
  fall?: string;
  winter?: string;
}

export interface MaterialColor {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
  description: string;
}
