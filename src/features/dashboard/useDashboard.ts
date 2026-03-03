import { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [analyticsErrorStatus, setAnalyticsErrorStatus] = useState<
    number | undefined
  >();
  const [restaurantsCountErrorStatus, setRestaurantsCountErrorStatus] =
    useState<number | undefined>();
  useEffect(() => {
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
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setAnalyticsErrorStatus(error.response?.status);
        }
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
        if (axios.isAxiosError(error)) {
          setRestaurantsCountErrorStatus(error.response?.status);
        }
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
    analyticsErrorStatus,
    restaurantsCountErrorStatus,
  };
};
