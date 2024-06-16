import { OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.services';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const newUser = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'User registered successfully',
    data: newUser,
  });
});

export const userControllers = {
  createUser,
};
