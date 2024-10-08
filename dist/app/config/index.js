"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    default_password: process.env.DEFAULT_PASS,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    payment_url: process.env.PAYMENT_URL,
};
