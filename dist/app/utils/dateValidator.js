"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateValidator = void 0;
const dateValidator = (inputDate) => {
    // Get the current date and set the time to 00:00:00
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // Parse the input date and set the time to 00:00:00
    const givenDate = new Date(inputDate);
    givenDate.setHours(0, 0, 0, 0);
    // Compare the dates
    return givenDate >= currentDate;
};
exports.dateValidator = dateValidator;
