export interface PieChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface CustomPieChartProps {
  title?: string;
  data: PieChartItem[];
  height?: number;
  outerRadius?: number;
  showLegend?: boolean;
}
