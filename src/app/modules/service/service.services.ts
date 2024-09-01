import { Types } from 'mongoose';
import Slot from '../slot/slot.model';
import { TService } from './service.interface';
import Service from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const fetchAllServiceFromDB = async (query: Record<string, unknown>) => {
  const filteredQuery = { ...query };
  const removableKeys = ['name', 'sort', 'priceRange'];

  removableKeys.forEach((key) => {
    delete filteredQuery[key];
  });

  const filterQuery = Service.find(filteredQuery);
  let name: string = '';
  if (query?.name) {
    name = query?.name as string;
  }
  const searchQuery = filterQuery.find({
    name: { $regex: name, $options: 'i' },
  });

  const priceRange = query?.priceRange
    ? (query.priceRange as string).split(',')
    : null;

  const result = await searchQuery
    .find({
      ...(priceRange && {
        price: {
          $gte: Number(priceRange[0]),
          $lte: Number(priceRange[1]),
        },
      }),
      // Add other conditions here if needed
    })
    .sort((query?.sort as string) ? (query?.sort as string) : '-createdAt');
  return result;
};

type TSlot = {
  _id: Types.ObjectId;
  startTime: string;
  endTime: string;
  isBooked: string;
};

type TSlotData = {
  date: string;
  slots: TSlot[];
};

const fetchSingleServiceFromDB = async (id: string) => {
  const slots = await Slot.find({ service: id });

  const transformedSlots: TSlotData[] = slots.reduce<TSlotData[]>(
    (acc, current) => {
      const existingEntry = acc.find((entry) => entry.date === current.date);

      const slot: TSlot = {
        _id: new Types.ObjectId(current._id),
        startTime: current.startTime,
        endTime: current.endTime,
        isBooked: current.isBooked,
      };

      if (existingEntry) {
        existingEntry.slots.push(slot);
      } else {
        acc.push({
          date: current.date,
          slots: [slot],
        });
      }

      return acc;
    },
    [],
  );

  const service = await Service.findById(id);
  return {
    service,
    slots: transformedSlots,
  };
};

const updatedServiceFromDB = async (id: string, payload: Partial<TService>) => {
  const result = Service.findOneAndUpdate(
    { _id: id, isDeleted: { $ne: true } },
    payload,
    { new: true },
  );
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  fetchAllServiceFromDB,
  fetchSingleServiceFromDB,
  updatedServiceFromDB,
  deleteServiceFromDB,
};
