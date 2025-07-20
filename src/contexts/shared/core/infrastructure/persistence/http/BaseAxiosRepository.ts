import { AxiosRepositoryError } from "@contexts/shared/core/infrastructure/persistence/http/AxiosRepositoryError";
import axios from "axios";

export abstract class BaseAxiosRepository {
  protected apiClient = axios.create({
    headers: { "Content-Type": "application/json" },
  });

  protected constructor(baseUrl: string) {
    this.apiClient.defaults.baseURL = baseUrl;
    this.apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  protected async request<T>(url: string, options?: object): Promise<T> {
    try {
      const response = await this.apiClient.request<T>({ url, ...options });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const error_type = error.response?.data?.type;

        throw new AxiosRepositoryError(error_type);
      }
      throw new Error("Unexpected error");
    }
  }
}
