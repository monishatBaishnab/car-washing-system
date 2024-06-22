"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = require("http-status");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_model_1.default.create(payload);
    const findUser = user_model_1.default.findById(newUser._id).select('-password');
    return findUser;
});
const loginUserWithEmailPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by email
    const existUser = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!existUser) {
        throw new AppError_1.default(http_status_1.NOT_FOUND, 'User does not exist.');
    }
    // Compare provided password with stored password hash
    const passwordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, existUser === null || existUser === void 0 ? void 0 : existUser.password);
    if (!passwordMatch) {
        throw new AppError_1.default(http_status_1.UNAUTHORIZED, 'Login failed');
    }
    // Exclude password from user data
    const _a = existUser.toObject(), { password } = _a, userData = __rest(_a, ["password"]);
    // Create an object for token
    const tokenData = {
        userId: existUser === null || existUser === void 0 ? void 0 : existUser._id,
        email: existUser === null || existUser === void 0 ? void 0 : existUser.email,
        role: existUser === null || existUser === void 0 ? void 0 : existUser.role,
    };
    // Create a JWT token
    const token = jsonwebtoken_1.default.sign(tokenData, config_1.default.jwt_access_token, {
        expiresIn: '10d',
    });
    // Return the token and user data without the password
    return { token, data: userData };
});
exports.UserServices = {
    createUserIntoDB,
    loginUserWithEmailPassword,
};
