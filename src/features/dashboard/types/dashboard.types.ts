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

export interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
}

export interface OrdersStatusItem {
  status: string;
  value: number;
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

export interface DashboardAnalyticsResponse {
  stats: DashboardStats;
  ordersByStatus: OrdersStatusItem[];
}

export interface UseDashboardReturn {
  stats: DashboardStats | null;
  ordersStatus: OrdersStatusItem[];
  loading: boolean;
}
