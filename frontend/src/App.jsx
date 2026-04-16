import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import AccountPage from './pages/Account';
import DashboardPage from './pages/Dashboard';
import RouteGuard from './components/auth/Routes';
import { useAuthStore } from './utils/authStore';

function App() {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const hasCheckedSession = useAuthStore((state) => state.hasCheckedSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-border" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
            style={{ animation: 'spin 0.8s linear infinite' }}
          />
        </div>
        <p className="text-sm text-muted-foreground">Loading…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RouteGuard type="guest" />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<RouteGuard type="protected" />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
