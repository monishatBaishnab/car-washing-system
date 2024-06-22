"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const handleValidationError = (err) => {
    const message = 'Validation error!';
    const statusCode = http_status_1.BAD_REQUEST;
    const errorMessages = Object.values(err === null || err === void 0 ? void 0 : err.errors).map((error) => {
        return {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    });
    return {
        message,
        statusCode,
        errorMessages
    };
};
exports.default = handleValidationError;
