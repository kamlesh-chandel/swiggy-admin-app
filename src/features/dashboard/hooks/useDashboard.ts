import { useEffect, useState } from 'react';
import { getDashboardAnalytics } from '../services/dashboard.service';

import type {
  UseDashboardReturn,
  DashboardStats,
  OrdersByStatusItem,
  TopRestaurantItem,
  OrdersTrendItem,
} from '../types/dashboard.types';

export const useDashboard = (): UseDashboardReturn => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [ordersByStatus, setOrdersByStatus] = useState<OrdersByStatusItem[]>(
    [],
  );
  const [topRestaurants, setTopRestaurants] = useState<TopRestaurantItem[]>([]);
  const [ordersTrend, setOrdersTrend] = useState<OrdersTrendItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getDashboardAnalytics();

        setStats(res.stats);
        setOrdersByStatus(res.ordersByStatus);
        setTopRestaurants(res.topRestaurants);
        setOrdersTrend(res.ordersTrend);
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
    ordersByStatus,
    topRestaurants,
    ordersTrend,
    loading,
  };
};
