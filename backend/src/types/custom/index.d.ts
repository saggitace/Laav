import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        // add other user properties here
      };
      tenantId?: string;
    }
  }
}

// Export a specific type if you prefer using AuthRequest in controllers
export interface AuthRequest extends Request {
  user?: any; 
  tenantId?: string;
}