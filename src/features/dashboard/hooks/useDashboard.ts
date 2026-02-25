import { useEffect, useState } from 'react';
import { getDashboardAnalytics } from '../services/dashboard.service';

import type {
  UseDashboardReturn,
  DashboardStats,
  OrdersStatusItem,
} from '../types/dashboard.types';

export const useDashboard = (): UseDashboardReturn => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [ordersStatus, setOrdersStatus] = useState<OrdersStatusItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getDashboardAnalytics();

        setStats(res.stats);
        setOrdersStatus(res.ordersByStatus);
      } catch (error) {
        console.error('Dashboard analytics error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return {
    stats,
    ordersStatus,
    loading,
  };
};
