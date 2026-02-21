import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { authUtils, AuthUser } from '../utils/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string[];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const isAuthenticated = authUtils.isAuthenticated();
  const user = authUtils.getUser() as AuthUser | null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
