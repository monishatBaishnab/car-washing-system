import { Router } from 'express';
import { UserBookingController } from './userBooking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { TUserRole } from '../user/user.interface';

const router = Router();

router.get(
  '/',
  auth(USER_ROLE.user as TUserRole),
  UserBookingController.fetchUserBooking,
);

export const UserBookingRoutes = router;
