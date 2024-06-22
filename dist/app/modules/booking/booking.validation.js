"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const createBookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        customer: zod_1.z.string().optional(),
        serviceId: zod_1.z.string(),
        slotId: zod_1.z.string(),
        vehicleType: zod_1.z.enum(booking_constant_1.vehicleType),
        vehicleBrand: zod_1.z.string(),
        vehicleModel: zod_1.z.string(),
        manufacturingYear: zod_1.z.number(),
        registrationPlate: zod_1.z.string(),
    }),
});
exports.BookingValidations = {
    createBookingSchema,
};
