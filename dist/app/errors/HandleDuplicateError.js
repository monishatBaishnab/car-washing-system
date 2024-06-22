"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]+)"/);
    const extractedMsg = match ? match[1] : null;
    return {
        statusCode: http_status_1.CONFLICT,
        message: `${extractedMsg} is already exists.`,
        errorMessages: [
            {
                path: extractedMsg,
                message: `${extractedMsg} is already exists.`,
            },
        ],
    };
};
exports.default = handleDuplicateError;
