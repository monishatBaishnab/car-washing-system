"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertMinuteToHour = (payload) => {
    // Divide the total minutes by 60 to get the total hours as a float
    const totalHours = (payload / 60).toFixed(2);
    console.log(payload);
    // Split the total hours into hours and fractional part as strings
    const [hours = 0, minutes = 0] = totalHours.toString().split('.');
    console.log(hours, minutes);
    // Pad hours and minutes to ensure they are two digits
    const paddedHour = hours.padStart(2, '0');
    const paddedMinute = minutes.padStart(2, '0');
    // Return the formatted string, ensuring both hours and minutes are two digits
    return `${paddedHour}:${paddedMinute}`;
};
exports.default = convertMinuteToHour;
