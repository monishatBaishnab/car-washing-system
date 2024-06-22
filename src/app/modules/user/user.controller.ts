import { OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const newUser = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'User registered successfully',
    data: newUser,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const loggedInUserData = await UserServices.loginUserWithEmailPassword(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'User logged in successfully',
    ...loggedInUserData,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};
