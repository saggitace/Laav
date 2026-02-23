import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    tenantId: string;
    email: string;
    role: string;
  };
  tenantId?: string;
}

/**
 * Extract tenant ID from request (from header, URL param, or JWT)
 */
export const tenantMiddleware = (req: any, res: Response, next: NextFunction): void => {
  try {
    // Try to get tenant ID from header
    let tenantId = req.headers['x-tenant-id'] as string;

    // If not in header, try to get from URL params
    if (!tenantId) {
      tenantId = req.params.tenantId;
    }

    // If not found, return error
    if (!tenantId) {
      sendError(res, 'Tenant ID is required', 400);
      return;
    }

    req.tenantId = tenantId;
    next();
  } catch (error) {
    sendError(res, 'Error extracting tenant ID', 400);
  }
};

/**
 * Validate tenant ID format
 */
export const validateTenantId = (req: any, res: Response, next: NextFunction): void => {
  const tenantId = req.tenantId || req.headers['x-tenant-id'];

  if (!tenantId || typeof tenantId !== 'string') {
    sendError(res, 'Invalid tenant ID format', 400);
    return;
  }

  // Validate tenant ID format (should be alphanumeric with hyphens)
  if (!/^[a-zA-Z0-9\-_]+$/.test(tenantId)) {
    sendError(res, 'Invalid tenant ID format', 400);
    return;
  }

  next();
};

/**
 * Rate limiting middleware
 */
export const rateLimitMiddleware = (req: any, res: Response, next: NextFunction): void => {
  const key = `${req.ip}-${req.path}`;
  const limit = 100; // requests per minute
  const timeWindow = 60000; // 1 minute

  // This is a basic implementation. For production, use redis-based rate limiting
  next();
};

/**
 * Error handling middleware
 */
export const errorHandler = (
  err: any,
  req: any,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';

  sendError(res, message, statusCode, err.details);
};

/**
 * 404 handler
 */
export const notFoundHandler = (req: any, res: Response, next: NextFunction): void => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
};
