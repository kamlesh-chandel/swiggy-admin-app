interface PieChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartItem[];
  height?: number;
  outerRadius?: number;
  showLegend?: boolean;
}
