import { NOT_FOUND, OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse, { TResponse } from '../../utils/sendResponse';
import { ServiceServices } from './service.services';

const createService = catchAsync(async (req, res) => {
  const newService = await ServiceServices.createServiceIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Service created successfully',
    data: newService,
  });
});

const fetchAllService = catchAsync(async (req, res) => {
  const service = await ServiceServices.fetchAllServiceFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Services retrieved successfully',
    data: service,
  });
});

const fetchSingleService = catchAsync(async (req, res) => {
  const services = await ServiceServices.fetchSingleServiceFromDB(
    req.params.id,
  );

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Service retrieved successfully',
    data: services,
  });
});

const updateService = catchAsync(async (req, res) => {
  const updatedService = await ServiceServices.updatedServiceFromDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Service updated successfully',
    data: updatedService,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const deletedService = await ServiceServices.deleteServiceFromDB(
    req.params.id,
  );

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Service deleted successfully',
    data: deletedService,
  });
});

export const ServiceControllers = {
  createService,
  fetchAllService,
  fetchSingleService,
  updateService,
  deleteService,
};
