import { AxiosError } from 'axios';

type FieldError = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  timestamp: string;
  path: string;
  method: string;
  code: string;
  message: string;
  extensions: FieldError[];
};

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiErrorResponse>;
  }
}
