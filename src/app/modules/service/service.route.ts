import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './service.validation';
import { ServiceControllers } from './service.controller';

const router = Router();

router.get('/', ServiceControllers.fetchAllService);

router.get('/:id', ServiceControllers.fetchSingleService);

router.post(
    '/',
    validateRequest(ServiceValidations.createServiceValidation),
    ServiceControllers.createService,
);

router.put(
    '/:id',
      validateRequest(ServiceValidations.updateServiceValidation),
    ServiceControllers.updateService,
);

router.delete('/:id', ServiceControllers.deleteService);

export const ServiceRoutes = router;
