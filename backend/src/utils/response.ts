import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode: number;
  timestamp: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  } as ApiResponse<T>);
};

export const sendError = (
  res: Response,
  error: string,
  statusCode: number = 400,
  data?: any
): Response => {
  return res.status(statusCode).json({
    success: false,
    error,
    data,
    statusCode,
    timestamp: new Date().toISOString(),
  } as ApiResponse);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  totalItems: number,
  page: number,
  pageSize: number,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    statusCode,
    timestamp: new Date().toISOString(),
  });
};
