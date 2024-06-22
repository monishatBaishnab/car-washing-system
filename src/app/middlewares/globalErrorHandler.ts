import { ErrorRequestHandler } from 'express';
import { BAD_REQUEST, UNAUTHORIZED } from 'http-status';
import { TErrorMessages } from '../interface/errors';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err?.statusCode ?? BAD_REQUEST;
  let message = err?.message ?? 'Something went wrong!';
  let errorMessages: TErrorMessages[] = [
    {
      path: '',
      message: err?.message ?? 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages as TErrorMessages[];
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages as TErrorMessages[];
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages as TErrorMessages[];
  } else if (err?.code === 11000) {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages as TErrorMessages[];
  } else if (err instanceof AppError) {
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(err !== UNAUTHORIZED && { errorMessages }),
    stack: err?.stack
  });
};

export default globalErrorHandler;
