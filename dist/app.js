"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pathErrorHandler_1 = __importDefault(require("./app/middlewares/pathErrorHandler"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res, next) => {
    throw new Error('Error occured');
});
// Handle 404 errors
app.use('*', pathErrorHandler_1.default);
// Global Error Handler Middleware
app.use(globalErrorHandler_1.default);
exports.default = app;
