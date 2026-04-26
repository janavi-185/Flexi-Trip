import { useState } from 'react';
import { useTripStore } from '../../utils/tripStore';
import * as tripApi from '../../utils/tripApi';

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
        <span className="text-base">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-foreground truncate">{value || '—'}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #ff6b6e)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No Trip Details Yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        Once you plan a trip using the <span className="text-primary font-medium">Plan a Trip</span> chat, your preferences and trip details will appear here.
      </p>
    </div>
  );
}

const STYLE_BADGE_COLORS = {
  Adventure: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Relaxation: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Cultural: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Food & Drink': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Budget: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Luxury: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
};

export default function TripFormView() {
  const activeTrip = useTripStore((s) => s.activeTrip);
  const fetchTrips = useTripStore((s) => s.fetchTrips);
  const selectTrip = useTripStore((s) => s.selectTrip);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  if (!activeTrip) return <EmptyState />;

  const { destination, budget, duration, travelers, trip_style, status, created_at } = activeTrip;
  const badgeClass = STYLE_BADGE_COLORS[trip_style] || 'bg-secondary text-secondary-foreground';

  const handleEdit = () => {
    setEditForm({
      destination: destination || '',
      budget: budget || '',
      duration: duration || '',
      travelers: travelers || '1',
      trip_style: trip_style || '',
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await tripApi.updateTrip(activeTrip.id, editForm);
      await selectTrip(activeTrip.id);
      await fetchTrips();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update trip:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({});
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg text-foreground">Trip Details</h2>
          <p className="text-sm text-muted-foreground">Your saved trip preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Status Banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-sm text-primary font-medium">
            Status: {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Planned'}
          </p>
        </div>

        {/* Main Details Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3 bg-secondary/50 border-b border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trip Overview</h3>
          </div>
          {isEditing ? (
            <div className="px-5 py-4 space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1 font-medium">Destination</label>
                <input
                  type="text"
                  value={editForm.destination}
                  onChange={(e) => setEditForm((p) => ({ ...p, destination: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1 font-medium">Budget</label>
                <input
                  type="text"
                  value={editForm.budget}
                  onChange={(e) => setEditForm((p) => ({ ...p, budget: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1 font-medium">Duration</label>
                <input
                  type="text"
                  value={editForm.duration}
                  onChange={(e) => setEditForm((p) => ({ ...p, duration: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1 font-medium">Travelers</label>
                <select
                  value={editForm.travelers}
                  onChange={(e) => setEditForm((p) => ({ ...p, travelers: e.target.value }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
                >
                  {['1', '2', '3', '4', '5+'].map((n) => (
                    <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1 font-medium">Trip Style</label>
                <div className="flex flex-wrap gap-2">
                  {['Adventure', 'Relaxation', 'Cultural', 'Food & Drink', 'Budget', 'Luxury'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setEditForm((p) => ({ ...p, trip_style: style }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                        editForm.trip_style === style
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
          ) : (
            <div className="px-5">
              <InfoRow icon="🌍" label="Destination" value={destination} />
              <InfoRow icon="💰" label="Budget" value={budget} />
              <InfoRow icon="📅" label="Duration" value={duration} />
              <InfoRow icon="👥" label="Travelers" value={travelers ? `${travelers} ${travelers === '1' ? 'person' : 'people'}` : null} />
            </div>
          )}
        </div>

        {/* Trip Style */}
        {trip_style && !isEditing && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-secondary/50 border-b border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trip Style</h3>
            </div>
            <div className="px-5 py-4">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${badgeClass}`}>
                {trip_style}
              </span>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: '✅', label: 'Status', value: status?.charAt(0).toUpperCase() + status?.slice(1) || 'Planned' },
            { emoji: '🗓️', label: 'Created', value: created_at ? new Date(created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-sm font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
