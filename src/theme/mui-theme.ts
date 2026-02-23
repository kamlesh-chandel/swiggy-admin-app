import { createTheme } from '@mui/material/styles';
import type { PaletteOptions } from '@mui/material/styles';

export const getMuiTheme = (palette: PaletteOptions) => {
  return createTheme({
    palette,

    typography: {
      fontFamily: `'Inter', 'Roboto', sans-serif`,
      h5: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 10,
    },
    components: {
      MuiTextField: {
        defaultProps: {
          color: 'secondary',
        },
      },
    },
  });
};
