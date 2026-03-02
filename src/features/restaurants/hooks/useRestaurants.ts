import { useEffect, useState } from 'react';
import {
  getRestaurants,
  deleteRestaurant,
  toggleRestaurantStatus,
  createRestaurant,
  updateRestaurant,
} from '../restaurant.service';
import type { Restaurant, CreateRestaurantPayload } from '../restaurant.types';

export const useRestaurants = () => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
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
      await toggleRestaurantStatus(id, isActive);
      await fetchData();
    } catch {
      setToggleError(true);
    }
  };

  const handleCreate = async (payload: CreateRestaurantPayload) => {
    try {
      setCreateLoading(true);
      await createRestaurant(payload);
      await fetchData();
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdate = async (id: number, payload: CreateRestaurantPayload) => {
    try {
      setUpdateLoading(true);
      await updateRestaurant(id, payload);
      await fetchData();
    } finally {
      setUpdateLoading(false);
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
    createLoading,
    handleUpdate,
    updateLoading,
    toggleError,
  };
};
