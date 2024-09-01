"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transformedData = data.reduce((acc, current) => {
    const existingEntry = acc.find((entry) => entry._id === current._id && entry.date === current.date);
    const slot = {
        startTime: current.startTime,
        endTime: current.endTime,
        isBooked: current.isBooked,
    };
    if (existingEntry) {
        existingEntry.slots.push(slot);
    }
    else {
        acc.push({
            _id: new mongoose_1.Types.ObjectId(current._id), // Convert the ID to a Types.ObjectId instance
            date: current.date,
            slots: [slot],
        });
    }
    return acc;
}, []);
