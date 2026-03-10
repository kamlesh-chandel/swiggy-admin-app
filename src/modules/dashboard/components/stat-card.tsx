import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import type { Theme } from '@mui/material';

import FailedState from '@/components/common/failed-state';

import type { StatCardConfig } from '../dashboard.types';

const styles = {
  card: {
    border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
    height: { xs: 120, md: 140 },
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    px: { xs: 2, md: 3 },
    gap: 2,
  },
  textWrapper: {
    minWidth: 0,
  },
  valueText: {
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: 20, md: 50 },
    height: { xs: 20, md: 50 },
    borderRadius: 2,
    bgcolor: 'background.default',
    flexShrink: 0,
  },
  iconSkelaton: {
    width: { xs: 20, md: 50 },
    height: { xs: 20, md: 50 },
  },
};

const StatCard = ({
  title,
  value,
  icon,
  loading,
  errorType,
}: StatCardConfig) => {
  return (
    <Card elevation={0} sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.textWrapper}>
          {loading ? (
            <>
              <Skeleton width={80} height={16} sx={{ mb: 1 }} />
              <Skeleton width={100} height={28} />
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {title}
              </Typography>

              {errorType ? (
                <FailedState errorType={errorType} height={30} />
              ) : (
                <Typography variant="h6" sx={styles.valueText}>
                  {value}
                </Typography>
              )}
            </>
          )}
        </Box>

        {loading ? (
          <Skeleton variant="rounded" sx={styles.iconSkelaton} />
        ) : (
          icon && <Box sx={styles.iconBox}>{icon}</Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
