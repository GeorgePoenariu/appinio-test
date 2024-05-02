import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { validateEmail, validateFullName, validatePassword } from '../core';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateRegisterPayload = [validateFullName, validateEmail, validatePassword];

export const validateLoginPayload = [validateEmail, validatePassword];
