export interface LineChartItem {
  date: string;
  orders: number;
}

export interface LineChartProps {
  data: LineChartItem[];
}
