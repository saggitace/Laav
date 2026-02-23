import { Response } from 'express';
import { sendSuccess, sendError } from '../utils/response.js';
import { authService } from '../services/auth.service.js';
import { AuthRequest } from '../middleware/tenant.js';

export class AuthController {
  async register(req: any, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName, tenantName } = req.body;

      const result = await authService.registerTenant({
        email,
        password,
        firstName,
        lastName,
        tenantName,
      });

      sendSuccess(res, result, 'Registration successful', 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async login(req: any, res: Response): Promise<void> {
    try {
      const { email, password, tenantId } = req.body;

      if (!tenantId) {
        sendError(res, 'Tenant ID is required', 400);
        return;
      }

      const result = await authService.login(email, password, tenantId);
      sendSuccess(res, result, 'Login successful');
    } catch (error: any) {
      sendError(res, error.message, 401);
    }
  }

  async refreshToken(req: any, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const tenantId = req.tenantId;

      if (!refreshToken || !tenantId) {
        sendError(res, 'Refresh token and tenant ID are required', 400);
        return;
      }

      const result = await authService.verifyRefreshToken(refreshToken, tenantId);
      sendSuccess(res, result, 'Token refreshed');
    } catch (error: any) {
      sendError(res, error.message, 401);
    }
  }

  async logout(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const tenantId = req.tenantId;

      if (!userId || !tenantId) {
        sendError(res, 'User ID and tenant ID are required', 400);
        return;
      }

      await authService.logout(userId, tenantId);
      sendSuccess(res, {}, 'Logout successful');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getProfile(req: any, res: Response): Promise<void> {
    try {
      const user = req.user;

      if (!user) {
        sendError(res, 'User not authenticated', 401);
        return;
      }

      sendSuccess(res, user, 'Profile retrieved');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}

export const authController = new AuthController();
