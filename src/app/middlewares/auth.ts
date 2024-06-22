import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import { UNAUTHORIZED } from "http-status";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new AppError(UNAUTHORIZED, "You have no access to this route");
        }
        jwt.verify(token as string, config.jwt_access_token as string, (err, decoded) => {
            if (err) {
                throw new AppError(UNAUTHORIZED, "You have no access to this route");
            }
            if(requiredRoles && !requiredRoles.includes(decoded?.role)){
                throw new AppError(UNAUTHORIZED, "You have no access to this route");
            }
            req.user = decoded as JwtPayload;
            next();
        });
        
    });
}

export default auth;