export interface AuthUser {
  username: string;
  email: string;
  role: 'super_admin' | 'admin';
}

export interface AuthResponse {
  user: AuthUser;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;

  setAuthSession: (response: AuthResponse) => void;
  removeAuthSession: () => void;
}
