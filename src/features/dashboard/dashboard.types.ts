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
  dashboardStats: dashboardStatsProps | null;
  ordersByStatus: OrdersByStatusItem[];
  topRestaurants: { name: string; revenue: number }[];
  ordersTrend: OrdersTrendItem[];
  loading: boolean;
}

export interface OrderTrendChartProps {
  data: OrdersTrendItem[];
  loading?: boolean;
}
