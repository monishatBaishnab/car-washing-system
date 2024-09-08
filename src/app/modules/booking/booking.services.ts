import mongoose from 'mongoose';
import Service from '../service/service.model';
import Slot from '../slot/slot.model';
import { TBookingData } from './booking.interface';
import Booking from './booking.model';
import AppError from '../../errors/AppError';
import {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
} from 'http-status';
import { initialPayment } from '../payment/payment.utils';
import { v4 as uuidv4 } from 'uuid';
import { TSlot } from '../slot/slot.interface';

const fetchAllBookingFromDB = async (query: Record<string, unknown>) => {
  const limit = query?.limit ?? '';
  const sort = query?.sort ?? '-updatedAt';
  const limitQuery = Booking.find().limit(Number(limit));
  const bookings = await limitQuery
    .find()
    .populate('service')
    .populate('slot')
    .sort(sort as string);

  return bookings;
};

const fetchUpcomingBookingFromDB = async (email: string) => {
  const currentTime = new Date();

  const bookings = await Booking.find({
    'customer.email': email,
  })
    .populate('slot')
    .populate('service');

  const upcomingBookings = bookings.filter((booking) => {
    return booking.slot && new Date((booking.slot as TSlot).date) > currentTime;
  });

  return upcomingBookings;
};

const fetchMyBookingFromDB = async (email: string) => {
  // Populate and return the newly created booking.
  const bookings = await Booking.find({ 'customer.email': email })
    .populate('service')
    .populate('slot');

  return bookings;
};

const createBookingIntoDB = async (bookingData: TBookingData) => {
  const { serviceId, slotId, ...rest } = bookingData;
  const customer = bookingData?.customer;
  const transactionId: string = uuidv4();
  const newBookingData = {
    ...rest,
    slot: slotId,
    service: serviceId,
    transactionId,
  };

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
    const paymentInfo = await initialPayment({
      ...customer,
      amount: existsService.price,
      transactionId,
    });
    //Commit session
    await session.commitTransaction();
    return paymentInfo;
  } catch (error: any) {
    // Abort session if any error found
    await session.abortTransaction();
    throw new AppError(BAD_REQUEST, error?.message);
  } finally {
    // Finally end the session
    await session.endSession();
  }
};

const updateBookingIntoDB = async (payload: string, id: string) => {
  const result = await Booking.findOneAndUpdate({ _id: id }, { payload });
  return result;
};

export const BookingServices = {
  fetchAllBookingFromDB,
  fetchUpcomingBookingFromDB,
  fetchMyBookingFromDB,
  createBookingIntoDB,
  updateBookingIntoDB
};
