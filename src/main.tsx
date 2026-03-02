import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/auth/auth.provider.tsx';
import { ThemeProvider } from './theme/theme-provider.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>,
);
