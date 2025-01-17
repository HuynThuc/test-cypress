import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  AxiosRequestHeaders,
} from 'axios';

import { BASE_URL } from '@/shared/constants';
import { cookiesService } from '@/shared/services/cookies.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServerRequestConfig<D = any> = InternalAxiosRequestConfig<D> & {
  headers?: AxiosRequestHeaders;
  requireAuth?: boolean;
};
export class ApiServerImpl {
  private readonly apiCaller: AxiosInstance;

  constructor(baseURL: string) {
    this.apiCaller = axios.create({
      baseURL,
      timeout: 70000,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });

    this.apiCaller.interceptors.request.use(this.createRequestInterceptor);
    this.apiCaller.interceptors.response.use(
      (res) => res,
      this.createErrorResponseInterceptor(),
    );
  }

  // Request interceptor to handle authentication
  private createRequestInterceptor = async (
    config: ServerRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    config.headers = config.headers || new AxiosHeaders();

    if (config.requireAuth) {
      const authSession = await cookiesService.getSession();
      config.headers.set(
        'Authorization',
        `Bearer ${authSession?.authorization.accessToken}`,
      );
    }

    return config;
  };

  private createErrorResponseInterceptor = () => async (error: AxiosError) => {
    if (error.response) {
      return Promise.reject({
        status: error.response.status || 401,
        error: error.response.statusText,
        data: null,
      });
    }
    return Promise.reject({ status: 500, error: error.message, data: null });
  };

  // HTTP GET request

  async get<T = unknown, D = unknown>(
    url: string,
    config?: ServerRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return await this.apiCaller.get<T, AxiosResponse<T>, D>(url, config);
  }

  // HTTP POST request
  async post<T = unknown, D = unknown>(
    url: string,
    body?: D,
    config?: ServerRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return await this.apiCaller.post<T, AxiosResponse<T>, D>(url, body, config);
  }

  // HTTP PUT request
  async put<T = unknown, D = unknown>(
    url: string,
    body: D,
    config?: ServerRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return await this.apiCaller.put<T, AxiosResponse<T>, D>(url, body, config);
  }

  // HTTP PATCH request
  async patch<T = unknown, D = unknown>(
    url: string,
    body?: D,
    config?: ServerRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return await this.apiCaller.patch<T, AxiosResponse<T>, D>(
      url,
      body,
      config,
    );
  }

  // HTTP DELETE request
  async delete<T = unknown, D = unknown>(
    url: string,
    config?: ServerRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    return await this.apiCaller.delete<T, AxiosResponse<T>, D>(url, config);
  }
}

// Export an instance of the API server
export const apiServer = new ApiServerImpl(BASE_URL);
