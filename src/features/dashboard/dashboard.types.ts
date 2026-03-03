import type { ReactNode } from 'react';

export interface StatCardProps {
  totalOrders: number;
  totalRevenue: number;
  totalRestaurants: number;
  totalCustomers: number;
}

export interface StatCardConfig {
  title: string;
  value: number | string;
  icon: ReactNode;
  loading: boolean;
  error: number | undefined;
}

export interface DashboardStatsProps {
  totalOrders: number;
  totalRevenue: number;
  totalRestaurants: number;
  totalCustomers: number;
}

export interface OrdersByStatusItem {
  status: string;
  value: number;
}

export interface TopRestaurantItem {
  name: string;
  revenue: number;
}

export interface OrdersTrendItem {
  date: string;
  orders: number;
}

export interface UseDashboardReturn {
  dashboardStats: DashboardStatsProps;
  ordersByStatus: OrdersByStatusItem[];
  topRestaurants: TopRestaurantItem[];
  ordersTrend: OrdersTrendItem[];
  analyticsLoading: boolean;
  restaurantsCountLoading: boolean;
  analyticsErrorStatus: number | undefined;
  restaurantsCountErrorStatus: number | undefined;
}

export interface OrderTrendChartProps {
  data: OrdersTrendItem[];
  loading?: boolean;
  error?: number | undefined;
}
