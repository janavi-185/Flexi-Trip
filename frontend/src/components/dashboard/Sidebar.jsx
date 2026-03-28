import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../utils/authStore';

const navItems = [
  {
    id: 'chat',
    label: 'Plan a Trip',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'itinerary',
    label: 'My Itinerary',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'preferences',
    label: 'Trip Details',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20 12h-2M6 12H4M18.66 18.66l-1.41-1.41M5.34 5.34L3.93 3.93" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
  },
];

export default function Sidebar({ activeView, setActiveView }) {
  const [collapsed, setCollapsed] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`relative flex flex-col h-screen border-r border-border transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
      style={{ background: 'var(--sidebar)', color: 'var(--sidebar-foreground)' }}
    >
      {/* Header */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-border ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-base tracking-tight text-foreground">FlexiTrip</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">
            Navigation
          </p>
        )}
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground opacity-70" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className={`border-t border-border p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-accent transition-colors group">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-sm uppercase">
                {user?.name?.[0] || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-foreground">{user?.name || 'Traveler'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
              title="Logout"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            title="Logout"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        )}
      </div>
    </aside>
  );
}
