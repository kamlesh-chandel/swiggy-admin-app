import { useState } from 'react';
import { getRestaurantById } from '../restaurant.service';
import type { RestaurantDetails } from '../restaurant.types';

export const useRestaurantDetails = () => {
  const [data, setData] = useState<RestaurantDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async (id: number) => {
    try {
      setLoading(true);
      const res = await getRestaurantById(id);
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchDetails };
};
