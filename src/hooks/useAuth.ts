import { useState, useCallback } from 'react';
import apiClient from '../services/api';
import { authUtils, AuthUser, AuthTokens } from '../utils/auth';

interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    tenantName: string;
  }) => Promise<void>;
  login: (email: string, password: string, tenantId: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(authUtils.getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      tenantName: string;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.register(data);
        if (response.success && response.data) {
          const { user, accessToken, refreshToken, tenantId } = response.data;
          authUtils.setTokens(accessToken, refreshToken);
          authUtils.setUser(user);
          authUtils.setTenantId(tenantId);
          setUser(user);
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string, tenantId: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.login(email, password, tenantId);
        if (response.success && response.data) {
          const { user, accessToken, refreshToken } = response.data;
          authUtils.setTokens(accessToken, refreshToken);
          authUtils.setUser(user);
          authUtils.setTenantId(tenantId);
          setUser(user);
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'Login failed';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiClient.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      authUtils.clearAuth();
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const refreshAuth = useCallback(async () => {
    const refreshToken = authUtils.getRefreshToken();
    if (!refreshToken) {
      authUtils.clearAuth();
      setUser(null);
      return;
    }

    try {
      const response = await apiClient.refreshToken(refreshToken);
      if (response.success && response.data) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        authUtils.setTokens(accessToken, newRefreshToken);
      }
    } catch (err) {
      authUtils.clearAuth();
      setUser(null);
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    register,
    login,
    logout,
    refreshAuth,
  };
};
