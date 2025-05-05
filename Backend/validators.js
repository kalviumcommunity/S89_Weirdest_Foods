import { body, param, validationResult } from 'express-validator';

// Validation middleware to check for validation errors
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation error', 
      errors: errors.array() 
    });
  }
  next();
};

// Validation rules for creating a food item
export const createFoodValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('origin')
    .notEmpty().withMessage('Origin is required')
    .isString().withMessage('Origin must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Origin must be between 2 and 100 characters'),
  
  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string')
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  
  validateRequest
];

// Validation rules for updating a food item
export const updateFoodValidation = [
  param('id')
    .notEmpty().withMessage('ID is required')
    .isMongoId().withMessage('Invalid ID format'),
  
  body('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('origin')
    .optional()
    .isString().withMessage('Origin must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Origin must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  
  validateRequest
];

// Validation rules for deleting a food item
export const deleteFoodValidation = [
  param('id')
    .notEmpty().withMessage('ID is required')
    .isMongoId().withMessage('Invalid ID format'),
  
  validateRequest
];

// Validation rules for getting a food item by ID
export const getFoodValidation = [
  param('id')
    .notEmpty().withMessage('ID is required')
    .isMongoId().withMessage('Invalid ID format'),
  
  validateRequest
];
