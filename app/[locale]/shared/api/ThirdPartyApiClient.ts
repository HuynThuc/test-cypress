import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_3RD_URL } from '../constants';

export type ThirdPartyClientRequestConfig<D> = AxiosRequestConfig<D>;

export class ThirdPartyApiClientImpl {
  private readonly apiCaller: AxiosInstance;

  constructor(baseURL: string) {
    this.apiCaller = axios.create({
      baseURL,
      timeout: 50000,
    });
  }

  async get<T = unknown, D = unknown>(
    url: string,
    config?: ThirdPartyClientRequestConfig<D>,
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
    config?: ThirdPartyClientRequestConfig<D>,
  ): Promise<T> {
    const response = await this.apiCaller.post<T, AxiosResponse<T>, D>(
      url,
      body,
      config,
    );

    return response.data;
  }

  async put<T = unknown, D = unknown>(
    url: string,
    body: D,
    config?: ThirdPartyClientRequestConfig<D>,
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
    config?: ThirdPartyClientRequestConfig<D>,
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
    config?: ThirdPartyClientRequestConfig<D>,
  ): Promise<T> {
    const response = await this.apiCaller.delete<T, AxiosResponse<T>, D>(
      url,
      config,
    );

    return response.data;
  }
}

export const thirdPartyApiClient = new ThirdPartyApiClientImpl(BASE_3RD_URL);
