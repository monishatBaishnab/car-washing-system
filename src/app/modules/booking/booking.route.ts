import { Router } from "express";
import { BookingControllers } from "./booking.controller";
import { BookingValidations } from "./booking.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.get('/', BookingControllers.fetchAllBooking);

router.post('/', validateRequest(BookingValidations.createBookingSchema), BookingControllers.createBooking);

export const BookingRoutes = router;
