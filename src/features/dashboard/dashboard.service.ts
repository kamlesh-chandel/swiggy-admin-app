import { api } from '@/lib/axios';
import type { UseDashboardReturn } from './dashboard.types';

export const getDashboardAnalytics = async (): Promise<UseDashboardReturn> => {
  const res = await api.get<UseDashboardReturn>('/dashboard/analytics');

  return res.data;
};

export const getRestaurantsCount = async (): Promise<number> => {
  const res = await api.get('/admin/restaurants');
  return res.data.total;
};
