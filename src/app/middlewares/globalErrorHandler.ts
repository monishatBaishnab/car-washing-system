import { ErrorRequestHandler } from 'express';
import { BAD_REQUEST } from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = BAD_REQUEST;
  let errorObj = {
    success: false,
    message: err?.message ?? 'Something went wrong!',
    errorMessages: [
      {
        path: '',
        message: err?.message ?? 'Something went wrong!',
      },
    ],
    stack: err?.stack,
    error: err
  };

  res.status(statusCode).json(errorObj);
};

export default globalErrorHandler;
