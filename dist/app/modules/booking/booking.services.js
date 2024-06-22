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
const user_model_1 = __importDefault(require("../user/user.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = require("http-status");
const fetchAllBookingFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Populate and return the newly created booking.
    const bookings = yield booking_model_1.default.find()
        .populate('service')
        .populate('slot')
        .populate({ path: 'customer', select: '-password' });
    return bookings;
});
const createBookingIntoDB = (bookingData, customerData) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, slotId } = bookingData, rest = __rest(bookingData, ["serviceId", "slotId"]);
    const customer = customerData === null || customerData === void 0 ? void 0 : customerData.userId;
    const newBookingData = Object.assign(Object.assign({}, rest), { slot: slotId, service: serviceId, customer });
    // Validate customer
    const existsCustomer = yield user_model_1.default.findById(customer);
    if (!existsCustomer) {
        throw new AppError_1.default(http_status_1.NOT_FOUND, 'Customer does not exist.');
    }
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
        // Populate and return the newly created booking.
        const booking = yield booking_model_1.default.findById(newBooking[0]._id)
            .populate('service')
            .populate('slot')
            .populate({ path: 'customer', select: '-password' })
            .session(session);
        //Commit session
        yield session.commitTransaction();
        return booking;
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
    createBookingIntoDB,
};
