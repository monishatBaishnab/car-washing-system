"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required.' }),
        email: zod_1.z
            .string({
            required_error: 'Email is required.',
            invalid_type_error: 'Email must be a valid email address.',
        })
            .email(),
        password: zod_1.z.string({ required_error: "Password is required." }),
        phone: zod_1.z.string({ required_error: 'Phone is required.' }),
        address: zod_1.z.string({ required_error: 'Address is required.' }),
    }),
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required.',
            invalid_type_error: 'Email must be a valid email address.',
        })
            .email(),
        password: zod_1.z.string(),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
    loginUserValidationSchema,
};
