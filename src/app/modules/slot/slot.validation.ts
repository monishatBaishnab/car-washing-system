import { z } from 'zod';

const createSlotValidation = z.object({
  body: z
    .object({
      service: z.string(),
      date: z.string(),
      startTime: z.string().refine(
        (time) => {
          const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return timeRegex.test(time);
        },
        { message: `Time must be in the format "HH:MM" (24-hour clock).` },
      ),
      endTime: z.string().refine(
        (time) => {
          const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return timeRegex.test(time);
        },
        { message: `Time must be in the format "HH:MM" (24-hour clock).` },
      ),
      isBooked: z.enum(['available', 'booked', 'canceled']).optional(),
    })
    .refine(
      (body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}`);
        const endTime = new Date(`1970-01-01T${body.endTime}`);

        return startTime < endTime;
      },
      { message: 'The end time must be after the start time.' },
    ),
});

export const SlotValidations = {
  createSlotValidation,
};
