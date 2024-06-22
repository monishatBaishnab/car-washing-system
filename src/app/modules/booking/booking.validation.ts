import { z } from 'zod';
import { vehicleType } from './booking.constant';

const createBookingSchema = z.object({
  body: z.object({
    customer: z.string().optional(),
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: z.enum(vehicleType as [string, ...string[]]),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});

export const BookingValidations = {
  createBookingSchema,
};
