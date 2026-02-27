import { api } from '@/lib/axios';
import type { UseDashboardReturn } from './dashboard.types';

export const getDashboardAnalytics = async (): Promise<UseDashboardReturn> => {
  const res = await api.get<UseDashboardReturn>('/dashboard/analytics');

  return res.data;
};
