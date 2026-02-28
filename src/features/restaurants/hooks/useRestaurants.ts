import { useEffect, useState } from 'react';
import {
  getRestaurants,
  deleteRestaurant,
  toggleRestaurantStatus,
} from '../restaurant.service';
import type { Restaurant } from '../restaurant.types';

export const useRestaurants = () => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getRestaurants();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteRestaurant(id);
    fetchData();
  };

  const handleToggle = async (id: number, isActive: boolean) => {
    await toggleRestaurantStatus(id, isActive);
    fetchData();
  };

  return {
    data,
    loading,
    handleDelete,
    handleToggle,
  };
};
