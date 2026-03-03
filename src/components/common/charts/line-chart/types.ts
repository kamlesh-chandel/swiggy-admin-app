export interface LineChartItem {
  date: string;
  orders: number;
}

export interface LineChartProps {
  title?: string;
  data: LineChartItem[];
  loading?: boolean;
  error?: number;
}
