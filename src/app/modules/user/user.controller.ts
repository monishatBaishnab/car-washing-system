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
    data: { token: newUser },
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const id = req?.params?.userId;
  console.log(id);
  const result = await UserServices.createAdminIntoDB(id);
  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Admin created successfully',
    data: { token: result },
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
    data: { token: loggedInUserData },
  });
});

export const UserControllers = {
  createUser,
  createAdmin,
  loginUser,
};
