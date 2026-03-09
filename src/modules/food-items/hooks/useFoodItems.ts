import { useCallback, useEffect, useState } from 'react';
import {
  getFoodItemsByRestaurant,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
} from '../food-item.service';
import type {
  FoodItem,
  CreateFoodItemPayload,
  UseFoodItemsReturn,
} from '../food-item.types';
import type { ApiError } from '@/types/async-state';

import { getApiErrorMessage } from '@/utils/api';

export const useFoodItems = (restaurantId: number): UseFoodItemsReturn => {
  const [data, setData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchFoodItems = useCallback(async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);
      const response = await getFoodItemsByRestaurant(restaurantId);
      setData(response.data);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchFoodItems();
  }, [fetchFoodItems]);

  const handleCreate = async (payload: CreateFoodItemPayload) => {
    try {
      setCreateLoading(true);
      await createFoodItem(payload);
      await fetchFoodItems();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdate = async (id: number, payload: CreateFoodItemPayload) => {
    try {
      setUpdateLoading(true);
      await updateFoodItem(id, payload);
      await fetchFoodItems();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFoodItem(id);
      await fetchFoodItems();
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  return {
    data,
    loading,
    error,
    createLoading,
    updateLoading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
