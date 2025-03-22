import {IResponseApi} from "../interfaces/api-response.interface";

export class ResponseApi<T> implements IResponseApi<T> {
  success: boolean;
  message: string;
  data?: T | undefined;
}