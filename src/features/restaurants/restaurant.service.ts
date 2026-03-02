import { api } from '@/lib/axios';
import type { CreateRestaurantPayload, Restaurant } from './restaurant.types';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get('/admin/restaurants');
  return response.data.data;
};

export const getRestaurantById = async (id: number) => {
  const response = await api.get(`/admin/restaurants/${id}`);
  return response.data;
};

export const createRestaurant = async (
  payload: CreateRestaurantPayload,
): Promise<Restaurant> => {
  const { data } = await api.post<Restaurant>('/admin/restaurants', payload);
  return data;
};

export const updateRestaurant = async (
  id: number,
  payload: CreateRestaurantPayload,
): Promise<Restaurant> => {
  const { data } = await api.put<Restaurant>(
    `/admin/restaurants/${id}`,
    payload,
  );
  return data;
};

export const deleteRestaurant = async (id: number) => {
  await api.delete(`/admin/restaurants/${id}`);
};

export const updateRestaurantStatus = async (id: number, isActive: boolean) => {
  await api.patch(`/admin/restaurants/${id}/status`, {
    isActive,
  });
};
