import { TService } from './service.interface';
import Service from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const fetchAllServiceFromDB = async (query: Record<string, unknown>) => {
  const result = await Service.find();
  return result;
};

const fetchSingleServiceFromDB = async (id: string) => {
  console.log(id);
  const result = await Service.findById(id);
  return result;
};

const updatedServiceFromDB = async (id: string, payload: Partial<TService>) => {
  const result = Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = Service.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  fetchAllServiceFromDB,
  fetchSingleServiceFromDB,
  updatedServiceFromDB,
  deleteServiceFromDB,
};
