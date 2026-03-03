interface PieChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  title?: string;
  data: PieChartItem[];
  height?: number;
  outerRadius?: number;
  showLegend?: boolean;
  loading?: boolean;
  error?: number;
}
