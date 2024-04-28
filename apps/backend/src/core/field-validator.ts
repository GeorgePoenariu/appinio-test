import { body } from 'express-validator';

export const validateEmail = body('email')
  .notEmpty()
  .withMessage('Email cannot be empty')
  .isEmail()
  .withMessage('Invalid email format')
  .normalizeEmail();

export const validatePassword = body('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .escape();

export const validateFullName = body('fullName')
  .notEmpty()
  .withMessage('FullName is required')
  .isLength({ min: 4 })
  .withMessage('FullName must be at least 4 characters long')
  .matches(/^([a-zA-Z]+ ?)+$/)
  .withMessage('FullName must contain one or more names separated by spaces')
  .trim()
  .escape();

export const validateArticle = body('article')
  .trim()
  .isLength({ min: 50 })
  .withMessage('Article must not be empty and contain at least 50 characters')
  .escape();
