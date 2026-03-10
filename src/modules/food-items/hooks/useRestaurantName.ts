import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { getApiErrorMessage } from '@/utils/api';
import type { ApiError } from '@/types/async-state';

export const useRestaurantName = (restaurantId?: number) => {
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    if (!restaurantId || isNaN(restaurantId)) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/admin/restaurants/${restaurantId}`);
        setRestaurantName(data.name);
      } catch (error) {
        setError(getApiErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  return { restaurantName, loading, error };
};
