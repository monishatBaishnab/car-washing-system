import { OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { reviewServices } from './review.services';
import sendResponse from '../../utils/sendResponse';

const fetchAllReview = catchAsync(async (req, res) => {
  const result = await reviewServices.fetchAllReviewFromDB(req?.query);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Reviews retrieved successfully.',
    data: result,
  });
});
const fetchReviewState = catchAsync(async (req, res) => {
  const result = await reviewServices.fetchReviewStateFromDB();

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Review states successfully.',
    data: result,
  });
});

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req?.body);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Review created successfully.',
    data: result,
  });
});

export const reviewControllers = { fetchAllReview, createReview, fetchReviewState };
