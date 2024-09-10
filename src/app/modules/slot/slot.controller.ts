import { OK } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slot.services';

const fetchAvailableSlot = catchAsync(async (req, res) => {
  const availableSlot = await SlotServices.fetchAvailableSlotFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Available slots retrieved successfully',
    data: availableSlot,
  });
});
const fetchAllSlot = catchAsync(async (req, res) => {
  const slots = await SlotServices.fetchAllSlotFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Slots retrieved successfully',
    data: slots,
  });
});

const createSlot = catchAsync(async (req, res) => {
  const newSlot = await SlotServices.createSlotIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Slots created successfully',
    data: newSlot,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const newSlot = await SlotServices.updateSlotIntoDB(req.params?.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Slots updated successfully',
    data: newSlot,
  });
});

export const SlotControllers = {
  fetchAvailableSlot,
  fetchAllSlot,
  updateSlot,
  createSlot,
};
