import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * GuestRoute — only accessible when the user is NOT authenticated.
 * If a logged-in user tries to visit /login or /signup they are
 * redirected to /dashboard (change `redirectTo` as needed).
 */
export default function GuestRoute({ redirectTo = '/dashboard' }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : <Outlet />;
}
