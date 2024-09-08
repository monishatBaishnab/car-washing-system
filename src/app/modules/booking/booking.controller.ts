import { OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.services';

const fetchAllBooking = catchAsync(async (req, res) => {
  const bookings = await BookingServices.fetchAllBookingFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: 'All bookings retrieved successfully',
    statusCode: OK,
    data: bookings,
  });
});
const fetchUpcomingBooking = catchAsync(async (req, res) => {
  const bookings = await BookingServices.fetchUpcomingBookingFromDB(
    req.user.email,
  );
  console.log(bookings);
  console.log(req.user.email);
  sendResponse(res, {
    success: true,
    message: 'Upcoming bookings retrieved successfully',
    statusCode: OK,
    data: bookings,
  });
});

const fetchMyBooking = catchAsync(async (req, res) => {
  const bookings = await BookingServices.fetchMyBookingFromDB(req.user.email);

  sendResponse(res, {
    success: true,
    message: 'My bookings retrieved successfully',
    statusCode: OK,
    data: bookings,
  });
});

const createBooking = catchAsync(async (req, res) => {
  const newBooking = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'Booking created successful',
    statusCode: OK,
    data: newBooking,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params ?? {};
  const updatedBooking = await BookingServices.updateBookingIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    message: 'Booking updated successful',
    statusCode: OK,
    data: updatedBooking,
  });
});

export const BookingControllers = {
  fetchAllBooking,
  fetchUpcomingBooking,
  fetchMyBooking,
  createBooking,
  updateBooking,
};
