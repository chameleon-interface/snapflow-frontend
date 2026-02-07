import { AxiosError } from 'axios';

type FieldError = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  code: string;
  message: string;
  errors: FieldError[];
};

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiErrorResponse>;
  }
}
