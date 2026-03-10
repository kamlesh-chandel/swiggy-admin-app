import type { AsyncStateProps } from '@/types/async-state';

export interface BarChartItem {
  name: string;
  value: number;
}

export interface BarChartProps extends AsyncStateProps {
  title?: string;
  data: BarChartItem[];
}
