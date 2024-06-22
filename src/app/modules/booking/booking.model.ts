import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { vehicleType } from "./booking.constant";

const bookingSchema = new Schema<TBooking>({
    customer: { type: Schema.ObjectId, required: true, ref: 'User'},
    service: { type: Schema.ObjectId, required: true, ref: 'Service'},
    slot: { type: Schema.ObjectId, required: true, ref: 'Slot'},
    vehicleType: { type: String, enum: vehicleType, required: true },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
}, {timestamps: true})

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;