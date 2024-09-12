"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema
const createReviewSchema = zod_1.z.object({
    user: zod_1.z.string(),
    rating: zod_1.z
        .number()
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating cannot exceed 5'),
    review: zod_1.z.string().nonempty('Review is required'),
});
exports.default = createReviewSchema;
