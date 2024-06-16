import { Router } from 'express';
import { userControllers } from './user.controller';
import { UserValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post('/', validateRequest(UserValidations.createUserValidationSchema), userControllers.createUser)

export const UserRoutes = router;