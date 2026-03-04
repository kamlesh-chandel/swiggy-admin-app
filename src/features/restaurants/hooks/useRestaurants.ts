import { useEffect, useState } from 'react';
import {
  getRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  updateRestaurantStatus,
} from '../restaurant.service';

import type { ApiErrorType } from '@/types/async-state';

import { mapApiError } from '@/utils/map-api-error';
import type {
  Restaurant,
  CreateRestaurantPayloadProps,
} from '../restaurant.types';

export const useRestaurants = () => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState<ApiErrorType>(null);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [toggleError, setToggleError] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getRestaurants();
      setData(response);
    } catch (error) {
      setErrorType(mapApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteRestaurant(id);

      if (response.status === 200) {
        setData((prev) => prev.filter((restaurant) => restaurant.id !== id));
      }

      return response;
    } catch {
      setDeleteError(true);
      return null;
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

  const handleCreate = async (payload: CreateRestaurantPayloadProps) => {
    setMutationLoading(true);

    try {
      const response = await createRestaurant(payload);

      if (response.status === 201) {
        setData((prev) => [response.data.data, ...prev]);
      }

      return response;
    } catch (error) {
      setErrorType(mapApiError(error));
      return null;
    } finally {
      setMutationLoading(false);
    }
  };

  const handleUpdate = async (
    id: number,
    payload: CreateRestaurantPayloadProps,
  ) => {
    setMutationLoading(true);

    try {
      const response = await updateRestaurant(id, payload);

      if (response.status === 200) {
        setData((prev) =>
          prev.map((restaurant) =>
            restaurant.id === id ? response.data.data : restaurant,
          ),
        );
      }

      return response;
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
    errorType,
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
