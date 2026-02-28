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
  DashboardStatsProps,
} from './dashboard.types';

export const useDashboard = (): UseDashboardReturn => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStatsProps>({
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
  const [analyticsError, setAnalyticsError] = useState(false);
  const [restaurantsCountError, setRestaurantsCountError] = useState(false);

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    const fetchAnalytics = async () => {
      try {
        const analyticsData = await getDashboardAnalytics();

        setDashboardStats((prev) => ({
          ...prev,
          ...analyticsData.dashboardStats,
        }));

        setOrdersByStatus(analyticsData.ordersByStatus);
        setTopRestaurants(analyticsData.topRestaurants);
        setOrdersTrend(analyticsData.ordersTrend);
      } catch {
        setAnalyticsError(true);
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
      } catch {
        setRestaurantsCountError(true);
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
    analyticsError,
    restaurantsCountError,
  };
};
