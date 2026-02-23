import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation, handleValidationErrors } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenant.js';

const router = Router();

/**
 * Public routes
 */
router.post('/register', registerValidation, handleValidationErrors, authController.register.bind(authController));
router.post('/login', loginValidation, handleValidationErrors, authController.login.bind(authController));

/**
 * Protected routes
 */
router.post('/refresh', tenantMiddleware, authController.refreshToken.bind(authController));
router.post('/logout', authMiddleware, authController.logout.bind(authController));
router.get('/profile', authMiddleware, authController.getProfile.bind(authController));

export default router;
