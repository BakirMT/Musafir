import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { LandingPage } from './components/LandingPage';
import { EmergencyModal } from './components/EmergencyModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AddPlaceModal } from './components/AddPlaceModal';
import { PresentationMode } from './components/PresentationMode';

// Views
import { DashboardView } from './views/DashboardView';
import { QiblaView } from './views/QiblaView';
import { PrayerTimesView } from './views/PrayerTimesView';
import { MosquesView } from './views/MosquesView';
import { HalalFoodView } from './views/HalalFoodView';
import { HotelsView } from './views/HotelsView';
import { TripsView } from './views/TripsView';
import { ChecklistView } from './views/ChecklistView';
import { IslamicGuideView } from './views/IslamicGuideView';
import { HajjUmrahView } from './views/HajjUmrahView';
import { AIAssistantView } from './views/AIAssistantView';
import { ExpenseView } from './views/ExpenseView';
import { SavedView } from './views/SavedView';
import { ProfileView } from './views/ProfileView';
import { PrivacyView } from './views/PrivacyView';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#F7F5EF] dark:bg-[#071310]">
        <Navbar />
        <LandingPage />
        <EmergencyModal />
        <GlobalSearchModal />
        <AddPlaceModal />
        <PresentationMode />
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'qibla':
        return <QiblaView />;
      case 'prayer':
        return <PrayerTimesView />;
      case 'mosques':
        return <MosquesView />;
      case 'halal-food':
        return <HalalFoodView />;
      case 'hotels':
        return <HotelsView />;
      case 'trips':
        return <TripsView />;
      case 'checklist':
        return <ChecklistView />;
      case 'islamic-guide':
        return <IslamicGuideView />;
      case 'hajj-umrah':
        return <HajjUmrahView />;
      case 'assistant':
        return <AIAssistantView />;
      case 'expenses':
        return <ExpenseView />;
      case 'saved':
        return <SavedView />;
      case 'profile':
        return <ProfileView />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] dark:bg-[#071310] text-[#17211E] dark:text-[#F4F1E8] transition-colors">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global App Footer */}
      <footer className="hidden md:block py-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-[#6B756F] dark:text-[#9AA9A2]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#0F5C4D] dark:text-[#E8DCC2]">MUSAFIR</span>
            <span>•</span>
            <span>Travel Far. Pray Anywhere.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('landing')}
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              About Musafir
            </button>
            <button
              onClick={() => setActiveTab('islamic-guide')}
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              Islamic Sources
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              Privacy & Ethics
            </button>
            <span>© 2026 Musafir</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals */}
      <EmergencyModal />
      <GlobalSearchModal />
      <AddPlaceModal />
      <PresentationMode />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
