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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = require("http-status");
const payment_utils_1 = require("../payment/payment.utils");
const uuid_1 = require("uuid");
const fetchAllBookingFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Populate and return the newly created booking.
    const bookings = yield booking_model_1.default.find().populate('service').populate('slot');
    return bookings;
});
const fetchUpcomingBookingFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = new Date();
    const bookings = yield booking_model_1.default.find({
        'customer.email': email,
    })
        .populate({
        path: 'slot',
        select: 'date',
    })
        .populate('service');
    const upcomingBookings = bookings.filter((booking) => {
        return booking.slot && new Date(booking.slot.date) > currentTime;
    });
    return upcomingBookings;
});
const fetchMyBookingFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // Populate and return the newly created booking.
    const bookings = yield booking_model_1.default.find({ 'customer.email': email })
        .populate('service')
        .populate('slot');
    return bookings;
});
const createBookingIntoDB = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, slotId } = bookingData, rest = __rest(bookingData, ["serviceId", "slotId"]);
    const customer = bookingData === null || bookingData === void 0 ? void 0 : bookingData.customer;
    const transactionId = (0, uuid_1.v4)();
    const newBookingData = Object.assign(Object.assign({}, rest), { slot: slotId, service: serviceId, transactionId });
    // // Validate customer
    // const existsCustomer = await User.find(customer.email);
    // if (!existsCustomer) {
    //   throw new AppError(NOT_FOUND, 'Customer does not exist.');
    // }
    // Validate slot
    const existsSlot = yield slot_model_1.default.findById(slotId);
    if (!existsSlot) {
        throw new AppError_1.default(http_status_1.NOT_FOUND, 'Slot does not exist.');
    }
    if (existsSlot.isBooked === 'booked') {
        throw new AppError_1.default(http_status_1.CONFLICT, 'Selected slot is already booked.');
    }
    // Validate service
    const existsService = yield service_model_1.default.findById(serviceId);
    if (!existsService) {
        throw new AppError_1.default(http_status_1.NOT_FOUND, 'Service does not exist.');
    }
    // Start a session and use a transaction to ensure atomic operations
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Create new booking
        const newBooking = yield booking_model_1.default.create([newBookingData], { session });
        if (!newBooking) {
            throw new AppError_1.default(http_status_1.SERVICE_UNAVAILABLE, 'Unable to create a new booking at this time.');
        }
        // Update slot status to booked
        const updateSlotToBooked = yield slot_model_1.default.findByIdAndUpdate(slotId, { isBooked: 'booked' }, { session, new: true });
        if (!updateSlotToBooked) {
            throw new AppError_1.default(http_status_1.SERVICE_UNAVAILABLE, 'Unable to update the slot status to booked.');
        }
        const paymentInfo = yield (0, payment_utils_1.initialPayment)(Object.assign(Object.assign({}, customer), { amount: existsService.price, transactionId }));
        //Commit session
        yield session.commitTransaction();
        return paymentInfo;
    }
    catch (error) {
        // Abort session if any error found
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_1.BAD_REQUEST, error === null || error === void 0 ? void 0 : error.message);
    }
    finally {
        // Finally end the session
        yield session.endSession();
    }
});
exports.BookingServices = {
    fetchAllBookingFromDB,
    fetchUpcomingBookingFromDB,
    fetchMyBookingFromDB,
    createBookingIntoDB,
};
