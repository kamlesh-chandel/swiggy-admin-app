import { useMemo, useState, type ReactNode } from 'react';
import type { AuthContextType, AuthUser, AuthResponse } from './auth.types';
import { AuthContext } from './auth.context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setAuthSession = (response: AuthResponse) => {
    setUser(response.user);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.jwt);
  };

  const removeAuthSession = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = useMemo<AuthContextType>(() => {
    const token = localStorage.getItem('token');
    return {
      user,
      isAuthenticated: !!user && !!token,
      setAuthSession,
      removeAuthSession,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
