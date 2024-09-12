"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const service_route_1 = require("../modules/service/service.route");
const slot_route_1 = require("../modules/slot/slot.route");
const booking_route_1 = require("../modules/booking/booking.route");
const userBooking_route_1 = require("../modules/userBooking/userBooking.route");
const payment_route_1 = require("../modules/payment/payment.route");
const review_route_1 = require("../modules/review/review.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoutes,
    },
    {
        path: '/slots',
        route: slot_route_1.SlotRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/my-bookings',
        route: userBooking_route_1.UserBookingRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.reviewRoutes,
    },
    {
        path: '/payment',
        route: payment_route_1.paymentRoutes,
    },
];
routes.map(({ path, route }) => {
    router.use(path, route);
});
exports.appRouter = router;
