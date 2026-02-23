import { useMemo, useState, type ReactNode } from 'react';
import type { AuthContextType, User } from './auth.types';
import { AuthContext } from './auth.context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const storedUser = localStorage.getItem('user');

  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null,
  );

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = useMemo<AuthContextType>(() => {
    return {
      user,
      isAuthenticated: !!user,
      login,
      logout,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
