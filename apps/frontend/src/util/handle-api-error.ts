import { IApiError } from './interface';

export const handleApiError = (apiError: IApiError) => {
  const error = apiError.response.data;

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
