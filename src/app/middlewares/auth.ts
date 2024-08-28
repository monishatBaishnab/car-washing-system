import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { UNAUTHORIZED } from 'http-status';
import { TUserRole } from '../modules/user/user.interface';

// Define a custom type that extends JwtPayload
interface DecodedToken extends JwtPayload {
  role: TUserRole;  // Ensure role is of type TUserRole
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(UNAUTHORIZED, 'You have no access to this route');
    }

    jwt.verify(
      token as string,
      config.jwt_access_token as string,
      (err, decoded) => {
        if (err) {
          throw new AppError(UNAUTHORIZED, 'You have no access to this route');
        }
        const decodedToken = decoded as DecodedToken; // Cast decoded to the custom type

        if (requiredRoles && !requiredRoles.includes(decodedToken.role)) {
          throw new AppError(UNAUTHORIZED, 'You have no access to this route');
        }
        req.user = decodedToken;  // req.user now has a 'role' property
        next();
      },
    );
  });
};

export default auth;
