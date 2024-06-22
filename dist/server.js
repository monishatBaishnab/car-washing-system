"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const port = (_a = config_1.default.port) !== null && _a !== void 0 ? _a : 3000;
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.db_uri, {
            dbName: 'car-washing-system',
        });
        console.log('Database connected successfully.');
        server = app_1.default.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
});
bootstrap();
// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('😈 Shutting down the server due to unhandled rejection....');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.log('😈 Shutting down the server due to uncaught exception....');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
