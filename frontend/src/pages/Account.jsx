import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../utils/authStore';
import { useTripStore } from '../utils/tripStore';
import * as tripApi from '../utils/tripApi';

export default function AccountPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const trips = useTripStore((state) => state.trips);
  const fetchTrips = useTripStore((state) => state.fetchTrips);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      await tripApi.updateProfile({ name: editName, email: editEmail });
      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);
      // Refresh user data
      const { restoreSession } = useAuthStore.getState();
      await restoreSession();
    } catch (error) {
      setSaveMessage(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">FlexiTrip</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-secondary/50 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
            {!isEditing ? (
              <button
                onClick={() => {
                  setEditName(user?.name || '');
                  setEditEmail(user?.email || '');
                  setIsEditing(true);
                  setSaveMessage('');
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all cursor-pointer"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => { setIsEditing(false); setSaveMessage(''); }}
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

          <div className="p-6">
            {saveMessage && (
              <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${
                saveMessage.startsWith('Error') ? 'bg-red-500/10 text-red-400 border border-red-400/30' : 'bg-green-500/10 text-green-400 border border-green-400/30'
              }`}>
                {saveMessage}
              </div>
            )}

            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-2xl uppercase">
                  {user?.name?.[0] || 'U'}
                </span>
              </div>
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1 font-medium">Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Name</p>
                      <p className="text-base font-semibold text-foreground">{user?.name || 'Traveler'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <p className="text-sm text-foreground">{user?.email || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">User ID</p>
                      <p className="text-sm text-muted-foreground">{user?.id || '-'}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trip History */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-secondary/50 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Trip History</h2>
              <p className="text-sm text-muted-foreground">{trips.length} trip{trips.length !== 1 ? 's' : ''} planned</p>
            </div>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              + Plan New Trip
            </Link>
          </div>

          <div className="divide-y divide-border">
            {trips.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-muted-foreground text-sm">No trips yet. Start planning your first adventure!</p>
              </div>
            ) : (
              trips.map((trip) => (
                <div
                  key={trip.id}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-lg">✈️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{trip.destination}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {[trip.duration, trip.trip_style, trip.budget].filter(Boolean).join(' · ') || 'No details'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-semibold ${
                      trip.status === 'planned' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {trip.status?.charAt(0).toUpperCase() + trip.status?.slice(1) || 'Planned'}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {trip.created_at ? new Date(trip.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { emoji: '✈️', label: 'Total Trips', value: trips.length },
            { emoji: '🌍', label: 'Destinations', value: new Set(trips.map((t) => t.destination)).size },
            { emoji: '📅', label: 'Member Since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">{stat.emoji}</div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
