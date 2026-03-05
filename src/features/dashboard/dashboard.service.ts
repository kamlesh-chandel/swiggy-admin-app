import { api } from '@/lib/axios';
import type { UseDashboardReturn } from './dashboard.types';

export const getDashboardAnalytics = async (): Promise<UseDashboardReturn> => {
  const response = await api.get<UseDashboardReturn>('/dashboard/analytics');

  return response.data;
};

export const getRestaurantsCount = async (): Promise<number> => {
  const response = await api.get('/admin/restaurants');
  return response.data.total;
};
