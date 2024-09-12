import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './service.validation';
import { ServiceControllers } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { TUserRole } from '../user/user.interface';

const router = Router();

router.get('/', ServiceControllers.fetchAllService);

router.get('/:id', ServiceControllers.fetchSingleService);

router.post(
  '/',
  auth(USER_ROLE.admin as TUserRole),
  validateRequest(ServiceValidations.createServiceValidation),
  ServiceControllers.createService,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin as TUserRole),
  validateRequest(ServiceValidations.updateServiceValidation),
  ServiceControllers.updateService,
);

// router.put(
//   '/:id/featured-course',
//   auth(USER_ROLE.admin as TUserRole),
//   validateRequest(ServiceValidations.updateServiceValidation),
//   ServiceControllers.updateService,
// );

router.delete(
  '/:id',
  auth(USER_ROLE.admin as TUserRole),
  ServiceControllers.deleteService,
);

export const ServiceRoutes = router;
