import { Axios } from '@/lib/axios';
import type { DashboardAnalyticsResponse } from '../types/dashboard.types';

export const getDashboardAnalytics =
  async (): Promise<DashboardAnalyticsResponse> => {
    const res = await Axios.get<DashboardAnalyticsResponse>(
      '/dashboard/analytics',
    );

    return res.data;
  };
