"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewServices = void 0;
const http_status_1 = require("http-status");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const review_model_1 = __importDefault(require("./review.model"));
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const fetchReviewStateFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate Total Completed Washes
    const totalCompletedWashes = yield booking_model_1.default.countDocuments();
    // Calculate Total Positive Reviews (assuming rating is between 1 and 5 and positive is >= 4)
    const totalPositiveReviews = yield review_model_1.default.countDocuments({
        rating: { $gte: 4 },
    });
    // Calculate Average Review Rating
    const averageRatingResult = (yield review_model_1.default.aggregate([
        { $group: { _id: null, averageRating: { $avg: '$rating' } } },
    ]));
    const averageRating = averageRatingResult.length
        ? averageRatingResult[0].averageRating
        : 0;
    return {
        totalCompletedWashes,
        totalPositiveReviews,
        averageRating,
        yearsOfService: '2',
    };
});
const fetchAllReviewFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = query === null || query === void 0 ? void 0 : query.limit;
    const res = yield review_model_1.default.find()
        .limit(limit)
        .sort((query === null || query === void 0 ? void 0 : query.sort) ? query === null || query === void 0 ? void 0 : query.sort : '-createdAt')
        .populate('user');
    return res;
});
const createReviewIntoDB = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = 19;
    if (!existsUser) {
        throw new AppError_1.default(http_status_1.NOT_FOUND, 'User not found!');
    }
    const res = yield review_model_1.default.create(reviewData);
    return res;
});
exports.reviewServices = {
    fetchAllReviewFromDB,
    createReviewIntoDB,
    fetchReviewStateFromDB,
};
