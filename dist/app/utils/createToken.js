"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createToken = (payload) => {
    // Create an object for token
    const tokenData = {
        userId: payload === null || payload === void 0 ? void 0 : payload._id,
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        role: payload === null || payload === void 0 ? void 0 : payload.role,
    };
    // Create a JWT token
    const token = jsonwebtoken_1.default.sign(tokenData, config_1.default.jwt_access_token, {
        expiresIn: '10d',
    });
    return token;
};
exports.createToken = createToken;
