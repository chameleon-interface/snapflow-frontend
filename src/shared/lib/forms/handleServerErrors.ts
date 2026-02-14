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
  const errorData = error.response?.data;
  if (!errorData) return;

  // Обрабатываем ошибки из extensions
  if (errorData.extensions && errorData.extensions.length > 0) {
    errorData.extensions.forEach(({ field, message }) => {
      const formField = field as Path<T>;
      if (knownFields.includes(formField)) {
        setError(formField, {
          message: serverErrorMap[message] ?? message,
        });
      }
    });
    return;
  }

  // Если extensions пустой или отсутствует, проверяем message
  if (errorData.message && serverErrorMap[errorData.message] && knownFields.length > 0) {
    const formField = knownFields[0] as Path<T>;
    setError(formField, {
      message: serverErrorMap[errorData.message],
    });
  }
};
