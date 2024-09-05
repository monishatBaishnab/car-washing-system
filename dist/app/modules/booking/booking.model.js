"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const customerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
}, { _id: false });
const bookingSchema = new mongoose_1.Schema({
    customer: { type: customerSchema, required: true },
    service: { type: mongoose_1.Schema.ObjectId, required: true, ref: 'Service' },
    slot: { type: mongoose_1.Schema.ObjectId, required: true, ref: 'Slot' },
    vehicleType: { type: String, enum: booking_constant_1.vehicleType, required: true },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
    transactionId: { type: String, required: true },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
}, { timestamps: true });
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.default = Booking;
