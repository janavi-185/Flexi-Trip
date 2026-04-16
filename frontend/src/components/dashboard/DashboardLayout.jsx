import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import ItineraryView from './ItineraryView';
import TripFormView from './TripFormView';

const DUMMY_ITINERARY = {
  destination: 'Paris, France',
  budget: '$3,000',
  duration: '5 Days',
  travelers: '2',
  tripStyle: 'Adventure & Culture',
  days: [
    {
      day: '1',
      title: 'Arrival & Iconic Landmarks',
      activities: [
        '✈️ Arrive at Charles de Gaulle Airport',
        '🏨 Check-in at hotel near Champs-Élysées',
        '🗼 Visit Eiffel Tower for sunset views',
        '🍽️ Dinner at a traditional French bistro'
      ]
    },
    {
      day: '2',
      title: 'Museums & Art',
      activities: [
        '🏛️ Explore Louvre Museum (2-3 hours)',
        '🍰 Lunch at a café with croissants',
        '🎨 Walk through Latin Quarter',
        '📚 Visit Shakespeare and Company bookstore',
        '🌙 Stroll along Seine River'
      ]
    },
    {
      day: '3',
      title: 'Montmartre & Local Vibes',
      activities: [
        '⛪ Visit Sacré-Cœur Basilica',
        '🎭 Explore Montmartre artistic district',
        '🖼️ Visit Picasso Museum',
        '🍷 Wine tasting at local wine bar',
        '💃 Evening show at Moulin Rouge'
      ]
    },
    {
      day: '4',
      title: 'Palace & Gardens',
      activities: [
        '🚂 Day trip to Palace of Versailles',
        '👑 Tour lavish royal rooms',
        '🌳 Stroll through magnificent gardens',
        '⛲ Visit Hall of Mirrors',
        '🍷 Return to Paris for light dinner'
      ]
    },
    {
      day: '5',
      title: 'Leisure & Departure',
      activities: [
        '☕ Relax at a café with morning coffee',
        '🛍️ Last-minute shopping on Boulevard Saint-Germain',
        '🎁 Visit souvenir shops',
        '✈️ Head to airport for departure',
        '👋 Safe travels!'
      ]
    }
  ]
};

export default function DashboardLayout() {
  const [activeView, setActiveView] = useState('chat');
  const [itinerary, setItinerary] = useState(DUMMY_ITINERARY);
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
