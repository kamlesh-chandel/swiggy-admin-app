import { useEffect, useState } from 'react';
import {
  getRestaurants,
  deleteRestaurant,
  updateRestaurantStatus,
} from '../restaurant.service';
import type { Restaurant } from '../restaurant.types';

export const useRestaurants = () => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [toggleError, setToggleError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getRestaurants();
      setData(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteRestaurant(id);
      await fetchData();
    } catch {
      setDeleteError(true);
    }
  };

  const handleToggle = async (id: number, isActive: boolean) => {
    try {
      await updateRestaurantStatus(id, isActive);
      await fetchData();
    } catch {
      setToggleError(true);
    }
  };

  return {
    data,
    loading,
    error,
    handleDelete,
    deleteError,
    handleToggle,
    toggleError,
  };
};
