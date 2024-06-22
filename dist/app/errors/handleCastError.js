"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    return {
        message: 'Invalid ID',
        errorSources: [
            {
                path: err === null || err === void 0 ? void 0 : err.path,
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ],
        statusCode: 400,
    };
};
exports.default = handleCastError;
