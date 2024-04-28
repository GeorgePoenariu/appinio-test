import { ValidationError } from 'express-validator';

export const handleApiError = (apiError: unknown) => {
  const error = (
    apiError as {
      response: { data: { errors: ValidationError[] } | { message: string } };
    }
  ).response.data;
  if (typeof error === 'string') {
    return error;
  }
  if ('message' in error) {
    return error.message;
  }
  if ('errors' in error && error.errors.length) {
    return error?.errors[0].msg;
  }
  return 'An error occurred while calling the API';
};
