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
}

export interface dashboardStatsProps {
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
  dashboardStats: dashboardStatsProps;
  ordersByStatus: OrdersByStatusItem[];
  topRestaurants: TopRestaurantItem[];
  ordersTrend: OrdersTrendItem[];
  analyticsLoading: boolean;
  restaurantsCountLoading: boolean;
}

export interface OrderTrendChartProps {
  data: OrdersTrendItem[];
  loading?: boolean;
}
