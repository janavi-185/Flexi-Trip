import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import GuestRoute from './components/GuestRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const hasCheckedSession = useAuthStore((state) => state.hasCheckedSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen bg-foreground text-white flex items-center justify-center">
        Checking your session...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
