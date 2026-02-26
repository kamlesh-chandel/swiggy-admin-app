import type { ReactNode } from 'react';

export interface DashboardOverview {
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

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalRestaurants: number;
  totalCustomers: number;
}

export interface OrdersStatusItem {
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
  stats: DashboardStats | null;
  ordersStatus: OrdersStatusItem[];
  topRestaurants: { name: string; revenue: number }[];
  ordersTrend: OrdersTrendItem[];
  loading: boolean;
}

export interface OrdersTrendChartProps {
  data: OrdersTrendItem[];
  loading?: boolean;
}
