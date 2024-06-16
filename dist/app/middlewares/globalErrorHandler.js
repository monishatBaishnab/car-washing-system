"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b;
    let statusCode = http_status_1.BAD_REQUEST;
    let errorObj = {
        success: false,
        message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : 'Something went wrong!',
        errorMessages: [
            {
                path: '',
                message: (_b = err === null || err === void 0 ? void 0 : err.message) !== null && _b !== void 0 ? _b : 'Something went wrong!',
            },
        ],
        stack: err === null || err === void 0 ? void 0 : err.stack,
    };
    res.status(statusCode).json(errorObj);
};
exports.default = globalErrorHandler;
