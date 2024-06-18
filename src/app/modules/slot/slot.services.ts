import Service from '../service/service.model';
import { TSlot } from './slot.interface';
import Slot from './slot.model';
import { createTimeSlots } from './slot.utils';

const fetchAvailableSlotFromDB = async (query: Record<string, unknown>) => {
    return [];
};

const createSlotIntoDB = async (slotData: TSlot) => {
    const serviceExists = await Service.findById(slotData.service);

    if (!serviceExists) {
        throw new Error('Service not found.');
    }

    const slotsData : TSlot[] = [];
    const timeSlots = createTimeSlots(slotData?.startTime, slotData?.endTime, serviceExists?.duration);

    timeSlots.forEach(({startTime, endTime}) => {
        slotsData.push({
            ...slotData,
            startTime,
            endTime
        })
    });

    const newSlot = await Slot.insertMany(slotsData);

    return newSlot;
};

export const SlotServices = {
    fetchAvailableSlotFromDB,
    createSlotIntoDB,
};
