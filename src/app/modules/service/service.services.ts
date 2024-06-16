import { TService } from './service.interface';
import Service from './service.model';

const createServiceIntoDB = async (payload: TService) => {
    return await Service.create(payload);
};

const fetchAllServiceFromDB = async (query: Record<string, unknown>) => {
    return await Service.find();
};

const fetchSingleServiceFromDB = async (id: string) => {
    return await Service.findById(id);
};

const updatedServiceFromDB = async (id: string, payload: Partial<TService>) => {
    return Service.findByIdAndUpdate(id, payload, { new: true });
};

const deleteServiceFromDB = async (id: string) => {
    return Service.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
};

export const ServiceServices = {
    createServiceIntoDB,
    fetchAllServiceFromDB,
    fetchSingleServiceFromDB,
    updatedServiceFromDB,
    deleteServiceFromDB,
};
