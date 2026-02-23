import { Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { verifyAccessToken, JWTPayload } from '../utils/jwt';
import { AuthRequest } from './tenant';

/**
 * Verify JWT token and extract user info
 */
export const authMiddleware = (req: any, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      sendError(res, 'No authentication token provided', 401);
      return;
    }

    const decoded = verifyAccessToken(token);
    
    req.user = {
      id: decoded.id,
      tenantId: decoded.tenantId,
      email: decoded.email,
      role: decoded.role,
    };

    req.tenantId = decoded.tenantId;
    next();
  } catch (error: any) {
    sendError(res, error.message || 'Invalid token', 401);
  }
};

/**
 * Verify that user belongs to the tenant
 */
export const verifyTenantAccess = (req: any, res: Response, next: NextFunction): void => {
  const userTenantId = req.user?.tenantId;
  const requestTenantId = req.tenantId || req.headers['x-tenant-id'];

  if (userTenantId !== requestTenantId) {
    sendError(res, 'Unauthorized access to this tenant', 403);
    return;
  }

  next();
};

/**
 * Role-based access control
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      sendError(res, `Requires one of these roles: ${allowedRoles.join(', ')}`, 403);
      return;
    }

    next();
  };
};

/**
 * Admin only
 */
export const requireAdmin = (req: any, res: Response, next: NextFunction): void => {
  const userRole = req.user?.role;

  if (userRole !== 'admin' && userRole !== 'super-admin') {
    sendError(res, 'Admin access required', 403);
    return;
  }

  next();
};

/**
 * Optional authentication - doesn't fail if no token, but sets user if token is valid
 */
export const optionalAuthMiddleware = (req: any, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = verifyAccessToken(token);
      req.user = {
        id: decoded.id,
        tenantId: decoded.tenantId,
        email: decoded.email,
        role: decoded.role,
      };
      req.tenantId = decoded.tenantId;
    }

    next();
  } catch (error) {
    // Silently fail if token is invalid
    next();
  }
};
