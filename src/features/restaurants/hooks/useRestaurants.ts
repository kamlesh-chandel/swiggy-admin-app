import { useEffect, useState } from 'react';
import {
  getRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  updateRestaurantStatus,
} from '../restaurant.service';

import type { Restaurant, CreateRestaurantPayload } from '../restaurant.types';
import type { ApiErrorType } from '@/types/async-state';

import { mapApiError } from '@/utils/map-api-error';

export const useRestaurants = () => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorType, setErrorType] = useState<ApiErrorType>(null);
  const [deleteError, setDeleteError] = useState(false);
  const [toggleError, setToggleError] = useState(false);

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
    errorType,
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
