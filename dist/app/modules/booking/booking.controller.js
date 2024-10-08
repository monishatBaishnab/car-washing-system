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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const http_status_1 = require("http-status");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_services_1 = require("./booking.services");
const fetchAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_services_1.BookingServices.fetchAllBookingFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'All bookings retrieved successfully',
        statusCode: http_status_1.OK,
        data: bookings,
    });
}));
const fetchUpcomingBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_services_1.BookingServices.fetchUpcomingBookingFromDB(req.user.email);
    console.log(bookings);
    console.log(req.user.email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Upcoming bookings retrieved successfully',
        statusCode: http_status_1.OK,
        data: bookings,
    });
}));
const fetchMyBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_services_1.BookingServices.fetchMyBookingFromDB(req.user.email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'My bookings retrieved successfully',
        statusCode: http_status_1.OK,
        data: bookings,
    });
}));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBooking = yield booking_services_1.BookingServices.createBookingIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Booking created successful',
        statusCode: http_status_1.OK,
        data: newBooking,
    });
}));
const updateBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = (_a = req.params) !== null && _a !== void 0 ? _a : {};
    const updatedBooking = yield booking_services_1.BookingServices.updateBookingIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Booking updated successful',
        statusCode: http_status_1.OK,
        data: updatedBooking,
    });
}));
exports.BookingControllers = {
    fetchAllBooking,
    fetchUpcomingBooking,
    fetchMyBooking,
    createBooking,
    updateBooking,
};
