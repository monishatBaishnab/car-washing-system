import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import { vehicleType } from './booking.constant';
const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false },
);

const bookingSchema = new Schema<TBooking>(
  {
    customer: { type: customerSchema, required: true },
    service: { type: Schema.ObjectId, required: true, ref: 'Service' },
    slot: { type: Schema.ObjectId, required: true, ref: 'Slot' },
    vehicleType: { type: String, enum: vehicleType, required: true },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
    transactionId: { type: String, required:true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;
