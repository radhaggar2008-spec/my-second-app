import { useState, useEffect } from 'react';
import { ActiveTab, EssentialItem, RoomCardData, SelectedElement, MaintenanceTask, MaterialColor } from './types';
import {
  INITIAL_DAY1_ESSENTIALS,
  INITIAL_ROOM_CARDS,
  INITIAL_SELECTED_ELEMENTS,
  MATERIAL_PALETTE,
  MAINTENANCE_LOG,
} from './data/mockData';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { KidsRoomView } from './components/KidsRoomView';
import { MasterSuiteView } from './components/MasterSuiteView';
import { ExteriorView } from './components/ExteriorView';
import { ProfileView } from './components/ProfileView';

import { SuiteDesignerModal } from './components/SuiteDesignerModal';
import { AddReminderModal } from './components/AddReminderModal';
import { AddItemModal } from './components/AddItemModal';
import { SearchSettingsModal } from './components/SearchSettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Load / Persist Essentials
  const [day1Essentials, setDay1Essentials] = useState<EssentialItem[]>(() => {
    const saved = localStorage.getItem('atelier_day1_essentials');
    return saved ? JSON.parse(saved) : INITIAL_DAY1_ESSENTIALS;
  });

  useEffect(() => {
    localStorage.setItem('atelier_day1_essentials', JSON.stringify(day1Essentials));
  }, [day1Essentials]);

  // Load / Persist Selected Elements
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>(() => {
    const saved = localStorage.getItem('atelier_selected_elements');
    return saved ? JSON.parse(saved) : INITIAL_SELECTED_ELEMENTS;
  });

  useEffect(() => {
    localStorage.setItem('atelier_selected_elements', JSON.stringify(selectedElements));
  }, [selectedElements]);

  // Room Cards
  const [roomCards] = useState<RoomCardData[]>(INITIAL_ROOM_CARDS);
  const [materialPalette] = useState<MaterialColor[]>(MATERIAL_PALETTE);
  const [maintenanceLog] = useState<MaintenanceTask[]>(MAINTENANCE_LOG);

  // Modals
  const [isSuiteDesignerOpen, setIsSuiteDesignerOpen] = useState(false);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [searchSettingsMode, setSearchSettingsMode] = useState<'search' | 'settings' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handlers
  const handleToggleEssential = (id: string) => {
    setDay1Essentials((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddReminder = (title: string, subtitle: string, icon?: string) => {
    const newItem: EssentialItem = {
      id: 'rem_' + Date.now(),
      title,
      subtitle,
      completed: false,
      icon: icon || 'task_alt',
    };
    setDay1Essentials((prev) => [newItem, ...prev]);
  };

  const handleToggleElementInProject = (id: string) => {
    setSelectedElements((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inProject: !item.inProject } : item
      )
    );
  };

  const handleAddElement = (newItem: SelectedElement) => {
    setSelectedElements((prev) => [newItem, ...prev]);
  };

  const handleResetData = () => {
    if (confirm('Reset all saved checklist items and furniture to initial defaults?')) {
      localStorage.removeItem('atelier_day1_essentials');
      localStorage.removeItem('atelier_selected_elements');
      setDay1Essentials(INITIAL_DAY1_ESSENTIALS);
      setSelectedElements(INITIAL_SELECTED_ELEMENTS);
    }
  };

  const handleExportData = () => {
    const exportData = {
      app: 'Atelier Home',
      version: '2.4.0',
      exportedAt: new Date().toISOString(),
      day1Essentials,
      selectedElements,
      roomCards,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Atelier_Home_Plan_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-body-md relative flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setSearchSettingsMode('search')}
        onOpenSettings={() => setSearchSettingsMode('settings')}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-6 space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center border-b border-[#c4c8bf]/30 pb-3">
              <h3 className="font-headline-md text-xl text-[#465343]">Atelier Navigation</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-[#504f4c]"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            <div className="space-y-2 font-label-md">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-[#f5f3f3] text-[#465343] font-semibold"
              >
                Dashboard & Move-in Essentials
              </button>
              <button
                onClick={() => {
                  setActiveTab('kids-room');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-[#f5f3f3] text-[#1b1c1c]"
              >
                Kids Room Planner & Safety
              </button>
              <button
                onClick={() => {
                  setActiveTab('master-suite');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-[#f5f3f3] text-[#1b1c1c]"
              >
                Master Suite & Private Sanctuary
              </button>
              <button
                onClick={() => {
                  setActiveTab('exterior');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-[#f5f3f3] text-[#1b1c1c]"
              >
                Exterior & Curb Appeal
              </button>
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-[#f5f3f3] text-[#1b1c1c]"
              >
                Profile & Export Options
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Screen Views */}
      <main className="pt-20 flex-grow">
        {activeTab === 'dashboard' && (
          <DashboardView
            onTabChange={setActiveTab}
            day1Essentials={day1Essentials}
            onToggleEssential={handleToggleEssential}
            onOpenAddReminder={() => setIsAddReminderOpen(true)}
            onOpenSuiteDesigner={() => setIsSuiteDesignerOpen(true)}
            roomCards={roomCards}
          />
        )}

        {activeTab === 'kids-room' && (
          <KidsRoomView
            onOpenSuiteDesigner={() => setIsSuiteDesignerOpen(true)}
            selectedElements={selectedElements}
            onToggleElementInProject={handleToggleElementInProject}
            onOpenAddItem={() => setIsAddItemOpen(true)}
            materialPalette={materialPalette}
          />
        )}

        {activeTab === 'master-suite' && (
          <MasterSuiteView
            onOpenSuiteDesigner={() => setIsSuiteDesignerOpen(true)}
            onOpenAddReminder={() => setIsAddReminderOpen(true)}
          />
        )}

        {activeTab === 'exterior' && (
          <ExteriorView
            maintenanceLog={maintenanceLog}
            onOpenAddReminder={() => setIsAddReminderOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            onExportData={handleExportData}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Bottom Navigation for Mobile */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Interactive Modals */}
      <SuiteDesignerModal
        isOpen={isSuiteDesignerOpen}
        onClose={() => setIsSuiteDesignerOpen(false)}
      />

      <AddReminderModal
        isOpen={isAddReminderOpen}
        onClose={() => setIsAddReminderOpen(false)}
        onAddReminder={handleAddReminder}
      />

      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddElement}
      />

      <SearchSettingsModal
        mode={searchSettingsMode}
        onClose={() => setSearchSettingsMode(null)}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
