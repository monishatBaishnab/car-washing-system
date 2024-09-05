import { z } from 'zod';
import { vehicleType } from './booking.constant';

export const customerSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  mobile: z.string({ required_error: 'Mobile number is required' }),
  address: z.string({ required_error: 'Address is required' }),
});

const createBookingSchema = z.object({
  body: z.object({
    customer: customerSchema,
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: z.enum(vehicleType as [string, ...string[]]),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
    transactionId: z.string().optional(),
    paymentStatus: z
      .enum(['pending', 'completed', 'failed'])
      .default('pending')
      .optional(),
  }),
});

export const BookingValidations = {
  createBookingSchema,
};
