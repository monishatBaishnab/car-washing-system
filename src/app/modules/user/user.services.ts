import { NOT_FOUND, UNAUTHORIZED } from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { USER_ROLE } from './user.constant';
import { createToken } from '../../utils/createToken';

const findUserInfoFromDB = async (email: string) => {
  const userInfo = await User.findOne({ email }).select('-password');

  return userInfo;
};

const createUserIntoDB = async (payload: TUser) => {
  const userData = {
    ...payload,
    role: USER_ROLE.user,
  };

  const newUser = await User.create(userData);

  let userToken;
  if (newUser) {
    userToken = createToken(newUser);
  }
  return userToken;
};

const createAdminIntoDB = async (id: string) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new AppError(NOT_FOUND, 'User does not exist.');
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role: USER_ROLE.admin },
    { new: true },
  );
  let userToken;
  if (updatedUser) {
    userToken = createToken(updatedUser);
  }
  return userToken;
};

const updateProfileIntoDB = async (
  payload: Record<string, string>,
  role: string,
  id: string,
) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new AppError(NOT_FOUND, 'User does not exist.');
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { ...payload, role },
    { new: true },
  );

  return updatedUser;
};

const loginUserWithEmailPassword = async (payload: Partial<TUser>) => {
  // Find user by email
  const existUser = await User.findOne({ email: payload?.email });
  if (!existUser) {
    throw new AppError(NOT_FOUND, 'User does not exist.');
  }

  // Compare provided password with stored password hash
  const passwordMatch = await bcrypt.compare(
    payload?.password as string,
    existUser?.password,
  );
  if (!passwordMatch) {
    throw new AppError(UNAUTHORIZED, 'Login failed');
  }

  // Exclude password from user data
  const { password, ...userData } = existUser.toObject();

  // Create an object for token
  const tokenData = {
    userId: existUser?._id,
    email: existUser?.email,
    role: existUser?.role,
  };

  // Create a JWT token
  const token = jwt.sign(tokenData, config.jwt_access_token as string, {
    expiresIn: '10d',
  });
  // Return the token and user data without the password
  return token;
};

export const UserServices = {
  findUserInfoFromDB,
  createUserIntoDB,
  updateProfileIntoDB,
  createAdminIntoDB,
  loginUserWithEmailPassword,
};
