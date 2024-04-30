import { ValidationError } from 'express-validator';

export interface IApiError {
  response: {
    data: string | IExpressValidatorError | IDefaultApiError;
  };
}

interface IExpressValidatorError {
  errors: ValidationError[];
}

interface IDefaultApiError {
  message: string;
}
