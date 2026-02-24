import { CircularProgress, Box } from '@mui/material';

interface LoaderProps {
  size?: number;
  fullScreen?: boolean;
}

const styles = {
  loaderBox: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'rgba(255,255,255,0.6)',
    zIndex: 9999,
  },
};

const Loader = ({ size = 24, fullScreen = false }: LoaderProps) => {
  if (fullScreen) {
    return (
      <Box sx={styles.loaderBox}>
        <CircularProgress size={40} />
      </Box>
    );
  }
  return <CircularProgress size={size} />;
};

export default Loader;
