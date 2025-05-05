import { body } from 'express-validator';
import { validateRequest } from './validators.js';

// Validation rules for user registration
export const registerValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isString().withMessage('Username must be a string')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    .trim(),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number'),
  
  validateRequest
];

// Validation rules for user login
export const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  validateRequest
];
