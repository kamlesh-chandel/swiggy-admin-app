import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/axios';

export const useRestaurantName = (restaurantId?: number) => {
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    if (!restaurantId || isNaN(restaurantId)) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/admin/restaurants/${restaurantId}`);
        setRestaurantName(data.name);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  return { restaurantName, loading };
};
