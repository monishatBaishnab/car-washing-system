import Booking from "../booking/booking.model";

const fetchUserBookingFromDB = async(query: Record<string, unknown>) => {
    const userBookings = await Booking.find({customer: query?.customer})
            .populate('service')
            .populate('slot')
            .populate({ path: 'customer', select: '-password' });
            
    return userBookings;
}

export const UserBookingServices = {
    fetchUserBookingFromDB
}