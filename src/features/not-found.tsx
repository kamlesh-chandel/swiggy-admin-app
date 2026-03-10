import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.secondary,
          fontSize: { xs: 80, md: 120 },
        }}
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 1 }}>
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          mb: 4,
          maxWidth: 400,
        }}
      >
        The page you are looking for does not exist or may have been moved.
      </Typography>
    </Box>
  );
};

export default NotFound;
