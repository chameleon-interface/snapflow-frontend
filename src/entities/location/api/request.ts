import axios from 'axios';
import type { LocationsResponse } from './types';

const DEFAULT_ERROR_MESSAGE = 'Failed to load locations';

export const loadLocations = async <T>(
  searchParams: URLSearchParams,
  signal?: AbortSignal,
): Promise<T[]> => {
  try {
    const response = await axios.get<LocationsResponse<T>>('/api/locations', {
      params: searchParams,
      signal,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
      throw error;
    }

    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
