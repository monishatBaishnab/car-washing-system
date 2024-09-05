import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { UserBookingRoutes } from '../modules/userBooking/userBooking.route';
import { paymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/my-bookings',
    route: UserBookingRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

routes.map(({ path, route }) => {
  router.use(path, route);
});

export const appRouter = router;
