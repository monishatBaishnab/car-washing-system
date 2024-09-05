import { Router } from 'express';
import { BookingControllers } from './booking.controller';
import { BookingValidations } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { TUserRole } from '../user/user.interface';

const router = Router();

router.get(
  '/',
  auth(USER_ROLE.admin as TUserRole),
  BookingControllers.fetchAllBooking,
);

router.get(
  '/my-bookings',
  auth(USER_ROLE.user as TUserRole),
  BookingControllers.fetchMyBooking,
);

router.post(
  '/',
  auth(USER_ROLE.user as TUserRole),
  validateRequest(BookingValidations.createBookingSchema),
  BookingControllers.createBooking,
);

export const BookingRoutes = router;
