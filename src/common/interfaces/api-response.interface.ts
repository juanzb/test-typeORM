export interface IResponseApi<T> {
  success: boolean;
  message: string;
  data?: T;
} 