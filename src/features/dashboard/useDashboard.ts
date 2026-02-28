import { useEffect, useState, useRef } from 'react';
import {
  getDashboardAnalytics,
  getRestaurantsCount,
} from './dashboard.service';

import type {
  UseDashboardReturn,
  OrdersByStatusItem,
  TopRestaurantItem,
  OrdersTrendItem,
  dashboardStatsProps,
} from './dashboard.types';

export const useDashboard = (): UseDashboardReturn => {
  const [dashboardStats, setDashboardStats] = useState<dashboardStatsProps>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalRestaurants: 0,
  });
  const [ordersByStatus, setOrdersByStatus] = useState<OrdersByStatusItem[]>(
    [],
  );
  const [topRestaurants, setTopRestaurants] = useState<TopRestaurantItem[]>([]);
  const [ordersTrend, setOrdersTrend] = useState<OrdersTrendItem[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [restaurantsCountLoading, setRestaurantsCountLoading] = useState(true);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchAnalytics = async () => {
      try {
        const res = await getDashboardAnalytics();

        setDashboardStats((prev) => ({
          ...prev,
          ...res.dashboardStats,
        }));

        setOrdersByStatus(res.ordersByStatus);
        setTopRestaurants(res.topRestaurants);
        setOrdersTrend(res.ordersTrend);
      } catch (error) {
        console.error('Dashboard analytics error:', error);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    const fetchRestaurantsCount = async () => {
      try {
        const count = await getRestaurantsCount();

        setDashboardStats((prev) => ({
          ...prev,
          totalRestaurants: count,
        }));
      } catch (error) {
        console.error('Restaurant count error:', error);
      } finally {
        setRestaurantsCountLoading(false);
      }
    };

    fetchAnalytics();
    fetchRestaurantsCount();
  }, []);

  return {
    dashboardStats,
    ordersByStatus,
    topRestaurants,
    ordersTrend,
    analyticsLoading,
    restaurantsCountLoading,
  };
};
