import { Box, Typography } from '@mui/material';
import type { ApiError } from '@/types/async-state';

interface FailedStateProps {
  error: ApiError;
  height?: number;
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: { xs: 12, md: 18 },
    mt: 2,
  },
};

const FailedState = ({ error, height = 200 }: FailedStateProps) => {
  if (!error) return null;

  return (
    <Box sx={{ ...styles.container, height }}>
      <Typography sx={styles.text}>{error}</Typography>
    </Box>
  );
};

export default FailedState;
