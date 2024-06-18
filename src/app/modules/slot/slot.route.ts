import { Router } from 'express';
import { SlotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';

const router = Router();

router.get('/availability', SlotControllers.fetchAvailableSlot);

router.post(
  '/',
  validateRequest(SlotValidations.createSlotValidation),
  SlotControllers.createSlot,
);

export const SlotRoutes = router;
