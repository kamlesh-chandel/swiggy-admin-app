import { useState } from 'react';
import { getRestaurantById } from '../restaurant.service';

import type { RestaurantDetails } from '../restaurant.types';
import type { ApiErrorType } from '@/types/async-state';

import { mapApiError } from '@/utils/api';

export const useRestaurantDetails = () => {
  const [data, setData] = useState<RestaurantDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorType, setErrortype] = useState<ApiErrorType>(null);

  const fetchDetails = async (id: number) => {
    try {
      setLoading(true);
      const response = await getRestaurantById(id);
      setData(response);
    } catch (error) {
      setErrortype(mapApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, errorType, fetchDetails };
};
