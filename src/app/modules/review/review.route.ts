import { Router } from 'express';
import { reviewControllers } from './review.controller';

const router = Router();

router.get('/', reviewControllers.fetchAllReview);
router.get('/review-state', reviewControllers.fetchReviewState);
router.post('/', reviewControllers.createReview);

export const reviewRoutes = router;
