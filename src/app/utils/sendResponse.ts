import { Response } from 'express';
import { NOT_FOUND } from 'http-status';

export type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  token?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  if (
    (Array.isArray(data?.data) && !data?.data?.length) ||
    data?.data === null
  ) {
    data.success = false;
    data.statusCode = NOT_FOUND;
    data.message = 'No Data Found';
    data.data = [] as T;
  }

  res.status(data.statusCode).json(data);
};

export default sendResponse;
