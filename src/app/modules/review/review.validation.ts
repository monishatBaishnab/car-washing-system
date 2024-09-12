import { z } from 'zod';

// Define the Zod schema
const createReviewSchema = z.object({
  user: z.string(),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  review: z.string().nonempty('Review is required'),
});

export default createReviewSchema;
