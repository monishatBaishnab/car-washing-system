import { z } from 'zod';

const createServiceValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    duration: z.number(),
    price: z.number(),
    image: z.string(),
    rating: z.number().optional(),
    featured: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateServiceValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    duration: z.number().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
    rating: z.number().optional(),
    featured: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ServiceValidations = {
  createServiceValidation,
  updateServiceValidation,
};
