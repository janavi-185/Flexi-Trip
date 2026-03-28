import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AccountPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-foreground text-white px-4 py-12">
      <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <p className="text-sm text-white/50 mb-2">Signed in as</p>
        <h1 className="text-2xl font-bold mb-6">{user?.name || 'Traveler'}</h1>

        <div className="space-y-3 text-sm mb-8">
          <p className="text-white/70">Email: {user?.email || '-'}</p>
          <p className="text-white/70">User ID: {user?.id || '-'}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
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
