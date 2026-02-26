import { api } from '@/lib/axios';
import type { UseDashboardReturn } from '../types/dashboard.types';

export const getDashboardAnalytics = async (): Promise<UseDashboardReturn> => {
  const res = await api.get<UseDashboardReturn>('/dashboard/analytics');

  return res.data;
};
