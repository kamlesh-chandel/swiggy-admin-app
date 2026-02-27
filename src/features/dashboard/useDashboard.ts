import { useEffect, useState } from 'react';
import { getDashboardAnalytics } from './dashboard.service';

import type {
  UseDashboardReturn,
  OrdersByStatusItem,
  TopRestaurantItem,
  OrdersTrendItem,
  dashboardStatsProps,
} from './dashboard.types';

export const useDashboard = (): UseDashboardReturn => {
  const [dashboardStats, setDashboardStats] =
    useState<dashboardStatsProps | null>(null);
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

        setDashboardStats(res.dashboardStats);
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
    dashboardStats,
    ordersByStatus,
    topRestaurants,
    ordersTrend,
    loading,
  };
};
