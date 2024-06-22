"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b, _c;
    let statusCode = (_a = err === null || err === void 0 ? void 0 : err.statusCode) !== null && _a !== void 0 ? _a : http_status_1.BAD_REQUEST;
    let message = (_b = err === null || err === void 0 ? void 0 : err.message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
    let errorMessages = [
        {
            path: '',
            message: (_c = err === null || err === void 0 ? void 0 : err.message) !== null && _c !== void 0 ? _c : 'Something went wrong!',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if (err instanceof AppError_1.default) {
        message = err.message;
        errorMessages = [
            {
                path: '',
                message: err.message,
            },
        ];
    }
    res.status(statusCode).json(Object.assign(Object.assign({ success: false, statusCode,
        message }, (err !== http_status_1.UNAUTHORIZED && { errorMessages })), { stack: err === null || err === void 0 ? void 0 : err.stack }));
};
exports.default = globalErrorHandler;
