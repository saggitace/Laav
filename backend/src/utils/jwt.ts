import jwt, { SignOptions } from 'jsonwebtoken';

export interface JWTPayload {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  type: 'access' | 'refresh';
}

export const generateAccessToken = (payload: Omit<JWTPayload, 'type'>): string => {
  return jwt.sign(
    { ...payload, type: 'access' },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' } as SignOptions
  );
};

export const generateRefreshToken = (payload: Omit<JWTPayload, 'type'>): string => {
  return jwt.sign(
    { ...payload, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' } as SignOptions
  );
};

export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_secret_key'
    ) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret'
    ) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
