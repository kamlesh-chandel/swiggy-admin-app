import { Typography } from '@mui/material';

interface FailedStateProps {
  message?: string;
}

const styles = {
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
};

const FailedState = ({ message = 'Failed to load data' }: FailedStateProps) => {
  return <Typography sx={styles.text}>{message}</Typography>;
};

export default FailedState;
