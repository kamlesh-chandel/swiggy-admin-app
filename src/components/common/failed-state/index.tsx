import { Box, Typography } from '@mui/material';
import type { ApiErrorType } from '@/types/async-state';

interface FailedStateProps {
  errorType: ApiErrorType;
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

const getErrorMessage = (errorType: ApiErrorType): string => {
  switch (errorType) {
    case 'permission':
      return 'You do not have permission to access this resource.';

    case 'server':
      return 'Failed to load data. Please try again later.';

    default:
      return 'Something went wrong.';
  }
};

const FailedState = ({ errorType, height = 200 }: FailedStateProps) => {
  if (!errorType) return null;

  return (
    <Box sx={{ ...styles.container, height }}>
      <Typography sx={styles.text}>{getErrorMessage(errorType)}</Typography>
    </Box>
  );
};

export default FailedState;
