"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.fetchAllBooking);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingSchema), booking_controller_1.BookingControllers.createBooking);
exports.BookingRoutes = router;
