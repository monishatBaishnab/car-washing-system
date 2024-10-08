import httpStatus, { CONFLICT, NOT_FOUND } from 'http-status';
import AppError from '../../errors/AppError';
import Service from '../service/service.model';
import { TSlot } from './slot.interface';
import Slot from './slot.model';
import { createTimeSlots } from './slot.utils';
import { populate } from 'dotenv';
import { dateValidator } from '../../utils/dateValidator';

const fetchAvailableSlotFromDB = async (query: Record<string, unknown>) => {
  const queryObj: Record<string, unknown> = { isBooked: 'available' };
  const { date, serviceId } = query;

  if (date) {
    queryObj.date = date;
  }
  if (serviceId) {
    queryObj.service = serviceId;
  }

  const result = await Slot.find(queryObj).populate('service');

  return result;
};
const fetchAllSlotFromDB = async (query: Record<string, unknown>) => {
  const result = await Slot.find().populate('service').sort('-createdAt');

  return result;
};

const createSlotIntoDB = async (slotData: TSlot) => {
  const serviceExists = await Service.findById(slotData.service);
  const existingSlots = await Slot.find({
    date: slotData?.date,
    service: slotData.service,
  });

  const isValidDate = dateValidator(slotData.date);
  console.log(isValidDate);

  if (!isValidDate) {
    throw new AppError(
      NOT_FOUND,
      'The date is invalid. It cannot be a past date.',
    );
  }

  if (!serviceExists) {
    throw new AppError(NOT_FOUND, 'Service not found.');
  }

  existingSlots.forEach((element) => {
    const existingStartTime = new Date(`1970-01-01T${element.startTime}`);
    const slotStartTime = new Date(`1970-01-01T${slotData.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${element.endTime}`);
    const slotEndTime = new Date(`1970-01-01T${slotData.endTime}`);

    if (existingStartTime < slotEndTime && existingEndTime > slotStartTime) {
      throw new AppError(CONFLICT, 'Slot overlaps with an existing slot.');
    }
  });

  const slotsData: TSlot[] = [];
  const timeSlots = createTimeSlots(
    slotData?.startTime,
    slotData?.endTime,
    serviceExists?.duration,
  );

  timeSlots.forEach(({ startTime, endTime }) => {
    slotsData.push({
      ...slotData,
      startTime,
      endTime,
    });
  });

  const newSlots = await Slot.insertMany(slotsData);

  return newSlots;
};

const updateSlotIntoDB = async (id: string, payload: Partial<TSlot>) => {
  const existSlot = await Slot.findById(id);
  if(!existSlot){
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found.');
  }
  if (existSlot?.isBooked === 'booked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slot update Failed.');
  }
  const result = await Slot.findByIdAndUpdate(
    id,
    {
      isBooked: payload.isBooked,
    },
    { new: true },
  );

  return result;
};

export const SlotServices = {
  fetchAvailableSlotFromDB,
  fetchAllSlotFromDB,
  updateSlotIntoDB,
  createSlotIntoDB,
};
