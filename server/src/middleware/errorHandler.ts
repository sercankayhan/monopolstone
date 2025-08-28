import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class CustomError extends Error implements AppError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (message: string, statusCode: number): CustomError => {
  return new CustomError(message, statusCode);
};

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let err = { ...error };
  err.message = error.message;

  console.error('Error:', error);

  // Mongoose bad ObjectId
  if (error.name === 'CastError' && error instanceof mongoose.Error.CastError) {
    const message = 'Resource not found';
    err = createError(message, 404);
  }

  // Mongoose duplicate key
  if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    const message = 'Duplicate field value entered';
    err = createError(message, 400);
  }

  // Mongoose validation error
  if (error.name === 'ValidationError' && error instanceof mongoose.Error.ValidationError) {
    const message = Object.values(error.errors).map(val => val.message).join(', ');
    err = createError(message, 400);
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    err = createError(message, 401);
  }

  if (error.name === 'TokenExpiredError') {
    const message = 'Token expired';
    err = createError(message, 401);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Not found - ${req.originalUrl}`,
  });
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);