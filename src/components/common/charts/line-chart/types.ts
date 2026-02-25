export interface LineChartItem {
  date: string;
  orders: number;
}

export interface CustomLineChartProps {
  title?: string;
  data: LineChartItem[];
  loading?: boolean;
}
