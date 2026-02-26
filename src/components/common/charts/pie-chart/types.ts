interface PieChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface CustomPieChartItem {
  title?: string;
  data: PieChartItem[];
  height?: number;
  outerRadius?: number;
  showLegend?: boolean;
}
