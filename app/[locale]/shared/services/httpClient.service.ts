/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';

import { apiServer, ServerRequestConfig } from '@/shared/api';
import { ApiResponse2 } from '@/shared/types';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';

// Create a function to handle errors from the API
const handleApiError = <T>(error: AxiosError | any): ApiResponse2<T> => {
  if (error) {
    // Extract error information from response
    const errorCode = error.error || ErrorConstants.ErrClientPageNotFound;
    // Handle specific HTTP error codes
    if (error.status === 401) {
      // Example: Handle token expiration
    }

    return {
      code: error.code || error.status || 500,
      success: false,
      error: errorCode,
      data: null,
    };
  }

  // Network or other unexpected errors
  return {
    code: 500,
    success: false,
    error:
      error instanceof Error
        ? error.message
        : ErrorConstants.ErrClientNoInternet,
    data: null,
  };
};

// Example for token-specific error handling
const apiRequest = async <T>(
  promise: Promise<AxiosResponse<T>>,
): Promise<ApiResponse2<T>> => {
  try {
    const response = await promise;

    if (response.status === 200) {
      return {
        code: response.status,
        success: true,
        error: '',
        data: response.data,
      };
    }
    return handleApiError<T>(response);
  } catch (error) {
    const handledError = handleApiError<T>(error);

    // Example: Specific handling for ACCESS_TOKEN_HAS_EXPIRED
    if (
      handledError.code === 401 &&
      handledError.error === ErrorConstants.ErrExpiredToken
    ) {
      // Logic to refresh the token or log the user out can be added here
    }

    return handledError;
  }
};

// API methods (GET, POST, PUT, DELETE)
export const apiService = {
  get: <T>(
    url: string,
    config?: ServerRequestConfig,
  ): Promise<ApiResponse2<T>> => {
    const requestConfig: ServerRequestConfig = {
      ...config,
      headers: config?.headers || new axios.AxiosHeaders(),
    };
    return apiRequest(apiServer.get<T>(url, requestConfig));
  },
  post: <T>(
    url: string,
    data: object,
    config?: ServerRequestConfig,
  ): Promise<ApiResponse2<T>> => {
    const requestConfig: ServerRequestConfig = {
      ...config,
      headers: config?.headers || new axios.AxiosHeaders(),
    };
    return apiRequest(apiServer.post<T>(url, data, requestConfig));
  },
  put: <T>(
    url: string,
    data: object,
    config?: ServerRequestConfig,
  ): Promise<ApiResponse2<T>> => {
    const requestConfig: ServerRequestConfig = {
      ...config,
      headers: config?.headers || new axios.AxiosHeaders(),
    };
    return apiRequest(apiServer.put<T>(url, data, requestConfig));
  },
  delete: <T>(
    url: string,
    config?: ServerRequestConfig,
  ): Promise<ApiResponse2<T>> => {
    const requestConfig: ServerRequestConfig = {
      ...config,
      headers: config?.headers || new axios.AxiosHeaders(),
    };
    return apiRequest(apiServer.delete<T>(url, requestConfig));
  },
};
