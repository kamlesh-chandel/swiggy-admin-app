export interface BarChartItem {
  name: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartItem[];
  height?: number;
}
