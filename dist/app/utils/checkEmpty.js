"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const checkEmpty = (data) => {
    const responseObj = {
        success: true,
        statusCode: http_status_1.OK,
        message: 'Services retrieved successfully',
        data: data,
    };
    if (!(data === null || data === void 0 ? void 0 : data.length)) {
        responseObj.message = "No Data Found";
        responseObj.success = false;
        responseObj.statusCode = http_status_1.NOT_FOUND;
        responseObj.data = [];
    }
};
