import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../utils/authStore';

export default function AccountPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-12">
      <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-2xl">
        <p className="text-sm text-muted-foreground mb-2">Signed in as</p>
        <h1 className="text-2xl font-bold mb-6">{user?.name || 'Traveler'}</h1>

        <div className="space-y-3 text-sm mb-8">
          <p className="text-muted-foreground">Email: {user?.email || '-'}</p>
          <p className="text-muted-foreground">User ID: {user?.id || '-'}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            Back To Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

