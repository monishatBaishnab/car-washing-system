import { OK } from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserBookingServices } from "./userBooking.services";

const fetchUserBooking = catchAsync(async (req, res) => {
    const userBookings = await UserBookingServices.fetchUserBookingFromDB(req.query);

    sendResponse(res, {
        success: true,
        message: 'User bookings retrieved successfully',
        statusCode: OK,
        data: userBookings
    })
})

export const UserBookingController = {
    fetchUserBooking
}