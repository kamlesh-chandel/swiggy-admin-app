import { useState } from 'react';
import { getRestaurantById } from '../restaurant.service';

import type { RestaurantDetails } from '../restaurant.types';
import type { ApiError } from '@/types/async-state';

import { getApiErrorMessage } from '@/utils/api';

export const useRestaurantDetails = () => {
  const [data, setData] = useState<RestaurantDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  const fetchDetails = async (id: number) => {
    try {
      setLoading(true);
      const response = await getRestaurantById(id);
      setData(response);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchDetails };
};
