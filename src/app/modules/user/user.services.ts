import { NOT_FOUND, UNAUTHORIZED } from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  const findUser = User.findById(newUser._id).select('-password');
  return findUser;
};

const loginUserWithEmailPassword = async (payload: Partial<TUser>) => {
  // Find user by email
  const existUser = await User.findOne({ email: payload?.email });
  if (!existUser) {
    throw new AppError(NOT_FOUND, 'User does not exist.');
  }

  // Compare provided password with stored password hash
  const passwordMatch = await bcrypt.compare(payload?.password as string, existUser?.password);
  if (!passwordMatch) {
    throw new AppError(UNAUTHORIZED, 'Login failed');
  }

  // Exclude password from user data
  const { password, ...userData } = existUser.toObject();

  // Create an object for token
  const tokenData = {
    userId: existUser?._id,
    email: existUser?.email,
    role: existUser?.role
  };

  // Create a JWT token
  const token = jwt.sign(
    tokenData,
    config.jwt_access_token as string, 
    {expiresIn: '10d'}
  )
  // Return the token and user data without the password
  return { token, data: userData };
};

export const UserServices = {
  createUserIntoDB,
  loginUserWithEmailPassword
};
