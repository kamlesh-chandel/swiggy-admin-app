import { api } from '@/lib/axios';
import type {
  CreateRestaurantPayloadProps,
  Restaurant,
  ApiResponse,
} from './restaurant.types';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get('/admin/restaurants');
  return response.data.data;
};

export const getRestaurantById = async (id: number) => {
  const response = await api.get(`/admin/restaurants/${id}`);
  return response.data;
};

export const createRestaurant = async (
  payload: CreateRestaurantPayloadProps,
) => {
  return api.post<ApiResponse<Restaurant>>('/admin/restaurants', payload);
};

export const updateRestaurant = async (
  id: number,
  payload: CreateRestaurantPayloadProps,
) => {
  return api.put<ApiResponse<Restaurant>>(`/admin/restaurants/${id}`, payload);
};

export const deleteRestaurant = async (id: number) => {
  return api.delete<ApiResponse<{ id: number }>>(`/admin/restaurants/${id}`);
};

export const updateRestaurantStatus = async (id: number, isActive: boolean) => {
  return api.patch(`/admin/restaurants/${id}/status`, { isActive });
};
