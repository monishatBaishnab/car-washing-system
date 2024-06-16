import { z } from 'zod';

const createServiceValidation = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        duration: z.number(),
        price: z.number(),
        isDeleted: z.boolean(),
    })
});

const updateServiceValidation = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        duration: z.number().optional(),
        price: z.number().optional(),
        isDeleted: z.boolean().optional(),
    })
});

export const ServiceValidations = {
    createServiceValidation,
    updateServiceValidation
};
