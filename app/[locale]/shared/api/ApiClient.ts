/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

import { BASE_URL } from '@/shared/constants';

import { openDialog } from '@/modules/learners/store/slice/pricing/pricingDialogSlice';

export type ClientRequestConfig<D> = AxiosRequestConfig<D>;

export class ApiClientImpl {
  private readonly apiCaller: AxiosInstance;
  private dispatch: Dispatch | null = null;

  constructor(baseURL: string) {
    this.apiCaller = axios.create({
      baseURL,
      timeout: 50000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.apiCaller.interceptors.request.use(
      this.createRequestInterceptor() as AxiosInstance,
    );
    this.apiCaller.interceptors.response.use(
      (res) => this.handleKeyError(res),
      this.createErrorResponseInterceptor(),
    );
  }

  setDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  private handleKeyError = (res: AxiosResponse<any, any>) => {
    if (res.data && res.data.code === 403 && res.data.error === 'Forbidden') {
      this.dispatch && this.dispatch(openDialog());
    }
    return res;
  };

  private createRequestInterceptor = () => {
    return (config: AxiosRequestConfig) => {
      const detectPathName = window.location.pathname;

      if (config.headers) {
        if (detectPathName !== '/signin')
          config.headers['Authorization'] =
            `Bearer ${window?.localStorage.getItem('AccessToken')}`;
      }

      return config;
    };
  };

  private createErrorResponseInterceptor = () => {
    return async (error: AxiosError) => {
      return Promise.reject(error);
    };
  };

  async get<T = unknown, D = unknown>(
    url: string,
    config?: ClientRequestConfig<D>,
  ): Promise<T> {
    const response = await this.apiCaller.get<T, AxiosResponse<T>, D>(
      url,
      config,
    );

    return response.data;
  }

  async post<T = unknown, D = unknown>(
    url: string,
    body?: D,
    config?: ClientRequestConfig<D>,
  ): Promise<T> {
    try {
      const response = await this.apiCaller.post<T, AxiosResponse<T>, D>(
        url,
        body,
        config,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as T;
      }
      throw error;
    }
  }

  async put<T = unknown, D = unknown>(
    url: string,
    body: D,
    config?: ClientRequestConfig<D>,
  ): Promise<T> {
    const response = await this.apiCaller.put<T, AxiosResponse<T>, D>(
      url,
      body,
      config,
    );

    return response.data;
  }

  async patch<T = unknown, D = unknown>(
    url: string,
    body?: D,
    config?: ClientRequestConfig<D>,
  ): Promise<T> {
    const response = await this.apiCaller.patch<T, AxiosResponse<T>, D>(
      url,
      body,
      config,
    );

    return response.data;
  }

  async delete<T = unknown, D = unknown>(
    url: string,
    config?: ClientRequestConfig<D>,
  ): Promise<T> {
    const response = await this.apiCaller.delete<T, AxiosResponse<T>, D>(
      url,
      config,
    );

    return response.data;
  }
}

export const apiClient = new ApiClientImpl(BASE_URL);
