import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { mapApiError } from '@/utils/api';
import type { ApiErrorType } from '@/types/async-state';

export const useRestaurantName = (restaurantId?: number) => {
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState<ApiErrorType>(null);

  useEffect(() => {
    if (!restaurantId || isNaN(restaurantId)) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/admin/restaurants/${restaurantId}`);
        setRestaurantName(data.name);
      } catch (error) {
        setErrorType(mapApiError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  return { restaurantName, loading, errorType };
};
