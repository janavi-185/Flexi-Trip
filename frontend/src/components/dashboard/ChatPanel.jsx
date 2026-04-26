import { useState, useRef, useEffect } from 'react';
import { useTripStore } from '../../utils/tripStore';

const SUGGESTION_CHIPS = [
  '🏖️ Beach vacation on a budget',
  '🗺️ Weekend city break',
  '🏔️ Mountain adventure trip',
  '🌍 International backpacking',
  '🍜 Food & culture tour',
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
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-secondary text-secondary-foreground rounded-tl-sm border border-border'
        }`}
      >
        {msg.content || msg.text}
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

export default function ChatPanel() {
  const activeTrip = useTripStore((s) => s.activeTrip);
  const chatHistory = useTripStore((s) => s.chatHistory);
  const isGenerating = useTripStore((s) => s.isGenerating);
  const createTrip = useTripStore((s) => s.createTrip);
  const sendMessage = useTripStore((s) => s.sendMessage);
  const selectTrip = useTripStore((s) => s.selectTrip);
  const clearActiveTrip = useTripStore((s) => s.clearActiveTrip);

  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
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

  // Sync local messages with chat history from store
  useEffect(() => {
    if (chatHistory.length > 0) {
      setLocalMessages(chatHistory.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
      })));
    }
  }, [chatHistory]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages, isTyping]);

  const handleNewTrip = () => {
    clearActiveTrip();
    setLocalMessages([]);
    setTripForm({ destination: '', budget: '', duration: '', travelers: '1', tripStyle: '' });
    setShowForm(true);
  };

  const handleSend = async (text = input.trim()) => {
    if (!text || isTyping) return;
    setInput('');

    // If no active trip, create one first
    if (!activeTrip) {
      if (!tripForm.destination) {
        // Use the message text to infer destination
        setTripForm((p) => ({ ...p, destination: text }));
      }

      const userMsg = { id: Date.now(), role: 'user', content: text };
      setLocalMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const result = await createTrip({
          destination: tripForm.destination || text,
          budget: tripForm.budget,
          duration: tripForm.duration,
          travelers: tripForm.travelers,
          tripStyle: tripForm.tripStyle,
          message: text,
        });

        setIsTyping(false);

        const aiMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: result.aiMessage || "I've created your itinerary! Check the **My Itinerary** tab to see your plan. 🎉",
        };
        setLocalMessages((prev) => [...prev, aiMsg]);
        setShowForm(false);

        // Load full trip data
        if (result.trip?.id) {
          await selectTrip(result.trip.id);
        }
      } catch (error) {
        setIsTyping(false);
        const errMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: `Sorry, something went wrong: ${error.message}. Please try again.`,
        };
        setLocalMessages((prev) => [...prev, errMsg]);
      }
      return;
    }

    // Active trip exists — send follow-up message
    const userMsg = { id: Date.now(), role: 'user', content: text };
    setLocalMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const result = await sendMessage(text);
      setIsTyping(false);

      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: result.aiMessage || "Let me know if you'd like any changes!",
      };
      setLocalMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      setIsTyping(false);
      const errMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Sorry, I had trouble processing that: ${error.message}`,
      };
      setLocalMessages((prev) => [...prev, errMsg]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const welcomeMessage = {
    id: 0,
    role: 'assistant',
    content: activeTrip
      ? `Welcome back! You're working on your trip to **${activeTrip.destination}**. Ask me anything or request changes to your itinerary.`
      : "Hi there! I'm your AI travel planner ✈️ Fill in your trip preferences above, then tell me about your dream trip — and I'll create a personalized itinerary for you!",
  };

  const displayMessages = localMessages.length > 0
    ? localMessages
    : [welcomeMessage];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg text-foreground">
            {activeTrip ? `Trip to ${activeTrip.destination}` : 'Plan a Trip'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {activeTrip ? 'Chat with your AI planner to refine your trip' : 'Fill in your preferences and chat with your AI planner'}
          </p>
        </div>
        {activeTrip && (
          <button
            onClick={handleNewTrip}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all cursor-pointer"
          >
            + New Trip
          </button>
        )}
      </div>

      {/* Quick Form — only show when no active trip */}
      {!activeTrip && showForm && (
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
        {displayMessages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {(isTyping || isGenerating) && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion Chips — only when no messages yet and no active trip */}
      {!activeTrip && localMessages.length === 0 && (
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
            placeholder={activeTrip ? "Ask to modify your itinerary…" : "Describe your dream trip…"}
            disabled={isTyping || isGenerating}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none leading-relaxed disabled:opacity-50"
            style={{ minHeight: '24px', maxHeight: '120px' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping || isGenerating}
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
