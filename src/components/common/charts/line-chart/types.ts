import type { AsyncStateProps } from '@/types/async-state';

export interface LineChartItem {
  date: string;
  orders: number;
}

export interface LineChartProps extends AsyncStateProps {
  title?: string;
  data: LineChartItem[];
}
