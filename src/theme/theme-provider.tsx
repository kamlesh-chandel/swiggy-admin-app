import { useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import type { ReactNode } from 'react';

import { ThemeContext, type ThemeMode } from '@/context/theme/theme.context';
import { lightPalette, darkPalette } from './mui-palette';

import { getMuiTheme } from './mui-theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const stored = localStorage.getItem('theme') as ThemeMode | null;
  const [mode, setMode] = useState<ThemeMode>(stored || 'dark');

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  const theme = useMemo(() => {
    const palette = mode === 'light' ? lightPalette : darkPalette;
    return getMuiTheme(palette);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
