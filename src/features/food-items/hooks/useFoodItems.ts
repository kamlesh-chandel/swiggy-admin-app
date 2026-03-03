import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
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

export const useFoodItems = (restaurantId: number): UseFoodItemsReturn => {
  const [data, setData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchFoodItems = useCallback(async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);
      const response = await getFoodItemsByRestaurant(restaurantId);
      setData(response.data);
    } catch (error) {
      if (!axios.isAxiosError(error)) return;
      const status = error.response?.status;
      if (status === 403) {
        setErrorStatus(403);
      }
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
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdate = async (id: number, payload: CreateFoodItemPayload) => {
    try {
      setUpdateLoading(true);
      await updateFoodItem(id, payload);
      await fetchFoodItems();
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteFoodItem(id);
    await fetchFoodItems();
  };

  return {
    data,
    loading,
    errorStatus,
    createLoading,
    updateLoading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
