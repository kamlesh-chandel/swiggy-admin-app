import { api } from '@/lib/axios';
import type {
  GetFoodItemsResponse,
  CreateFoodItemPayload,
  FoodItem,
} from './food-item.types';

export const getFoodItemsByRestaurant = async (
  restaurantId: number,
): Promise<GetFoodItemsResponse> => {
  const { data } = await api.get<GetFoodItemsResponse>(
    `/admin/restaurants/${restaurantId}/food-items`,
  );

  return data;
};

export const getFoodItemById = async (id: number): Promise<FoodItem> => {
  const { data } = await api.get<FoodItem>(`/admin/food-items/${id}`);

  return data;
};

export const createFoodItem = async (payload: CreateFoodItemPayload) => {
  const { data } = await api.post(`/admin/food-items`, payload);

  return data;
};

export const updateFoodItem = async (
  id: number,
  payload: CreateFoodItemPayload,
) => {
  const { data } = await api.put(`/admin/food-items/${id}`, payload);

  return data;
};

export const deleteFoodItem = async (id: number) => {
  const { data } = await api.delete(`/admin/food-items/${id}`);

  return data;
};

export const uploadFoodItemImage = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);

  const { data } = await api.post(`/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
