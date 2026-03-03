import {
  PieChart as MuiPieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import FailedState from '@/components/common/failed-state';
import type { PieChartProps } from './types';

const styles = {
  card: {
    height: 300,
    width: 735,
  },
  title: {
    mb: 1,
  },
};

const PieChart = ({
  title,
  data,
  height = 240,
  outerRadius,
  showLegend = true,
  loading,
  errorType,
}: PieChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const responsiveOuterRadius = isMobile ? 50 : outerRadius;

  const renderContent = () => {
    if (loading) {
      return <Skeleton variant="rectangular" height={280} />;
    }
    if (errorType) {
      return <FailedState height={280} errorType={errorType} />;
    }
    return (
      <ResponsiveContainer width="100%" height={height}>
        <MuiPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={responsiveOuterRadius}
            label
            labelLine={false}
          >
            {data.map(({ color, name }) => (
              <Cell key={name} fill={color || theme.palette.primary.main} />
            ))}
          </Pie>

          {showLegend && <Legend wrapperStyle={{ paddingTop: 10 }} />}
        </MuiPieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card elevation={0} sx={styles.card}>
      <CardContent>
        {title && (
          <Typography variant="h6" sx={styles.title}>
            {title}
          </Typography>
        )}
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default PieChart;
