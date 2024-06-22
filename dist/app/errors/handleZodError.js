"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const handleZodError = (err) => {
    var _a;
    const message = 'Validation error';
    const statusCode = http_status_1.BAD_REQUEST;
    const errorMessages = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => {
        var _a, _b;
        return {
            path: (_a = issue === null || issue === void 0 ? void 0 : issue.path) === null || _a === void 0 ? void 0 : _a[((_b = issue === null || issue === void 0 ? void 0 : issue.path) === null || _b === void 0 ? void 0 : _b.length) - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message
        };
    });
    return {
        message,
        statusCode,
        errorMessages
    };
};
exports.default = handleZodError;
