"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]+)"/);
    const extractedMsg = match ? match[1] : null;
    return {
        statusCode: 500,
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
