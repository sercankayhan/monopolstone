import { Router } from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  refreshToken,
} from '../controllers/authController';
import {
  authenticate,
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from '../middleware';
import { body } from 'express-validator';

const router = Router();

router.post('/register', validateRegister, handleValidationErrors, register);

router.post('/login', validateLogin, handleValidationErrors, login);

router.get('/me', authenticate, getMe);

router.put(
  '/profile',
  authenticate,
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
  ],
  handleValidationErrors,
  updateProfile
);

router.put(
  '/change-password',
  authenticate,
  [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  ],
  handleValidationErrors,
  changePassword
);

router.post('/refresh-token', authenticate, refreshToken);

export default router;