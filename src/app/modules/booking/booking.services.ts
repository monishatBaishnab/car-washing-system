import mongoose from 'mongoose';
import Service from '../service/service.model';
import Slot from '../slot/slot.model';
import User from '../user/user.model';
import { TBookingData } from './booking.interface';
import Booking from './booking.model';
import AppError from '../../errors/AppError';
import {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
} from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const fetchAllBookingFromDB = async (query: Record<string, unknown>) => {
  // Populate and return the newly created booking.
  const bookings = await Booking.find()
    .populate('service')
    .populate('slot')
    .populate({ path: 'customer', select: '-password' });

  return bookings;
};

const createBookingIntoDB = async (
  bookingData: TBookingData,
  customerData: JwtPayload,
) => {
  const { serviceId, slotId, ...rest } = bookingData;
  const customer = customerData?.userId;

  const newBookingData = {
    ...rest,
    slot: slotId,
    service: serviceId,
    customer,
  };

  // Validate customer
  const existsCustomer = await User.findById(customer);
  if (!existsCustomer) {
    throw new AppError(NOT_FOUND, 'Customer does not exist.');
  }

  // Validate slot
  const existsSlot = await Slot.findById(slotId);
  if (!existsSlot) {
    throw new AppError(NOT_FOUND, 'Slot does not exist.');
  }
  if (existsSlot.isBooked === 'booked') {
    throw new AppError(CONFLICT, 'Selected slot is already booked.');
  }

  // Validate service
  const existsService = await Service.findById(serviceId);
  if (!existsService) {
    throw new AppError(NOT_FOUND, 'Service does not exist.');
  }

  // Start a session and use a transaction to ensure atomic operations
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Create new booking
    const newBooking = await Booking.create([newBookingData], { session });
    if (!newBooking) {
      throw new AppError(
        SERVICE_UNAVAILABLE,
        'Unable to create a new booking at this time.',
      );
    }

    // Update slot status to booked
    const updateSlotToBooked = await Slot.findByIdAndUpdate(
      slotId,
      { isBooked: 'booked' },
      { session, new: true },
    );
    if (!updateSlotToBooked) {
      throw new AppError(
        SERVICE_UNAVAILABLE,
        'Unable to update the slot status to booked.',
      );
    }

    // Populate and return the newly created booking.
    const booking = await Booking.findById(newBooking[0]._id)
      .populate('service')
      .populate('slot')
      .populate({ path: 'customer', select: '-password' })
      .session(session);

    //Commit session
    await session.commitTransaction();
    return booking;
  } catch (error: any) {
    // Abort session if any error found
    await session.abortTransaction();
    throw new AppError(BAD_REQUEST, error?.message);
  } finally {
    // Finally end the session
    await session.endSession();
  }
};

export const BookingServices = {
  fetchAllBookingFromDB,
  createBookingIntoDB,
};
