import { NOT_FOUND } from 'http-status';
import AppError from '../../errors/AppError';
import { TReview } from './review.interface';
import Review from './review.model';
import Booking from '../booking/booking.model';

const fetchReviewStateFromDB = async () => {
  // Calculate Total Completed Washes
  const totalCompletedWashes = await Booking.countDocuments();

  // Calculate Total Positive Reviews (assuming rating is between 1 and 5 and positive is >= 4)
  const totalPositiveReviews = await Review.countDocuments({
    rating: { $gte: 4 },
  });

  // Calculate Average Review Rating
  const averageRatingResult = (await Review.aggregate([
    { $group: { _id: null, averageRating: { $avg: '$rating' } } },
  ])) as { averageRating: number }[];
  const averageRating = averageRatingResult.length
    ? averageRatingResult[0].averageRating
    : 0;

  return {
    totalCompletedWashes,
    totalPositiveReviews,
    averageRating: averageRating?.toFixed(1),
    yearsOfService: '2',
  };
};

const fetchAllReviewFromDB = async (query: Record<string, unknown>) => {
  const limit = query?.limit;
  const res = await Review.find()
    .limit(limit as number)
    .sort(query?.sort ? (query?.sort as string) : '-createdAt')
    .populate('user');

  return res;
};

const createReviewIntoDB = async (reviewData: TReview) => {
  const existsUser = 19;

  if (!existsUser) {
    throw new AppError(NOT_FOUND, 'User not found!');
  }

  const res = await Review.create(reviewData);
  return res;
};

export const reviewServices = {
  fetchAllReviewFromDB,
  createReviewIntoDB,
  fetchReviewStateFromDB,
};
