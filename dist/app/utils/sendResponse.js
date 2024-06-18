"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const sendResponse = (res, data) => {
    var _a;
    if ((Array.isArray(data === null || data === void 0 ? void 0 : data.data) && !((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.length)) ||
        (data === null || data === void 0 ? void 0 : data.data) === null) {
        data.success = false;
        data.statusCode = http_status_1.NOT_FOUND;
        data.message = 'No Data Found';
        data.data = [];
    }
    res.status(data.statusCode).json(data);
};
exports.default = sendResponse;
