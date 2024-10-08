"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidations = void 0;
const zod_1 = require("zod");
const createServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        duration: zod_1.z.number(),
        price: zod_1.z.number(),
        image: zod_1.z.string(),
        rating: zod_1.z.number().optional(),
        featured: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        duration: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        image: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        featured: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ServiceValidations = {
    createServiceValidation,
    updateServiceValidation,
};
