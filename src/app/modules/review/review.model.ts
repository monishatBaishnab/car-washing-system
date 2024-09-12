import mongoose, { Schema, Document } from 'mongoose';

// Define the Mongoose schema
const reviewSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Create Mongoose model
const Review = mongoose.model<Document>('Review', reviewSchema);

export default Review;
