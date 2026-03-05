import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

export const useRestaurantName = (restaurantId?: number) => {
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!restaurantId || isNaN(restaurantId)) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/admin/restaurants/${restaurantId}`);
        setRestaurantName(data.name);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  return { restaurantName, loading, error };
};
