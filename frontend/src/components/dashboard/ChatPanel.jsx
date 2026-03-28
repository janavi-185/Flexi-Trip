import { useState, useRef, useEffect } from 'react';

const SUGGESTION_CHIPS = [
  '🏖️ Beach vacation on a budget',
  '🗺️ Weekend city break',
  '🏔️ Mountain adventure trip',
  '🌍 International backpacking',
  '🍜 Food & culture tour',
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    text: "Hi there! I'm your AI travel planner ✈️ Tell me about your dream trip — where do you want to go, what's your budget, and when are you planning to travel?",
  },
];

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-secondary text-secondary-foreground rounded-tl-sm border border-border'
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
      <div className="bg-secondary border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatPanel({ onItineraryGenerated }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tripForm, setTripForm] = useState({
    destination: '',
    budget: '',
    duration: '',
    travelers: '1',
    tripStyle: '',
  });
  const [showForm, setShowForm] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text = input.trim()) => {
    if (!text) return;

    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));
    setIsTyping(false);

    const mockItinerary = {
      destination: tripForm.destination || 'Your destination',
      budget: tripForm.budget || 'Not specified',
      duration: tripForm.duration || '5 days',
      travelers: tripForm.travelers,
      tripStyle: tripForm.tripStyle || 'Adventure',
      days: [
        { day: 1, title: 'Arrival & Explore', activities: ['Check-in to hotel', 'Evening walk along the waterfront', 'Welcome dinner at a local restaurant'] },
        { day: 2, title: 'Cultural Immersion', activities: ['Morning museum visit', 'Afternoon heritage walk', 'Traditional cooking class'] },
        { day: 3, title: 'Nature & Adventure', activities: ['Guided trekking tour', 'Picnic lunch with scenic views', 'Sunset photography spot'] },
        { day: 4, title: 'Free Exploration', activities: ['Local market shopping', 'Spa & relaxation', 'Street food crawl'] },
        { day: 5, title: 'Departure Day', activities: ['Breakfast at café', 'Last-minute souvenir shopping', 'Head to airport'] },
      ],
    };

    const aiMsg = {
      id: Date.now() + 1,
      role: 'assistant',
      text: `I've created a personalized itinerary for you! 🎉 Check the **My Itinerary** section to see your ${tripForm.duration || '5-day'} trip plan. I've also saved your trip details in the **Trip Details** section.`,
    };
    setMessages((prev) => [...prev, aiMsg]);

    if (onItineraryGenerated) {
      onItineraryGenerated(mockItinerary, { ...tripForm, lastMessage: text });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border shrink-0">
        <h2 className="font-semibold text-lg text-foreground">Plan a Trip</h2>
        <p className="text-sm text-muted-foreground">Fill in your preferences and chat with your AI planner</p>
      </div>

      {/* Quick Form */}
      {showForm && (
        <div className="px-6 py-4 border-b border-border bg-secondary/30 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trip Preferences</p>
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Hide
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1 font-medium">Destination</label>
              <input
                type="text"
                placeholder="e.g. Bali, Paris, Japan"
                value={tripForm.destination}
                onChange={(e) => setTripForm((p) => ({ ...p, destination: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1 font-medium">Budget (USD)</label>
              <input
                type="text"
                placeholder="e.g. $500, $2000"
                value={tripForm.budget}
                onChange={(e) => setTripForm((p) => ({ ...p, budget: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1 font-medium">Duration</label>
              <input
                type="text"
                placeholder="e.g. 5 days, 2 weeks"
                value={tripForm.duration}
                onChange={(e) => setTripForm((p) => ({ ...p, duration: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1 font-medium">Travelers</label>
              <select
                value={tripForm.travelers}
                onChange={(e) => setTripForm((p) => ({ ...p, travelers: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
              >
                {['1', '2', '3', '4', '5+'].map((n) => (
                  <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-muted-foreground mb-1 font-medium">Trip Style</label>
              <div className="flex flex-wrap gap-2">
                {['Adventure', 'Relaxation', 'Cultural', 'Food & Drink', 'Budget', 'Luxury'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setTripForm((p) => ({ ...p, tripStyle: style }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                      tripForm.tripStyle === style
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length <= 1 && (
        <div className="px-6 pb-2 flex flex-wrap gap-2 shrink-0">
          {SUGGESTION_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-6 py-4 border-t border-border shrink-0">
        <div className="flex items-end gap-3 bg-secondary/50 border border-border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
            onKeyDown={handleKeyDown}
            placeholder="Describe your dream trip…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none leading-relaxed"
            style={{ minHeight: '24px', maxHeight: '120px' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
