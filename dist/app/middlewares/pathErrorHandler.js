"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const pathErrorHandler = (req, res) => {
    res.status(http_status_1.NOT_FOUND).json({
        success: false,
        statusCode: http_status_1.NOT_FOUND,
        message: 'Not Found',
    });
};
exports.default = pathErrorHandler;
