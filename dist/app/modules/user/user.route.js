"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("./user.constant");
const router = (0, express_1.Router)();
router.get('/:email', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), user_controller_1.UserControllers.fetchUserInfo);
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), user_controller_1.UserControllers.createUser);
router.patch('/create-admin/:userId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.createAdmin);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidations.loginUserValidationSchema), user_controller_1.UserControllers.loginUser);
exports.UserRoutes = router;
