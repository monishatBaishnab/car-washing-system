import { BAD_REQUEST } from 'http-status';
import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/errors';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const message = 'Validation error!';
  const statusCode = BAD_REQUEST;

  const errorMessages = Object.values(err?.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error?.path,
        message: error?.message,
      };
    },
  );

  return {
    message,
    statusCode,
    errorMessages,
  };
};

export default handleValidationError;
