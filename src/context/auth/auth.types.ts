export interface AuthUser {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
}

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;

  setAuthSession: (response: AuthResponse) => void;
  removeAuthSession: () => void;
}
