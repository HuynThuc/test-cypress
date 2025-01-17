import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { BASE_URL } from '../constants';
import { ClientRequestConfig } from '.';

export class PythonApiClientImpl {
  private readonly apiCaller: AxiosInstance;

  constructor(baseURL: string) {
    this.apiCaller = axios.create({
      baseURL,
      timeout: 50000,
    });

    this.apiCaller.interceptors.request.use(
      this.createRequestInterceptor() as AxiosInstance,
    );
    this.apiCaller.interceptors.response.use(
      (res) => res,
      this.createErrorResponseInterceptor(),
    );
  }

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
      // TODO: Handle on error
      // if (error.response?.status === ResponseCode.UNAUTHORIZED) {
      //   // handleLogout();
      // }
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

export const pythonApiClient = new PythonApiClientImpl(BASE_URL);
