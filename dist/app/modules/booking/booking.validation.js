"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = exports.customerSchema = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
exports.customerSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address'),
    mobile: zod_1.z.string({ required_error: 'Mobile number is required' }),
    address: zod_1.z.string({ required_error: 'Address is required' }),
});
const createBookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        customer: exports.customerSchema,
        serviceId: zod_1.z.string(),
        slotId: zod_1.z.string(),
        vehicleType: zod_1.z.enum(booking_constant_1.vehicleType),
        vehicleBrand: zod_1.z.string(),
        vehicleModel: zod_1.z.string(),
        manufacturingYear: zod_1.z.number(),
        registrationPlate: zod_1.z.string(),
        transactionId: zod_1.z.string().optional(),
        paymentStatus: zod_1.z
            .enum(['pending', 'completed', 'failed'])
            .default('pending')
            .optional(),
    }),
});
exports.BookingValidations = {
    createBookingSchema,
};
