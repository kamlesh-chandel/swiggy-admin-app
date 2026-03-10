import type { ApiError } from '@/types/async-state';

export interface FoodItemImage {
  id: number;
  url: string;
}

interface FoodItemRestaurant {
  id: number;
  name: string;
}

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  description: string;
  createdAt: string;
  restaurant: FoodItemRestaurant;
  image: FoodItemImage | null;
}

export interface GetFoodItemsResponse {
  data: FoodItem[];
  total: number;
}

export interface CreateFoodItemPayload {
  name: string;
  price: number;
  description: string;
  restaurant: number;
  image: number;
}

export interface UseFoodItemsReturn {
  data: FoodItem[];
  loading: boolean;
  error: ApiError;
  createLoading: boolean;
  updateLoading: boolean;
  handleCreate: (payload: CreateFoodItemPayload) => Promise<void>;
  handleUpdate: (id: number, payload: CreateFoodItemPayload) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

export interface FoodItemValues {
  name: string;
  price: string;
  description: string;
  image?: File | { id: number; url: string } | null;
}

export interface FoodItemFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateFoodItemPayload) => Promise<void>;
  mode: 'create' | 'edit';
  loading: boolean;
  initialValues?: FoodItemValues;
  restaurantId: number;
}
