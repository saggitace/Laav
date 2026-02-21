import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => {
  return uuidv4();
};

export const generateTenantId = (): string => {
  return `tenant_${uuidv4()}`;
};

export const generateVerificationCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const parsePaginationParams = (page: any, pageSize: any) => {
  let p = parseInt(page) || 1;
  let size = parseInt(pageSize) || 10;

  if (p < 1) p = 1;
  if (size < 1) size = 1;
  if (size > 100) size = 100;

  return { page: p, pageSize: size, skip: (p - 1) * size };
};
