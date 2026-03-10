import axios from 'axios';
import type { ApiErrorType } from '@/types/async-state';

export const mapApiError = (error: unknown): ApiErrorType => {
  if (axios.isAxiosError(error)) {
    const errorCode = error.response?.data?.errorCode;

    if (errorCode === 'PERMISSION_DENIED') {
      return 'permission';
    }

    if (!error.response) {
      return 'network';
    }

    return 'server';
  }

  return 'server';
};
