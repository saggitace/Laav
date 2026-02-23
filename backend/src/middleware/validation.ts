import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';

/**
 * Validation middleware - handles validation errors
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendError(res, 'Validation failed', 400, errors.array());
    return;
  }
  next();
};

/**
 * Auth validation schemas
 */
export const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain number'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),
  body('tenantName')
    .trim()
    .notEmpty()
    .withMessage('Tenant name is required'),
];

export const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

/**
 * School validation schemas
 */
export const createSchoolValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('School name is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .matches(/^[0-9\-\+\(\)\s]+$/)
    .withMessage('Valid phone number is required'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
];

/**
 * Student validation schemas
 */
export const createStudentValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Valid date of birth is required'),
  body('classId')
    .notEmpty()
    .withMessage('Class ID is required'),
];

/**
 * Class validation schemas
 */
export const createClassValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Class name is required'),
  body('academicYear')
    .matches(/^\d{4}-\d{4}$/)
    .withMessage('Academic year must be in format YYYY-YYYY'),
];

/**
 * Attendance validation schemas
 */
export const markAttendanceValidation = [
  body('classId')
    .notEmpty()
    .withMessage('Class ID is required'),
  body('date')
    .isISO8601()
    .withMessage('Valid date is required'),
  body('records')
    .isArray()
    .withMessage('Attendance records must be an array'),
  body('records.*.studentId')
    .notEmpty()
    .withMessage('Student ID is required'),
  body('records.*.status')
    .isIn(['present', 'absent', 'late', 'half-day'])
    .withMessage('Invalid attendance status'),
];

/**
 * Grade validation schemas
 */
export const submitGradeValidation = [
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required'),
  body('subjectId')
    .notEmpty()
    .withMessage('Subject ID is required'),
  body('marks')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Marks must be between 0 and 100'),
  body('gradeType')
    .isIn(['midterm', 'final', 'assignment', 'project'])
    .withMessage('Invalid grade type'),
];

/**
 * Fee validation schemas
 */
export const createFeeValidation = [
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('dueDate')
    .isISO8601()
    .withMessage('Valid due date is required'),
  body('feeType')
    .isIn(['tuition', 'transport', 'activity', 'other'])
    .withMessage('Invalid fee type'),
];

/**
 * Message validation schemas
 */
export const sendMessageValidation = [
  body('recipientId')
    .notEmpty()
    .withMessage('Recipient ID is required'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  body('body')
    .trim()
    .notEmpty()
    .withMessage('Message body is required'),
];
