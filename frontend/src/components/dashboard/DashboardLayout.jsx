import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import ItineraryView from './ItineraryView';
import TripFormView from './TripFormView';

export default function DashboardLayout() {
  const [activeView, setActiveView] = useState('chat');
  const [itinerary, setItinerary] = useState(null);
  const [preferences, setPreferences] = useState(null);

  const handleItineraryGenerated = (newItinerary, newPreferences) => {
    setItinerary(newItinerary);
    setPreferences(newPreferences);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 overflow-hidden">
        {activeView === 'chat' && (
          <ChatPanel onItineraryGenerated={handleItineraryGenerated} />
        )}
        {activeView === 'itinerary' && (
          <ItineraryView itinerary={itinerary} />
        )}
        {activeView === 'preferences' && (
          <TripFormView preferences={preferences} />
        )}
      </main>
    </div>
  );
}
