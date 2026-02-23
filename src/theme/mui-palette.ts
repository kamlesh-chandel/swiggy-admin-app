import type { PaletteOptions } from '@mui/material/styles';
import { COLORS } from './colors';

export const lightPalette: PaletteOptions = {
  mode: 'light',

  primary: {
    main: COLORS.light.primary,
  },
  secondary: {
    main: COLORS.light.secondary,
  },

  background: {
    default: COLORS.light.bg,
    paper: COLORS.light.surface,
  },

  text: {
    primary: COLORS.light.textPrimary,
    secondary: COLORS.light.textSecondary,
  },

  divider: COLORS.light.border,
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',

  primary: {
    main: COLORS.dark.primary,
  },
  secondary: {
    main: COLORS.dark.secondary,
  },
  background: {
    default: COLORS.dark.bg,
    paper: COLORS.dark.surface,
  },

  text: {
    primary: COLORS.dark.textPrimary,
    secondary: COLORS.dark.textSecondary,
  },

  divider: COLORS.dark.border,
};
