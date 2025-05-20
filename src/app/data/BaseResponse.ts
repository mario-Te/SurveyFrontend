export interface BaseResponseInterface<T> {
  message?: string;
  data?: T;
  error?: any;
  responseCode?: number;
  success?: boolean;
}

export class BaseResponse<T> {
  public message?: string;
  public data?: T;
  public error?: any;
  public responseCode?: number;
  public success?: boolean;
  constructor(object?: BaseResponseInterface<T>) {
    if (!object) {
      return this;
    }

    Object.entries(object).map(([key, value]) => {
      (this as any)[key] = value;
    });

    return this;
  }
}
