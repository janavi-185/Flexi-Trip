import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../utils/authStore';

export default function RouteGuard({ type = 'protected' }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (type === 'guest') {
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
  } else {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  }
}
