import jwt from 'jsonwebtoken';
import config from '../config';
import { TUser } from '../modules/user/user.interface';
export const createToken = (payload: TUser) => {
  // Create an object for token
  const tokenData = {
    userId: payload?._id,
    email: payload?.email,
    role: payload?.role,
  };

  // Create a JWT token
  const token = jwt.sign(tokenData, config.jwt_access_token as string, {
    expiresIn: '10d',
  });

  return token;
};
