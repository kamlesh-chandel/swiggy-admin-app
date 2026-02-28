export interface Restaurant {
  id: number;
  name: string;
  address: string;
  city: string;
  rating: number;
  isActive: boolean;
  totalOrders: number;
  totalRevenue: number;
  createdAt: string;
}

interface FoodItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface RestaurantAnalytics {
  totalOrders: number;
  totalRevenue: number;
}

export interface RestaurantDetails {
  id: number;
  name: string;
  address: string;
  city: string;
  rating: number;
  isActive: boolean;
  createdAt: string;

  analytics: RestaurantAnalytics;
  foodItems: FoodItem[];
}
