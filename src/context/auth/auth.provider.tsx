import { useMemo, useState, type ReactNode } from 'react';
import type { AuthContextType, AuthUser, AuthResponse } from './auth.types';
import { AuthContext } from './auth.context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const storedUser = localStorage.getItem('user');

  const [user, setUser] = useState<AuthUser | null>(
    storedUser ? JSON.parse(storedUser) : null,
  );

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
    return {
      user,
      isAuthenticated: !!user,
      setAuthSession,
      removeAuthSession,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
