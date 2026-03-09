import axios from 'axios';
import type { ApiError } from '@/types/async-state';

export const getApiErrorMessage = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Network error. Please check your internet connection.';
    }

    return error.response.data?.message || 'Something went wrong';
  }

  return 'Something went wrong';
};
