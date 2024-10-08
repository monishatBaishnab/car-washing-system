import { Router } from 'express';
import { SlotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';
import { USER_ROLE } from '../user/user.constant';
import { TUserRole } from '../user/user.interface';
import auth from '../../middlewares/auth';

const router = Router();

router.get(
  '/',
  auth(USER_ROLE.admin as TUserRole),
  SlotControllers.fetchAllSlot,
);
router.get('/availability', SlotControllers.fetchAvailableSlot);

router.post(
  '/',
  auth(USER_ROLE.admin as TUserRole),
  validateRequest(SlotValidations.createSlotValidation),
  SlotControllers.createSlot,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin as TUserRole),
  SlotControllers.updateSlot,
);

export const SlotRoutes = router;
