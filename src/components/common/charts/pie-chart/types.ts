import type { AsyncStateProps } from '@/types/async-state';

interface PieChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps extends AsyncStateProps {
  title?: string;
  data: PieChartItem[];
  height?: number;
  outerRadius?: number;
  showLegend?: boolean;
}
