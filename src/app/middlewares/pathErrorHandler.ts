import { Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';

const pathErrorHandler = (req: Request, res: Response) => {
  res.status(NOT_FOUND).json({
    success: false,
    statusCode: NOT_FOUND,
    message: 'Not Found',
  });
};

export default pathErrorHandler;
