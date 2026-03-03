export interface BarChartItem {
  name: string;
  value: number;
}

export interface BarChartProps {
  title?: string;
  data: BarChartItem[];
  loading?: boolean;
  error?: number;
}
