import type { AsyncStateProps, ApiErrorType } from '@/types/async-state';
import type { ReactNode } from 'react';

export interface StatCardProps {
  totalOrders: number;
  totalRevenue: number;
  totalRestaurants: number;
  totalCustomers: number;
}

export interface OrdersByStatusItem {
  status: string;
  value: number;
}

export interface OrderStatusChartProps extends AsyncStateProps {
  data: OrdersByStatusItem[];
}

export interface StatCardConfig extends AsyncStateProps {
  title: string;
  value: number | string;
  icon: ReactNode;
}

export interface DashboardStatsProps {
  totalOrders: number;
  totalRevenue: number;
  totalRestaurants: number;
  totalCustomers: number;
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
  analyticsErrorType: ApiErrorType;
  restaurantsCountErrorType: ApiErrorType;
}

export interface OrderTrendChartProps extends AsyncStateProps {
  data: OrdersTrendItem[];
}
