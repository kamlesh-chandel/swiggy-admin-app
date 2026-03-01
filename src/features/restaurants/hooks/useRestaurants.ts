import { useEffect, useRef, useState } from 'react';
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

  const hasFetchedRef = useRef(false);

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
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
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
    handleDelete,
    handleToggle,
    handleCreate,
    createLoading,
    handleUpdate,
    updateLoading,
  };
};
