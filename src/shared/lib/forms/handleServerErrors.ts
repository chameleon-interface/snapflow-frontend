import type { AxiosError } from 'axios';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { ApiErrorResponse } from '@/shared/api';

type HandleServerErrorsOptions<T extends FieldValues> = {
  error: AxiosError<ApiErrorResponse>;
  setError: UseFormSetError<T>;
  serverErrorMap: Record<string, string>;
  knownFields: readonly Path<T>[];
};

export const handleServerErrors = <T extends FieldValues>({
  error,
  setError,
  serverErrorMap,
  knownFields,
}: HandleServerErrorsOptions<T>) => {
  error.response?.data.errors.forEach(({ field, message }) => {
    const formField = field as Path<T>;
    if (knownFields.includes(formField)) {
      setError(formField, {
        message: serverErrorMap[message] ?? message,
      });
    }
  });
};
