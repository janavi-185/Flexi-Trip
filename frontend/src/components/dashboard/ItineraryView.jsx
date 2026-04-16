const DAY_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
];

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #ff6b6e)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No Itinerary Yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        Head over to <span className="text-primary font-medium">Plan a Trip</span> and chat with your AI planner to generate a personalized itinerary.
      </p>
    </div>
  );
}

export default function ItineraryView({ itinerary }) {
  if (!itinerary) return <EmptyState />;

  const { destination, budget, duration, travelers, tripStyle, days = [] } = itinerary;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-lg text-foreground">My Itinerary</h2>
            <p className="text-sm text-muted-foreground">Your personalized travel plan</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Trip Summary Card */}
        <div className="relative rounded-2xl overflow-hidden mb-6 border border-border">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent" />
          <div className="relative p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">✈️</span>
              <h3 className="text-xl font-bold text-foreground">{destination}</h3>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {[
                { icon: '💰', label: 'Budget', value: budget },
                { icon: '📅', label: 'Duration', value: duration },
                { icon: '👥', label: 'Travelers', value: `${travelers} ${travelers === '1' ? 'person' : 'people'}` },
                { icon: '🎯', label: 'Style', value: tripStyle },
              ].filter(item => item.value).map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 bg-background/60 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs text-muted-foreground">{item.label}:</span>
                  <span className="text-xs font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Day-by-Day Timeline */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Day-by-Day Plan</h4>
          {days.map((day, idx) => (
            <div
              key={day.day}
              className="flex gap-4 group"
              style={{ animation: `fadeSlideIn 0.4s ease forwards ${idx * 0.08}s`, opacity: 0 }}
            >
              {/* Timeline dot & line */}
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-xl ${DAY_COLORS[idx % DAY_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
                  {day.day}
                </div>
                {idx < days.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-2 mb-0 min-h-5" />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 pb-4">
                <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all">
                  <h5 className="font-semibold text-foreground mb-3 text-sm">{day.title}</h5>
                  <ul className="space-y-2">
                    {day.activities.map((activity, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
