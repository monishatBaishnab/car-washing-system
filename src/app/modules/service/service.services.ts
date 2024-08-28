import { TService } from './service.interface';
import Service from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const fetchAllServiceFromDB = async (query: Record<string, unknown>) => {
  // const filterQuery =
  console.log(query);
  const result = await Service.find({ 'featured': query?.featured });
  return result;
};

const fetchSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id);
  return result;
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
