import { CONFLICT, NOT_FOUND } from 'http-status';
import AppError from '../../errors/AppError';
import Service from '../service/service.model';
import { TSlot } from './slot.interface';
import Slot from './slot.model';
import { createTimeSlots } from './slot.utils';

const fetchAvailableSlotFromDB = async (query: Record<string, unknown>) => {
    const queryObj : Record<string, unknown> = {isBooked: 'available'};
    const {date, serviceId} = query;

    if(date){
        queryObj.date = date;
    }
    if(serviceId){
        queryObj.service = serviceId;
    }

    const result = await Slot.find(queryObj);

    return result;
};

const createSlotIntoDB = async (slotData: TSlot) => {
    const serviceExists = await Service.findById(slotData.service);
    const existingSlots = await Slot.find({ date: slotData?.date });

    if (!serviceExists) {
        throw new AppError(NOT_FOUND, 'Service not found.');
    }

    existingSlots.forEach(element => {
        const existingStartTime = new Date(`1970-01-01T${element.startTime}`);
        const slotStartTime = new Date(`1970-01-01T${slotData.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${element.endTime}`);
        const slotEndTime = new Date(`1970-01-01T${slotData.endTime}`);

        if (existingStartTime < slotEndTime && existingEndTime > slotStartTime) {
            throw new AppError(CONFLICT, 'Slot overlaps with an existing slot.');
        }
    });

    const slotsData: TSlot[] = [];
    const timeSlots = createTimeSlots(slotData?.startTime, slotData?.endTime, serviceExists?.duration);

    timeSlots.forEach(({ startTime, endTime }) => {
        slotsData.push({
            ...slotData,
            startTime,
            endTime
        })
    });

    const newSlots = await Slot.insertMany(slotsData);

    return newSlots;
};

export const SlotServices = {
    fetchAvailableSlotFromDB,
    createSlotIntoDB,
};
