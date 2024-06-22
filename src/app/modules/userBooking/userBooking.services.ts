import { JwtPayload } from 'jsonwebtoken';
import Booking from '../booking/booking.model';

const fetchUserBookingFromDB = async (query: Record<string, unknown>, user: JwtPayload) => {
  const customer = user?.userId;

  const userBookings = await Booking.find({ customer })
    .populate('service')
    .populate('slot')
    .populate({ path: 'customer', select: '-password' });

  return userBookings;
};

export const UserBookingServices = {
  fetchUserBookingFromDB,
};
