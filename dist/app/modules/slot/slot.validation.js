"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidations = void 0;
const zod_1 = require("zod");
const createSlotValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        service: zod_1.z.string(),
        date: zod_1.z.string(),
        startTime: zod_1.z.string().refine((time) => {
            const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
            return timeRegex.test(time);
        }, { message: `Time must be in the format "HH:MM" (24-hour clock).` }),
        endTime: zod_1.z.string().refine((time) => {
            const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
            return timeRegex.test(time);
        }, { message: `Time must be in the format "HH:MM" (24-hour clock).` }),
        isBooked: zod_1.z.enum(['available', 'booked', 'canceled']).optional(),
    })
        .refine((body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}`);
        const endTime = new Date(`1970-01-01T${body.endTime}`);
        return startTime < endTime;
    }, { message: 'The end time must be after the start time.' }),
});
exports.SlotValidations = {
    createSlotValidation,
};
