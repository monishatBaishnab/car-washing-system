import { CONFLICT } from 'http-status';
import { TGenericErrorResponse } from '../interface/errors';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]+)"/);
  const extractedMsg = match ? match[1] : null;

  return {
    statusCode: CONFLICT,
    message: `${extractedMsg} is already exists.`,
    errorMessages: [
      {
        path: extractedMsg,
        message: `${extractedMsg} is already exists.`,
      },
    ],
  };
};

export default handleDuplicateError;
