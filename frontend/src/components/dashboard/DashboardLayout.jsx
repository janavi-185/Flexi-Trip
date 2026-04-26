import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import ItineraryView from './ItineraryView';
import TripFormView from './TripFormView';
import { useTripStore } from '../../utils/tripStore';

export default function DashboardLayout() {
  const [activeView, setActiveView] = useState('chat');
  const fetchTrips = useTripStore((s) => s.fetchTrips);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 overflow-hidden">
        {activeView === 'chat' && <ChatPanel />}
        {activeView === 'itinerary' && <ItineraryView />}
        {activeView === 'preferences' && <TripFormView />}
      </main>
    </div>
  );
}
