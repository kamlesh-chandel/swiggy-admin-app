import { Typography } from '@mui/material';

interface FailedStateProps {
  error?: number;
  height?: number;
}

const styles = {
  text: {
    fontSize: { xs: 12, md: 18 },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const FailedState = ({ error, height }: FailedStateProps) => {
  const message =
    error === 403
      ? 'You do not have permission to view this resource.'
      : 'Failed to load data';
  return (
    <Typography sx={styles.text} height={height}>
      {message}
    </Typography>
  );
};

export default FailedState;
