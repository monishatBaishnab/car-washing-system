"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBookingRoutes = void 0;
const express_1 = require("express");
const userBooking_controller_1 = require("./userBooking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), userBooking_controller_1.UserBookingController.fetchUserBooking);
exports.UserBookingRoutes = router;
