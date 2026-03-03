import { useEffect, useState } from 'react';
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
import type { ApiErrorType } from '@/types/async-state';

import { mapApiError } from '@/utils/map-api-error';

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
  const [analyticsErrorType, setAnalyticsErrorType] =
    useState<ApiErrorType>(null);
  const [restaurantsCountErrorType, setRestaurantsCountErrorType] =
    useState<ApiErrorType>(null);

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
        setAnalyticsErrorType(mapApiError(error));
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
        setRestaurantsCountErrorType(mapApiError(error));
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
    analyticsErrorType,
    restaurantsCountErrorType,
  };
};
