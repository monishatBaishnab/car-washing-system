import { z } from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required.' }),
        email: z
            .string({
                required_error: 'Email is required.',
                invalid_type_error: 'Email must be a valid email address.',
            })
            .email(),
        password: z.string().optional(),
        phone: z.string({ required_error: 'Phone is required.' }),
        address: z.string({ required_error: 'Address is required.' }),
        role: z.enum(['admin', 'user']),
    })
});

export const UserValidations = {
    createUserValidationSchema,
};
