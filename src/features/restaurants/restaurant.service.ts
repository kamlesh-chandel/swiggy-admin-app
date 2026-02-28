import { api } from '@/lib/axios';
import type { Restaurant } from './restaurant.types';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get('/admin/restaurants');
  return response.data.data;
};

export const getRestaurantById = async (id: number) => {
  const response = await api.get(`/admin/restaurants/${id}`);
  return response.data;
};

export const deleteRestaurant = async (id: number) => {
  await api.delete(`/admin/restaurants/${id}`);
};

export const toggleRestaurantStatus = async (id: number, isActive: boolean) => {
  await api.patch(`/admin/restaurants/${id}/status`, {
    isActive,
  });
};
