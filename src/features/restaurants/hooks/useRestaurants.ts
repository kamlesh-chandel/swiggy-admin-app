import { useEffect, useState } from 'react';
import {
  getRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  updateRestaurantStatus,
} from '../restaurant.service';
import type {
  Restaurant,
  CreateRestaurantPayloadProps,
} from '../restaurant.types';

export const useRestaurants = () => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [toggleError, setToggleError] = useState(false);
  const [updateError, setUpdateError] = useState(false);

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

  const handleDelete = async (id: number): Promise<boolean> => {
    try {
      await deleteRestaurant(id);

      setData((prev) => prev.filter((restaurant) => restaurant.id !== id));

      return true;
    } catch {
      setDeleteError(true);
      return false;
    }
  };

  const handleToggle = async (id: number, isActive: boolean) => {
    try {
      await updateRestaurantStatus(id, isActive);
      setData((prev) =>
        prev.map((restaurant) =>
          restaurant.id === id ? { ...restaurant, isActive } : restaurant,
        ),
      );
    } catch {
      setToggleError(true);
    }
  };

  const handleCreate = async (
    payload: CreateRestaurantPayloadProps,
  ): Promise<Restaurant | null> => {
    setMutationLoading(true);

    try {
      const newRestaurant = await createRestaurant(payload);
      setData((prev) => [newRestaurant, ...prev]);

      return newRestaurant;
    } catch {
      setError(true);
      return null;
    } finally {
      setMutationLoading(false);
    }
  };

  const handleUpdate = async (
    id: number,
    payload: CreateRestaurantPayloadProps,
  ): Promise<Restaurant | null> => {
    setMutationLoading(true);

    try {
      const updatedRestaurant = await updateRestaurant(id, payload);

      setData((prev) =>
        prev.map((restaurant) =>
          restaurant.id === id ? updatedRestaurant : restaurant,
        ),
      );

      return updatedRestaurant;
    } catch {
      setUpdateError(true);
      return null;
    } finally {
      setMutationLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    handleDelete,
    deleteError,
    handleToggle,
    handleCreate,
    handleUpdate,
    updateError,
    mutationLoading,
    toggleError,
  };
};
