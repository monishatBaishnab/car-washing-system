"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertHourToMinute = (time, slotDuration) => {
    // Extract the hours part from the time string (first two characters)
    const hourPart = time.substring(0, 2);
    // Extract the minutes part from the time string (characters after the colon)
    const minutePart = Number(time.substring(3)) > slotDuration ? Number(time.substring(3)) : 0;
    // Convert hours to minutes and add the minutes part
    const totalMinutes = (Number(hourPart) * 60) + minutePart;
    // Return the total minutes
    return totalMinutes;
};
exports.default = convertHourToMinute;
