import type { AxiosError } from 'axios';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { ApiErrorResponse } from '@/shared/api';
import { toastError } from 'snapflow-ui-kit/client';

type HandleServerErrorsOptions<T extends FieldValues> = {
  error: AxiosError<ApiErrorResponse>;
  setError: UseFormSetError<T>;
  serverErrorMap: Record<string, string>;
  knownFields: readonly Path<T>[];
};

/**
 * Handles server-side validation errors and maps them to form fields.
 *
 * This function processes API error responses from the `extensions` array
 * and sets appropriate field-level errors in React Hook Form.
 *
 * Behavior:
 * - Field errors matching `knownFields` are set on the corresponding form fields
 * - Errors for unknown fields (e.g., recoveryCode, expired tokens) are shown via toast with original server message
 * - Errors not present in `extensions` will be handled by the global error handler
 *
 * @template T - Form data type extending FieldValues
 * @param {HandleServerErrorsOptions<T>} options - Configuration object
 * @param {AxiosError<ApiErrorResponse>} options.error - Axios error object containing API response
 * @param {UseFormSetError<T>} options.setError - React Hook Form's setError function
 * @param {Record<string, string>} options.serverErrorMap - Map of server error messages to i18n keys
 * @param {readonly Path<T>[]} options.knownFields - Array of form field names that can receive errors
 *
 * @example
 * handleServerErrors({
 *   error: axiosError,
 *   setError,
 *   serverErrorMap: {
 *     'Minimum number of characters 6': 'Validation.password.min',
 *     'Email already exists': 'ServerErrors.emailExists',
 *   },
 *   knownFields: ['email', 'password', 'password_confirmation'],
 * });
 */
export const handleServerErrors = <T extends FieldValues>({
  error,
  setError,
  serverErrorMap,
  knownFields,
}: HandleServerErrorsOptions<T>) => {
  const errorData = error.response?.data;
  if (!errorData) return;

  // Handle field-specific errors from extensions
  // All other errors (including message field) should be handled by global error handler
  if (errorData.extensions?.length > 0) {
    errorData.extensions.forEach(({ field, message }) => {
      const formField = field as Path<T>;
      if (knownFields.includes(formField)) {
        setError(formField, {
          message: serverErrorMap[message] ?? message,
        });
      } else {
        // Show toast with original server message for unknown fields (e.g., recoveryCode, expired tokens)
        toastError(message);
      }
    });
  } else if (errorData.message) {
    // If extensions is empty, try to match message with known fields
    const messageLower = errorData.message.toLowerCase();
    for (const field of knownFields) {
      const fieldName = String(field).toLowerCase();
      // Check if message contains field name (case-insensitive)
      if (messageLower.includes(fieldName)) {
        setError(field, {
          message: serverErrorMap[errorData.message] ?? errorData.message,
        });
        return; // Set error only for the first matching field
      }
    }
  }
};
